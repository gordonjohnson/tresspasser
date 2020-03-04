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
    <label
      style={{
        color: "white",
        fontSize: 24,
        float: "right",
        marginRight: 50,
        position: "fixed",
        fontFamily: "Aguda"
      }}
    >
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
      >
        <option selected={currentStage === undefined}>menu</option>
        {STAGES.map((s, idx) => (
          <option key={idx} selected={currentStage === idx}>
            {idx}
          </option>
        ))}
      </select>
    </label>
  );
}

function App() {
  return (
    <GameContextProvider>
      <VolumeControl />
      <DebugStageSelector />
      <GameContextConsumer>
        {context => {
          if (context?.currentStage === undefined) {
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
