import React from "react";
import { useGameContext } from "../GameContext";
import Button from "./../button/Button";
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
        background: "radial-gradient(rgba(255, 255, 255, 0.33), transparent)",
        fontFamily: "Aguda",
        color: "#FFF"
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,.90)",
          border: "3px solid rgba(255,255,255,0.9)",
          borderRadius: "5px",
          padding: "64px",
          minWidth: "30%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {isFinalStage ? (
          <>
            <h1 style={{ margin: "0 0 48px" }}>All Stages Complete!</h1>
            <Button
              autoFocus
              onClick={() => goToTitleScreen()}
              style={{ width: 300 }}
            >
              Return to Menu
            </Button>
          </>
        ) : (
          <>
            <h1 style={{ margin: "0 0 48px" }}>
              Stage {currentStage! + 1} Complete
            </h1>
            <Button
              autoFocus
              onClick={() => goToNextStage()}
              style={{ width: 300 }}
            >
              Continue
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default StageCompletedDialog;
