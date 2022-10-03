import { useSettings } from "../contexts/SettingsContext";
import useSound from "use-sound";
import popSfx from "../assets/audio/pop.mp3";

const SoundCheckbox = () => {
  const soundToggle = useSettings();
  const [play] = useSound(popSfx, { volume: 0.3 });

  const handleChange = () => {
    play();
    soundToggle.setAllowSound((prevState) => !prevState);
  };

  return (
    <div className="sound-checkbox">
      <label>
        <input
          type="checkbox"
          checked={soundToggle.allowSound}
          onChange={handleChange}
        />
        Enable Timer SFX
      </label>
    </div>
  );
};

export default SoundCheckbox;
