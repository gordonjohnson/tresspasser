import React, { useState } from "react";
import { useGameContext } from "../GameContext";
import "./MenuScreen.scss";

function MenuScreen() {
  const { newGame } = useGameContext();
  const [showStageSelect, setShowStageSelect] = useState(false);

  return (
    <div className="menuScreen">
      <h1 className="title">
        Tressp<em>a</em>sser
      </h1>
      <section className="buttons">
        <button onClick={() => newGame()}>New Game</button>
        <button>Continue</button>
        <button onClick={() => setShowStageSelect(true)}>Stage Select</button>
      </section>
    </div>
  );
}

export default MenuScreen;
