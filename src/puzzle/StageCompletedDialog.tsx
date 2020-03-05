import React from "react";
import { useGameContext } from "../GameContext";

function StageCompletedDialog() {
  const { currentStage, nextStage } = useGameContext();
  // @ts-ignore
  const stageDisplayNumber = currentStage + 1;

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
        <h1 style={{ margin: "0 0 48px" }}>
          Stage {stageDisplayNumber} Complete
        </h1>
        <button autoFocus onClick={() => nextStage()}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default StageCompletedDialog;
