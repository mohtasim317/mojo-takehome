import { useState, useEffect, ReactNode } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import List from "../List/List";
import { CurrencyDataProps, DataType } from "../../types";
import "../CurrencyData/CurrencyData.css";

function CurrencyData({
  socketUrl,
  urlPair,
  currentTab,
}: CurrencyDataProps): ReactNode {
  const [pairOneName, setPairOneName] = useState(() => {
    return currentTab === "Crypto" ? "BTC-USD" : "EUR/USD";
  });
  const [pairTwoName, setPairTwoName] = useState(() => {
    return currentTab === "Crypto" ? "ETH-USD" : "CHF/USD";
  });
  const [pairOnePriceHistory, setPairOnePriceHistory] = useState<
    Array<DataType>
  >([]);
  const [pairTwoPriceHistory, setPairTwoPriceHistory] = useState<
    Array<DataType>
  >([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Connecting to socket
  const { lastMessage, readyState, sendJsonMessage } = useWebSocket(socketUrl);

  //Authenticating using API Key
  useEffect(() => {
    async function authenticate() {
      sendJsonMessage({
        action: "auth",
        params: import.meta.env.VITE_POLYGON_API_KEY,
      });
    }

    if (readyState === ReadyState.OPEN) {
      authenticate().then(() => {
        setIsAuthenticated(true);
      });
    }
  }, [readyState, currentTab]);

  //Subscribing to currency pair after authenticated
  useEffect(() => {
    if (isAuthenticated === true) {
      sendJsonMessage({
        action: "subscribe",
        params: urlPair,
      });
    }
  }, [isAuthenticated, currentTab]);

  //Logic to set data when switching tabs
  useEffect(() => {
    setPairOnePriceHistory([]);
    setPairTwoPriceHistory([]);
    if (currentTab === "Crypto") {
      setPairOneName("BTC-USD");
      setPairTwoName("ETH-USD");
    } else {
      setPairOneName("EUR/USD");
      setPairTwoName("CHF/USD");
    }
  }, [currentTab]);

  //Saving data to local state whenever new data is received
  useEffect(() => {
    if (lastMessage !== null && lastMessage.data !== undefined) {
      const parsedData = JSON.parse(lastMessage?.data);
      if (parsedData[0].status === undefined) {
        if (
          parsedData[0].p === pairOneName ||
          parsedData[0].pair === pairOneName
        ) {
          setPairOnePriceHistory((prev) => prev.concat(parsedData[0]));
        } else {
          setPairTwoPriceHistory((prev) => prev.concat(parsedData[0]));
        }
      }
    }
  }, [lastMessage]);

  return (
    <div className="ListsContainer">
      <List currentTab={currentTab} data={pairOnePriceHistory} />
      <List currentTab={currentTab} data={pairTwoPriceHistory} />
    </div>
  );
}

export default CurrencyData;
