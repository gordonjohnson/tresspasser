import React from "react";
import {
  GameContextConsumer,
  GameContextProvider,
  useGameContext
} from "./GameContext";
import MenuScreen from "./menu/MenuScreen";
import PuzzleScreen from "./puzzle/PuzzleScreen";
import STAGES from "./puzzle/stages";
import VolumeControl from "./VolumeControl";
import "./App.css";

function DebugStageSelector() {
  const { currentStage, setCurrentStage, goToTitleScreen } = useGameContext();
  return (
    <div
      style={{
        color: "white",
        fontSize: 16,
        position: "fixed",
        fontFamily: "Aguda",
        zIndex: 1,
        userSelect: "none"
      }}
    >
      <label>
        Stage Select{" "}
        <select
          onChange={e => {
            if (e.currentTarget.value === "menu") {
              goToTitleScreen();
            } else {
              setCurrentStage(parseInt(e.currentTarget.value, 10));
            }
          }}
          style={{ fontSize: "inherit" }}
          value={currentStage ?? undefined}
        >
          <option value={undefined}>menu</option>
          {STAGES.map((s, idx) => (
            <option key={idx} value={idx}>
              {idx} - {s.name}
            </option>
          ))}
        </select>
      </label>
      <p hidden={currentStage === null}>
        Line up the laser beams with the ports
        <br />
        <small>
          W = next exterior ring
          <br />
          S = next interior ring
          <br />
          A = rotate counter-clockwise
          <br />
          D = rotate clockwise
          <br />
          Spacebar = toggle ring power
        </small>
      </p>
    </div>
  );
}

function App() {
  return (
    <GameContextProvider>
      <VolumeControl />
      <DebugStageSelector />
      <GameContextConsumer>
        {context => {
          if (context.currentStage === null) {
            return <MenuScreen />;
          }
          return (
            <PuzzleScreen
              key={context.currentStage}
              stageIndex={context.currentStage}
            />
          );
        }}
      </GameContextConsumer>
    </GameContextProvider>
  );
}

export default App;
