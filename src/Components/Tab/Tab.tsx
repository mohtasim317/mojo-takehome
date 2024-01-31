import { TabProps } from "../../types";
import "../Tab/Tab.css";

function Tab({ name, setCurrentTab, currentTab }: TabProps) {
  function onClick() {
    if (currentTab !== name) setCurrentTab(name);
  }

  return (
    <div
      style={
        name === currentTab
          ? { backgroundColor: "lightGrey" }
          : { backgroundColor: "white" }
      }
      onClick={onClick}
      className="Tab"
      role="button"
    >
      {name}
    </div>
  );
}

export default Tab;
