import React, { createContext, useContext, useState, ReactNode } from "react";
import STAGES from "./puzzle/stages";

interface ContextValue {
  currentStage: number | null;
  setCurrentStage: (stageIndex: number) => void;
  goToNextStage: () => void;
  goToTitleScreen: () => void;
  newGame: () => void;
}

interface GameContextProviderProps {
  children: ReactNode;
}

interface GameContextConsumerProps {
  children: (value: ContextValue) => ReactNode;
}

const GameContext = createContext<ContextValue | undefined>(undefined);

function GameContextProvider({ children }: GameContextProviderProps) {
  const [currentStage, setCurrentStage] = useState<number | null>(null);

  const goToTitleScreen = () => {
    setCurrentStage(null);
  };

  const newGame = () => {
    setCurrentStage(0);
  };

  const goToNextStage = () => {
    setCurrentStage(prevStage => {
      if (prevStage === null) {
        return 0;
      }
      const nextStage = prevStage + 1;
      if (nextStage < STAGES.length) {
        return nextStage;
      }
      // Go back to the title screen if all the stages are complete
      return null;
    });
  };

  const contextValue: ContextValue = {
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

const GameContextConsumer = ({ children }: GameContextConsumerProps) => (
  <GameContext.Consumer>
    {contextValue => {
      if (contextValue === undefined) {
        throw new Error(
          "GameContextConsumer must be used within a GameContextProvider"
        );
      }
      return children(contextValue);
    }}
  </GameContext.Consumer>
);

function useGameContext(): ContextValue {
  const contextValue = useContext(GameContext);
  if (contextValue === undefined) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return contextValue;
}

export { GameContextProvider, GameContextConsumer, useGameContext };
