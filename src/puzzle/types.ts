export interface StageLayout {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  ports: Array<number>;
  rings: Array<StageRingLayout | null>;
}

export interface StageRingLayout {
  lasers: Array<number>;
  blockers: Array<number>;
  disabled?: boolean;
}

export interface RingState {
  index: number;
  rotationOffset: number;
  isSelected: boolean;
  isDisabled: boolean;
  lasers: Array<LaserState>;
  blockers: Array<BlockerState>;
}

export interface LaserState {
  startingPosition: number;
  currentRotatedPosition: number;
  currentBeamTarget: number;
  obstructedBy?: {
    ringIndex: number;
    position: number;
  };
  isTouchingPort?: boolean;
}

export interface BlockerState {
  startingPosition: number;
  currentRotatedPosition: number;
}
