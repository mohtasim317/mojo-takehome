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

/*
{ev: 'C', p: 'EUR/USD', i: 0, a: 1.085, b: 1.0847, …}
a: 1.085
b: 1.0847
ev: "C"
i: 0
p: "EUR/USD"
t: 1706645273000
x: 48
*/

/*
Pair:CHF/USD Price:1.160434503424658

Pair:CHF/USD Price:1.160459342023588

Pair:EUR/USD Price:1.0843

Pair:EUR/USD Price:1.08432

Pair:CHF/USD Price:1.160409464998555

Pair:CHF/USD Price:1.160432586313919

*/

/*
[{"ev":"XT","pair":"BTC-USD","p":43575.6,"t":1706649628023,"s":4.522e-05,"c":[2],"i":"1b254a48-7258-4465-8215-2610ccf9ab21","x":23,"r":1706649628068}]


*/
