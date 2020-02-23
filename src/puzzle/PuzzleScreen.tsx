import React, { Component } from "react";
import ExteriorBorder from "./ExteriorBorder";
import PowerPort from "./PowerPort";
import Ring from "./Ring";
import STAGES from "./stages";
import { LaserState, RingState, StageRingLayout } from "./types";
import { normalize } from "./utils";
import { PORT_RADIUS, RING_RADIUS } from "./constants";

interface PuzzleScreenProps {
  stageIndex: number;
}

interface PuzzleScreenState {
  selected: number;
  rotation: Array<number>;
  disabled: Array<boolean>;
}

class PuzzleScreen extends Component<PuzzleScreenProps, PuzzleScreenState> {
  currentStage = STAGES[this.props.stageIndex];
  state = {
    selected: this.currentStage.rings.map(Boolean).lastIndexOf(true),
    rotation: [0, 0, 0, 0],
    disabled: [false, false, false, false]
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

  select = (isOutward: boolean) => {
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

  keyboardListener = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
        return this.select(true);
      case "ArrowDown":
      case "s":
        return this.select(false);
      case "ArrowLeft":
      case "a":
        return this.rotate(false);
      case "ArrowRight":
      case "d":
        return this.rotate(true);
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.keyboardListener);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyboardListener);
  }

  calculateRingState = (
    ringIndex: number,
    currentRing: StageRingLayout
  ): RingState => {
    const rotationOffset = this.state.rotation[ringIndex];
    const isDisabled = this.state.disabled[ringIndex];
    const isSelected = this.state.selected === ringIndex;

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
      let lasers = ring?.lasers.map(l => l.currentRotatedPosition) || [];
      let blockers = ring?.blockers.map(b => b.currentRotatedPosition) || [];
      return new Set([...lasers, ...blockers]);
    });

    // TODO: factor in disabled rings
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

  calculateAllRingStates = () => {
    const ringStates: Array<RingState | null> = [];

    for (let [ringIndex, ring] of this.currentStage.rings.entries()) {
      if (!ring) {
        ringStates[ringIndex] = null;
      } else {
        ringStates[ringIndex] = this.calculateRingState(ringIndex, ring);
      }
    }

    this.calculateObstructions(ringStates);
    return ringStates;
  };

  calculatePoweredPorts = (ringStates: Array<null | RingState>) => {
    const lasers = ringStates.flatMap(r => r?.lasers || []);
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
          style={{ width: "100vw", height: "100vh" }}
        >
          <defs>
            <filter id="selectedRingGlow">
              <feGaussianBlur result="blur5" stdDeviation={5} />
              <feGaussianBlur result="blur10" stdDeviation={10} />
              <feMerge>
                <feMergeNode in="blur5" />
                <feMergeNode in="blur5" />
                <feMergeNode in="blur10" />
                <feMergeNode in="blur10" />
                <feMergeNode in="blur10" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ringGlow">
              <feGaussianBlur result="blur5" stdDeviation={5} />
              <feGaussianBlur result="blur10" stdDeviation={10} />
              <feMerge>
                <feMergeNode in="blur5" />
                <feMergeNode in="blur10" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ExteriorBorder />
          {hasWon && (
            <text
              x="50%"
              y="0"
              textAnchor="middle"
              fill="red"
              stroke="white"
              strokeWidth={2}
              style={{ fontSize: 40, fontWeight: "bold" }}
            >
              YOU A WINNER HAHAHA
            </text>
          )}
          {this.currentStage.ports.map(position => (
            <PowerPort
              key={position}
              position={position}
              isPowered={poweredPorts.has(position)}
            />
          ))}

          {ringStates
            .slice()
            .reverse()
            .map(
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
                  />
                )
            )}
        </svg>

      </>
    );
  }
}

export default PuzzleScreen;
