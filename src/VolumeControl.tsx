import React, { useState, useEffect } from "react";
import * as soundEffects from "./sounds/soundEffects";

const getInitialMutedState = (): boolean => {
  const storedValue = window.localStorage.getItem("muted") ?? "true";
  return JSON.parse(storedValue);
};

function VolumeControl() {
  const [muted, setMuted] = useState(getInitialMutedState);

  useEffect(() => {
    // Adjust the volume of every sound effect accordingly
    if (muted) {
      Object.values(soundEffects).forEach(audio => (audio.volume = 0));
    } else {
      Object.values(soundEffects).forEach(audio => (audio.volume = 1));
      soundEffects.electricalHum.volume = 0.25;
      soundEffects.backgroundMusic.volume = 0.5;
    }
    // Also, persist to local storage
    window.localStorage.setItem("muted", JSON.stringify(muted));
  }, [muted]);

  return (
    <label
      style={{
        color: "white",
        fontSize: 24,
        top: 0,
        right: 0,
        marginRight: 50,
        position: "fixed",
        fontFamily: "Aguda",
        cursor: "pointer",
        zIndex: 1
      }}
      onClick={() => setMuted(muted => !muted)}
    >
      Sound: <strong>{muted ? "Off" : "On"}</strong>
    </label>
  );
}

export default VolumeControl;
