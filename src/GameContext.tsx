import React, { createContext, useContext, useState, ReactNode } from "react";
import STAGES from "./puzzle/stages";

interface ContextValue {
  currentStage: number | undefined;
  setCurrentStage: (stageIndex: number) => void;
  goToNextStage: () => void;
  goToTitleScreen: () => void;
  newGame: () => void;
}

interface GameContextProviderProps {
  children: ReactNode;
}

const GameContext = createContext<ContextValue | undefined>(undefined);
const GameContextConsumer = GameContext.Consumer;

function GameContextProvider({ children }: GameContextProviderProps) {
  const [currentStage, setCurrentStage] = useState<number | undefined>();

  const goToTitleScreen = () => {
    setCurrentStage(undefined);
  };

  const newGame = () => {
    setCurrentStage(0);
  };

  const goToNextStage = () => {
    setCurrentStage(prevStage => {
      if (prevStage === undefined) {
        return 0;
      }
      const nextStage = prevStage + 1;
      if (nextStage < STAGES.length) {
        return nextStage;
      }
      // Go back to the title screen if all the stages are complete
      return undefined;
    });
  };

  const contextValue = {
    currentStage,
    setCurrentStage,
    goToTitleScreen,
    newGame,
    goToNextStage
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}

function useGameContext(): ContextValue {
  const contextValue = useContext(GameContext);
  if (contextValue === undefined) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return contextValue;
}

export { GameContextProvider, GameContextConsumer, useGameContext };
