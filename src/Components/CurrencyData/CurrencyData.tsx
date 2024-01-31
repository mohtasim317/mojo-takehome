import "../CurrencyData/CurrencyData.css";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useState, useEffect, ReactNode } from "react";
import List from "../List/List";

interface CurrencyDataProps {
  currentTab: string;
  urlPair: string;
  socketUrl: string;
}

interface CryptoDataType {
  p: number;
  pair: string;
}

interface ForexDataType {
  p: string;
  a: number;
}

export type DataType = CryptoDataType | ForexDataType;

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

  const { lastMessage, readyState, sendJsonMessage } = useWebSocket(socketUrl, {
    onClose: function () {},
  });

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

  useEffect(() => {
    if (isAuthenticated === true) {
      sendJsonMessage({
        action: "subscribe",
        params: urlPair,
      });
    }
  }, [isAuthenticated, currentTab]);

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
