import React, { Component } from "react";
import ExteriorBorder from "./ExteriorBorder";
import PowerPort from "./PowerPort";
import Ring from "./Ring";
import StageCompletedDialog from "./StageCompletedDialog";
import STAGES from "./stages";
import { LaserState, RingState, StageRingLayout } from "./types";
import { normalize } from "./utils";
import * as soundEffects from "./../sounds/soundEffects";
import Defs from "./Defs";

const throttle = (callback: any, delay: number) => {
  let throttleTimeout: NodeJS.Timeout | null = null;
  let storedEvent: any = null;

  const throttledEventHandler = (event: any) => {
    storedEvent = event;

    const shouldHandleEvent = !throttleTimeout;

    if (shouldHandleEvent) {
      callback(storedEvent);

      storedEvent = null;

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;

        if (storedEvent) {
          throttledEventHandler(storedEvent);
        }
      }, delay);
    }
  };

  return throttledEventHandler;
};

const logThrottled = throttle(console.table, 300);

interface PuzzleScreenProps {
  stageIndex: number;
}

interface PuzzleScreenState {
  selected: number;
  rotation: Array<number>;
  disabled: Array<boolean>;
  dragInfo: null | {
    startingClickPoint: { x: number; y: number };
    startingRingPosition: number;
  };
}

class PuzzleScreen extends Component<PuzzleScreenProps, PuzzleScreenState> {
  currentStage = STAGES[this.props.stageIndex];
  state: PuzzleScreenState = {
    selected: this.currentStage.rings.map(Boolean).lastIndexOf(true),
    rotation: [0, 0, 0, 0],
    disabled: [false, false, false, false],
    dragInfo: null
  };

  rotate = (isClockwise: boolean) => {
    this.setState(prevState => {
      const nextRotation = [...prevState.rotation];
      nextRotation[prevState.selected] += isClockwise ? 1 : -1;
      return {
        rotation: nextRotation
      };
    });
  };

  handleRingMouseDown = (
    event: React.MouseEvent<SVGCircleElement, MouseEvent>,
    ringIndex: number
  ) => {
    const { pageX, pageY } = event;
    this.setState(prevState => ({
      selected: ringIndex,
      dragInfo: {
        startingClickPoint: { x: pageX, y: pageY },
        startingRingPosition: prevState.rotation[ringIndex]
      }
    }));
  };

  handleMouseMove = (event: any) => {
    if (this.state.dragInfo === null) return;

    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    const startX = this.state.dragInfo.startingClickPoint.x - center.x;
    const startY = this.state.dragInfo.startingClickPoint.y - center.y;
    const currentX = event.pageX - center.x;
    const currentY = event.pageY - center.y;

    // Angle between the start point and the center
    const startAngle = (Math.atan2(startY, startX) * 180) / Math.PI;
    // Angle between the current point and center
    const currentAngle = (Math.atan2(currentY, currentX) * 180) / Math.PI;
    let deltaAngle = currentAngle - startAngle;

    const rounded = Math.round(deltaAngle / 30);

    logThrottled({
      start: { x: startX, y: startY, angle: Math.round(startAngle) },
      current: { x: currentX, y: currentY, angle: Math.round(currentAngle) },
      delta: { angle: deltaAngle }
    });

    this.setState(prevState => {
      if (
        prevState.dragInfo!.startingRingPosition + rounded !==
        prevState.rotation[prevState.selected]
      ) {
        const nextRotation = [...prevState.rotation];
        nextRotation[prevState.selected] =
          prevState.dragInfo!.startingRingPosition + rounded;
        return {
          rotation: nextRotation
        };
      }
      return null;
    });
  };

  handleMouseUp = (event: any) => {
    this.setState({ dragInfo: null });
  };

  selectAdjacentRing = (isOutward: boolean) => {
    this.setState(prevState => {
      let nextSelected = prevState.selected + (isOutward ? 1 : -1);
      if (!this.currentStage.rings[nextSelected]) {
        return null;
      }
      return {
        selected: nextSelected
      };
    });
  };

  togglePower = () => {
    this.setState(prevState => {
      const nextDisabled = [...prevState.disabled];
      nextDisabled[prevState.selected] = !nextDisabled[prevState.selected];
      return { disabled: nextDisabled };
    });
  };

