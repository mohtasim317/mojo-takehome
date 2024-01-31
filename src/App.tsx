import { useState } from "react";
import Tab from "./Components/Tab/Tab";
import CurrencyData from "./Components/CurrencyData/CurrencyData";
import "./App.css";

function App() {
  const [currentTab, setCurrentTab] = useState("Forex");
  return (
    <>
      <div className="TabContainer">
        <Tab
          name="Forex"
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />
        <Tab
          name="Crypto"
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />
      </div>
      {currentTab === "Forex" ? (
        <CurrencyData
          currentTab={currentTab}
          urlPair="C.C:EUR-USD,C.C:CHF-USD"
          socketUrl="wss://socket.polygon.io/forex"
        />
      ) : (
        <CurrencyData
          currentTab={currentTab}
          urlPair="XT.X:BTC-USD,XT.X:ETH-USD"
          socketUrl="wss://socket.polygon.io/crypto"
        />
      )}
    </>
  );
}

export default App;
