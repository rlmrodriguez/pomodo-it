import "./styles.css";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import { useDisplay } from "./contexts/SettingsDisplayContext";
import Quotes from "./components/Quotes";

const App = () => {
  const toggleDisplay = useDisplay();

  return (
    <>
      <div className="container">
        <Timer />
        {toggleDisplay.showSettings ? <Settings /> : null}
        <Quotes />
      </div>
      <h4>Pomo-do It! Copyright &copy; 2022 RLMR</h4>
    </>
  );
};

export default App;
