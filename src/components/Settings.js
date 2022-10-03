import BackButton from "./BackButton";
import ReactSlider from "react-slider";
import { useSettings } from "../contexts/SettingsContext";
import { useDisplay } from "../contexts/SettingsDisplayContext";
import SoundCheckbox from "./SoundCheckbox";

const Settings = () => {
  const settingsInfo = useSettings();
  const toggleDisplay = useDisplay();
  return (
    <div className="settings-container">
      <div className="slider-container">
        <label>
          <span>Focus Time: </span>
          <span>
            {settingsInfo.workMinutes < 10
              ? "0" + settingsInfo.workMinutes
              : settingsInfo.workMinutes}
            :00
          </span>
        </label>
        <ReactSlider
          className={"slider"}
          thumbClassName={"thumb"}
          trackClassName={"track"}
          value={settingsInfo.workMinutes}
          onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
          min={1}
          max={120}
        />
      </div>
      <div className="slider-container">
        <label>
          <span>Break Time: </span>
          <span>
            {settingsInfo.breakMinutes < 10
              ? "0" + settingsInfo.breakMinutes
              : settingsInfo.breakMinutes}
            :00
          </span>
        </label>
        <ReactSlider
          className={"slider"}
          thumbClassName={"thumb green"}
          trackClassName={"track"}
          value={settingsInfo.breakMinutes}
          onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
          min={1}
          max={120}
        />
      </div>
      <SoundCheckbox />
      <div className="btn-container">
        <BackButton onClick={() => toggleDisplay.setShowSettings(false)} />
      </div>
    </div>
  );
};

export default Settings;
