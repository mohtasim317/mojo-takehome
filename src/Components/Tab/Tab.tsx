import "../Tab/Tab.css";

interface TabProps {
  name: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  currentTab: string;
}

function Tab({ name, setCurrentTab, currentTab }: TabProps) {
  const onClick = () => {
    if (currentTab !== name) setCurrentTab(name);
  };

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
