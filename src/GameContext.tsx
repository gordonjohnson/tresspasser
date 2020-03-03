import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextValue {
  currentStage: number | undefined;
  setCurrentStage: (stageIndex: number) => void;
  goToTitleScreen: () => void;
  newGame: () => void;
  nextStage: () => void;
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

  const nextStage = () => {
    setCurrentStage(prevStage => {
      if (prevStage) {
        return prevStage + 1;
      }
      return 0;
    });
  };

  const contextValue = {
    currentStage,
    setCurrentStage,
    goToTitleScreen,
    newGame,
    nextStage
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
