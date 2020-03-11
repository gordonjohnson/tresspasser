import React from "react";
import { Blocker } from "./Blocker";
import { Laser } from "./Laser";
import { BlockerState, LaserState } from "./types";
import { ROTATION_TIMING } from "./constants";

interface RingProps {
  blockers: Array<BlockerState>;
  index: number;
  isDisabled?: boolean;
  isSelected?: boolean;
  lasers: Array<LaserState>;
  rotationOffset: number;
}

function Ring(props: RingProps) {
  const {
    index,
    isSelected = false,
    lasers = [],
    blockers = [],
    isDisabled = false,
    rotationOffset
  } = props;

  const radius = 147 + 48 * index;

  return (
    <g
      style={{
        transformOrigin: "960px 421.5px",
        transition: `transform ${ROTATION_TIMING}ms linear`,
        transform: `rotate(${30 * rotationOffset}deg)`
        // TODO: investigate why will change creates artifacting
        // willChange: "transform"
      }}
    >
      <circle
        fill="none"
        stroke={isSelected ? "rgb(248, 171, 18)" : "rgba(255,255,255,0.66)"}
        strokeWidth={isSelected ? 5 : 3}
        strokeOpacity={isDisabled ? 0.2 : 1}
        cx={960}
        cy={421.5}
        r={radius}
        filter={isSelected ? "url(#selectedRingGlow)" : "url(#ringGlow)"}
        style={{ mixBlendMode: "screen" }}
      />
      {lasers.map(laser => (
        <Laser
          key={laser.startingPosition}
          ringIndex={index}
          ringIsSelected={isSelected}
          ringIsDisabled={isDisabled}
          {...laser}
        />
      ))}
      {blockers.map(blocker => (
        <Blocker
          key={blocker.startingPosition}
          ringIndex={index}
          ringIsSelected={isSelected}
          ringIsDisabled={isDisabled}
          debug={blocker.currentRotatedPosition}
          {...blocker}
        />
      ))}
    </g>
  );
}

export default Ring;
