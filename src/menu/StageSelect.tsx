import React, { useEffect, useRef, forwardRef } from "react";
import styles from "./StageSelect.module.scss";
import STAGES from "../puzzle/stages";
import { useGameContext } from "../GameContext";

interface StageProps {
  index: number;
}

const Stage = forwardRef<HTMLButtonElement, StageProps>(({ index }, ref) => {
  const { setCurrentStage } = useGameContext();
  const onClick = () => setCurrentStage(index);
  const stageNumber = String(index).padStart(2, "0");
  return (
    <button ref={ref} className={styles.stage} onClick={onClick}>
      {stageNumber}
    </button>
  );
});

// @ts-ignore
export default function StageSelect({ visible, onClose }: any) {
  const firstStage = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const keyboardListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", keyboardListener);
    return () => {
      document.removeEventListener("keydown", keyboardListener);
    };
  }, [onClose]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => firstStage.current && firstStage.current.focus(), 666);
    }
  }, [visible]);

  let className = styles.stageSelect;
  if (visible) {
    className += " " + styles.visible;
  }
  return (
    <div className={className}>
      <h2>Stage Select</h2>
      <button className={styles.close} onClick={() => onClose()}>
        &times;
      </button>
      {STAGES.map((value, index) => {
        return (
          <Stage
            key={index}
            index={index}
            ref={index === 0 ? firstStage : null}
          />
        );
      })}
    </div>
  );
}
