export const startStage = new Audio(require("./start-stage.mp3"));
export const ringSelected = new Audio(require("./ring-selected.mp3"));
export const portPowered = new Audio(require("./port-powered.mp3"));
export const finalPortPowered = new Audio(require("./final-port-powered.mp3"));

export const backgroundMusic = new Audio(require("./bg-music.mp3"));
backgroundMusic.volume = 0.5;
backgroundMusic.loop = true;

export const electricalHum = new Audio(
  require("./background-electrical-hum.mp3")
);
electricalHum.volume = 0.25;
electricalHum.loop = true;