  keyboardListener = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
        return this.selectAdjacentRing(true);
      case "ArrowDown":
      case "s":
        return this.selectAdjacentRing(false);
      case "ArrowLeft":
      case "a":
        return this.rotate(false);
      case "ArrowRight":
      case "d":
        return this.rotate(true);
      case " ":
        return this.togglePower();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.keyboardListener);
    // document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
    soundEffects.startStage.play();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyboardListener);
    // document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  componentDidUpdate(prevProps: PuzzleScreenProps, prevState: any) {
    if (this.state.selected !== prevState.selected) {
      soundEffects.ringSelected.play();
    }

    const prevPoweredPorts = this.calculatePoweredPorts(
      this.calculateAllRingStates(prevState)
    );
    const poweredPorts = this.calculatePoweredPorts(
      this.calculateAllRingStates(this.state)
    );
    const hasWon = this.currentStage.ports.every(p => poweredPorts.has(p));

    if (hasWon) {
      soundEffects.finalPortPowered.play();
      document.removeEventListener("keydown", this.keyboardListener);
    } else {
      for (let port of poweredPorts) {
        if (!prevPoweredPorts.has(port)) {
          soundEffects.portPowered.play();
          break;
        }
      }
    }
  }

  calculateRingState = (
    ringIndex: number,
    currentRing: StageRingLayout,
    state: PuzzleScreenState
  ): RingState => {
    const rotationOffset = state.rotation[ringIndex];
    const isDisabled = state.disabled[ringIndex];
    const isSelected = state.selected === ringIndex;

    const lasers = currentRing.lasers.map(laserPosition => ({
      startingPosition: laserPosition,
      currentRotatedPosition: normalize(laserPosition + rotationOffset),
      currentBeamTarget: normalize(laserPosition + rotationOffset + 6)
    }));

    const blockers = currentRing.blockers.map(blockerPosition => ({
      startingPosition: blockerPosition,
      currentRotatedPosition: normalize(blockerPosition + rotationOffset)
    }));

    return {
      index: ringIndex,
      rotationOffset,
      isSelected,
      isDisabled,
      lasers,
      blockers
    };
  };

  calculateObstructions = (ringState: Array<RingState | null>) => {
    const ports = new Set(this.currentStage.ports);

    const obstructions = ringState.map(ring => {
      if (ring === null || ring.isDisabled) {
        return new Set();
      }
      let lasers = ring.lasers.map(l => l.currentRotatedPosition);
      let blockers = ring.blockers.map(b => b.currentRotatedPosition);
      return new Set([...lasers, ...blockers]);
    });

    const populateObstructedBy = (laser: LaserState, ringIndex: number) => {
      //see if blocked at the same position by an inner ring
      // check for obstruction in front
      // look at indexes less than self for obstruction at same position

      const position = laser.currentRotatedPosition;
      for (let i = ringIndex - 1; i >= 0; i--) {
        if (obstructions[i].has(position)) {
          laser.obstructedBy = { ringIndex: i, position };
          return;
        }
      }

      // check for obstruction across
      // look at all indexes for obstruction at position + 6
      const laserTarget = laser.currentBeamTarget;
      for (let i = 0; i < ringState.length; i++) {
        if (obstructions[i].has(laserTarget)) {
          laser.obstructedBy = { ringIndex: i, position: laserTarget };
          return;
        }
      }
    };

    for (let ring of ringState) {
      if (!ring) continue;
      for (let laser of ring.lasers) {
        populateObstructedBy(laser, ring.index);
        laser.isTouchingPort =
          !laser.obstructedBy && ports.has(laser.currentBeamTarget);
      }
    }
  };

  calculateAllRingStates = (state = this.state) => {
    const ringStates: Array<RingState | null> = [];

    for (let [ringIndex, ring] of this.currentStage.rings.entries()) {
      if (!ring) {
        ringStates[ringIndex] = null;
      } else {
        ringStates[ringIndex] = this.calculateRingState(ringIndex, ring, state);
      }
    }

    this.calculateObstructions(ringStates);
    return ringStates;
  };

  calculatePoweredPorts = (ringStates: Array<null | RingState>) => {
    const lasers = ringStates.flatMap(ring => {
      if (ring === null || ring.isDisabled) {
        return [];
      }
      return ring.lasers;
    });
    const unblockedLasers = lasers
      .filter(l => l.isTouchingPort)
      .map(l => l.currentBeamTarget);

    return new Set(unblockedLasers);
  };

  render() {
    const ringStates = this.calculateAllRingStates();
    const poweredPorts = this.calculatePoweredPorts(ringStates);

    const hasWon = this.currentStage.ports.every(p => poweredPorts.has(p));

    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 861"
          style={{
            width: "100vw",
            height: "100vh",
            animation: "puzzleEnterAnimation 1.6s",
            transition: "all 1s",
            filter: hasWon ? "blur(5px)" : undefined,
            cursor: this.state.dragInfo ? "move" : undefined
          }}
          preserveAspectRatio="xMidYMid slice"
          onMouseMove={this.handleMouseMove}
        >
          <Defs />

          <ExteriorBorder />

          {ringStates.map(
            ring =>
              ring && (
                <Ring
                  key={ring.index}
                  index={ring.index}
                  isSelected={ring.index === this.state.selected}
                  lasers={ring.lasers}
                  blockers={ring.blockers}
                  rotationOffset={ring.rotationOffset}
                  isDisabled={ring.isDisabled}
                  onMouseDown={this.handleRingMouseDown}
                />
              )
          )}

          {this.currentStage.ports.map(position => (
            <PowerPort
              key={position}
              position={position}
              isPowered={poweredPorts.has(position)}
            />
          ))}
        </svg>

        {hasWon && <StageCompletedDialog />}
      </>
    );
  }
}

export default PuzzleScreen;
