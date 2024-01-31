import { DataType } from "../CurrencyData/CurrencyData";
import "../List/List.css";

interface ListProps {
  currentTab: string;
  data: DataType[];
}

function List({ currentTab, data }: ListProps) {
  const sliceStart = data.length > 20 ? data.length - 20 : 0;
  return (
    <div className="List">
      {currentTab === "Forex"
        ? data.slice(sliceStart, data.length).map(({ p, a }, index) => {
            return (
              <div key={`${p} + ${index}`}>
                <p>
                  Pair:{p} Price:{a}
                </p>
              </div>
            );
          })
        : data.slice(sliceStart, data.length).map(({ p, pair }, index) => {
            return (
              <div key={`${p} + ${index}`}>
                <p>
                  Pair:{pair} Price:{p}
                </p>
              </div>
            );
          })}
    </div>
  );
}

export default List;
