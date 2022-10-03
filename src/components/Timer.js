import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useState, useEffect, useRef } from "react";
import { useSettings } from "../contexts/SettingsContext";
import { useDisplay } from "../contexts/SettingsDisplayContext";
import useSound from "use-sound";
import bellSfx from "../assets/audio/bell.mp3";
import ResetButton from "./ResetButton";

const workColor = "#F8A014";
const breakColor = "#4CD964";

const Timer = () => {
  const settingsInfo = useSettings();
  const toggleDisplay = useDisplay();

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const [play] = useSound(bellSfx, { volume: 0.3 });

  const startTime = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  };

  useEffect(() => {
    const switchMode = () => {
      if (settingsInfo.allowSound) play();
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    };

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      startTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  let minutes = Math.floor(secondsLeft / 60);
  if (minutes < 10) minutes = "0" + minutes;
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  const resetTimer = () => {
    setMode("work");
    modeRef.current = "work";
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  };

  document.title =
    minutes + ":" + seconds + `${mode === "work" ? "- FOCUS" : "- REST"}`;
  return (
    <div>
      <CircularProgressbarWithChildren
        value={percentage}
        counterClockwise={true}
        background
        backgroundPadding={3}
        strokeWidth={3}
        styles={buildStyles({
          pathColor: mode === "work" ? workColor : breakColor,
          trailColor: "#242528",
          strokeLinecap: "round",
          backgroundColor: "#242528",
        })}
      >
        <h1>{minutes + ":" + seconds}</h1>
        <h3
          className={isPaused ? null : "blink"}
          style={{ color: mode === "work" ? workColor : breakColor }}
        >
          {mode === "work" ? "FOCUS!" : "REST!"}
        </h3>
      </CircularProgressbarWithChildren>

      <div className="btns-container">
        <ResetButton onClick={resetTimer} />
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
        <SettingsButton onClick={() => toggleDisplay.setShowSettings(true)} />
      </div>
    </div>
  );
};

export default Timer;
