import React, { useState } from "react";
import { useGameContext } from "../GameContext";
import Button from "../button/Button";
import styles from "./MenuScreen.module.scss";

function MenuScreen() {
  const { newGame } = useGameContext();
  const [showStageSelect, setShowStageSelect] = useState(false);

  return (
    <div className={styles.menuScreen}>
      <h1 className={styles.title}>
        Tressp<em>a</em>sser
      </h1>
      <section className={styles.buttons}>
        <Button onClick={() => newGame()}>New Game</Button>
        <Button>Continue</Button>
        <Button onClick={() => setShowStageSelect(true)}>Stage Select</Button>
      </section>
    </div>
  );
}

export default MenuScreen;
