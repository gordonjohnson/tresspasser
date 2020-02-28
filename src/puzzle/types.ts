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

export interface Obstructor {
  ringIndex: number;
  position: number;
}

export interface RingPositionedItem {
  startingPosition: number;
  currentRotatedPosition: number;
}

export interface LaserState extends RingPositionedItem {
  currentBeamTarget: number;
  obstructedBy?: Obstructor;
  isTouchingPort?: boolean;
}

export interface BlockerState extends RingPositionedItem {}
