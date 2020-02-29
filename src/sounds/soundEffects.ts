const soundEffect = (src: string, volume = 1, loop = false) => {
  // preload the audio file
  let audioElement = document.createElement("audio");
  audioElement.src = src;
  audioElement.preload = "auto";
  audioElement.volume = volume;
  audioElement.loop = loop;
  document.body.appendChild(audioElement);
  return audioElement;
};

export const electricalHum = soundEffect(
  require("./background-electrical-hum.mp3"),
  0.25,
  true
);

export const finalPortPowered = soundEffect(
  require("./final-port-powered.mp3")
);
export const portPowered = soundEffect(require("./port-powered.mp3"));
export const ringSelected = soundEffect(require("./ring-selected.mp3"));
export const startStage = soundEffect(require("./start-stage.mp3"));
export const backgroundMusic = soundEffect(require("./bg-music.mp3"), 0.5);
