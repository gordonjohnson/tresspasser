import React from "react";
import { useGameContext } from "../GameContext";
import STAGES from "./stages";

function StageCompletedDialog() {
  const { currentStage, goToNextStage, goToTitleScreen } = useGameContext();
  const isFinalStage = currentStage === STAGES.length - 1;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 1s",
        transformOrigin: "center",
        background: "radial-gradient(#ffffffa8, transparent)",
        fontFamily: "Aguda",
        color: "#FFF"
      }}
    >
      <div
        style={{
          background: "linear-gradient(#173144, #1C4B72)",
          border: "solid 1px #97BFB7",
          borderRadius: "5px",
          padding: "64px",
          minWidth: "30%",
          textAlign: "center"
        }}
      >
        {isFinalStage ? (
          <>
            <h1 style={{ margin: "0 0 48px" }}>All Stages Complete!</h1>
            <button autoFocus onClick={() => goToTitleScreen()}>
              Return to Menu
            </button>
          </>
        ) : (
          <>
            <h1 style={{ margin: "0 0 48px" }}>
              Stage {currentStage! + 1} Complete
            </h1>
            <button autoFocus onClick={() => goToNextStage()}>
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default StageCompletedDialog;
