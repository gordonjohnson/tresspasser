import React, { useState } from "react";
import PuzzleScreen from "./puzzle/PuzzleScreen";
import "./App.css";
import STAGES from "./puzzle/stages";

function App() {
  const [stage, setStage] = useState(0);
  return (
    <>
      <label
        style={{
          color: "white",
          fontSize: 24,
          float: "right",
          marginRight: 50,
          position: "fixed"
        }}
      >
        Stage Select{" "}
        <select
          onChange={e => {
            setStage(parseInt(e.currentTarget.value, 10));
          }}
          style={{ fontSize: "inherit" }}
        >
          {STAGES.map((s, idx) => (
            <option key={idx}>{idx}</option>
          ))}
        </select>
      </label>

      {/* Routes */}
      <PuzzleScreen key={stage} stageIndex={stage} />
    </>
  );
}

export default App;
