import React, { useState } from "react";
import { useGameContext } from "../GameContext";
import Button from "../button/Button";
import styles from "./MenuScreen.module.scss";
import StageSelect from "./StageSelect";

function MenuScreen() {
  const { newGame } = useGameContext();
  const [showStageSelect, setShowStageSelect] = useState(false);

  return (
    <div className={styles.menuScreen}>
      <StageSelect
        visible={showStageSelect}
        onClose={() => setShowStageSelect(false)}
      />
      <h1 className={styles.title}>
        Tressp<em>a</em>sser
      </h1>
      <section className={styles.buttons}>
        <Button autoFocus onClick={() => newGame()}>
          New Game
        </Button>
        <Button>Continue</Button>
        <Button onClick={() => setShowStageSelect(true)}>Stage Select</Button>
      </section>
    </div>
  );
}

export default MenuScreen;
