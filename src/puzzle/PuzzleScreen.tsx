import React, { Component } from "react";
import ExteriorBorder from "./ExteriorBorder";
import PowerPort from "./PowerPort";
import Ring from "./Ring";
import STAGES from "./stages";
import { LaserState, RingState, StageRingLayout } from "./types";
import { normalize } from "./utils";
import { PORT_RADIUS, RING_RADIUS } from "./constants";
import * as soundEffects from "./../sounds/soundEffects";

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
    soundEffects.startStage.play();
    soundEffects.electricalHum.play();
    soundEffects.backgroundMusic.play();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyboardListener);
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

    for (let port of poweredPorts) {
      if (!prevPoweredPorts.has(port)) {
        if (hasWon) {
          soundEffects.finalPortPowered.play();
        } else {
          soundEffects.portPowered.play();
        }
        break;
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
          style={{ width: "100vw", height: "100vh", animation: "fadeIn 1.6s" }}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="portRadiusCutoff" maskUnits="userSpaceOnUse">
              <circle cx={960} cy={421.5} r={PORT_RADIUS} fill="white" />
            </mask>
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
            <filter
              id="emitterGlow"
              x="-250%"
              y="-250%"
              width="500%"
              height="500%"
            >
              <feGaussianBlur result="blur3" stdDeviation={3} />
              <feGaussianBlur result="blur5" stdDeviation={5} />
              <feGaussianBlur result="blur10" stdDeviation={10} />
              <feMerge>
                <feMergeNode in="blur5" />
                <feMergeNode in="blur10" />
              </feMerge>
            </filter>
            <filter
              id="coreLaserBeamGlow"
              x="-250%"
              y="0"
              width="500%"
              height="100%"
            >
              <feGaussianBlur result="blur1" stdDeviation={1} />
            </filter>
            <filter
              id="middleLaserBeamGlow"
              x="-250%"
              y="0"
              width="500%"
              height="100%"
            >
              <feGaussianBlur result="blur2" stdDeviation={2} />
            </filter>
            <filter
              id="outerLaserBeamGlow"
              x="-250%"
              y="0"
              width="500%"
              height="100%"
            >
              <feGaussianBlur result="blur10" stdDeviation={10} />
            </filter>

            <radialGradient id="victoryMessageRadialGradient">
              <stop offset="0%" stopColor="#FFF" stopOpacity={0.66} />
              <stop offset="100%" stopColor="#FFF" stopOpacity={0} />
            </radialGradient>
            <linearGradient
              id="victoryMessageLinearGradient"
              gradientTransform="rotate(90)"
            >
              <stop offset="0%" stopColor="#173144" stopOpacity={0.97} />
              <stop offset="100%" stopColor="#1C4B72" stopOpacity={0.97} />
            </linearGradient>
          </defs>

          <ExteriorBorder />

          {this.currentStage.ports.map(position => (
            <PowerPort
              key={position}
              position={position}
              isPowered={poweredPorts.has(position)}
            />
          ))}

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
                  />
                )
            )}

          {hasWon && (
            <g
              style={{
                animation: "fadeIn 1s",
                transformOrigin: "center"
              }}
            >
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#victoryMessageRadialGradient)"
              />
              <rect
                x="30%"
                y="30%"
                width="40%"
                height="40%"
                fill="url(#victoryMessageLinearGradient)"
                stroke="#97BFB7"
                opacity="1"
              />
              <text
                x="50%"
                y="40%"
                textAnchor="middle"
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                  fontFamily: "Aguda"
                }}
              >
                <tspan fill="#FFF" x="50%" textAnchor="middle">
                  AWESOME
                </tspan>
                <tspan fill="#FFF" x="50%" textAnchor="middle" dy="1em">
                  You did it
                </tspan>
                <tspan
                  fill="#FFF"
                  x="50%"
                  textAnchor="middle"
                  dy="4em"
                  onClick={() => alert("test")}
                >
                  Continue
                </tspan>
              </text>
            </g>
          )}
        </svg>

      </>
    );
  }
}

export default PuzzleScreen;
