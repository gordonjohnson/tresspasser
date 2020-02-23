import React from "react";
import { Blocker } from "./Blocker";
import { Laser } from "./Laser";
import { BlockerState, LaserState } from "./types";

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
    isDisabled,
    rotationOffset
  } = props;

  const radius = 147 + 48 * index;

  return (
    <g
      style={{
        transformOrigin: "960px 421.5px",
        transition: "transform 100ms linear",
        transform: `rotate(${30 * rotationOffset}deg)`
        // TODO: investigate why will change creates artifacting
        // willChange: "transform"
      }}
    >
      <circle
        fill="none"
        stroke={isSelected ? "#f8ca10ff" : "white"}
        strokeWidth={isSelected ? 5 : 3}
        strokeOpacity={isDisabled ? 0.2 : 1}
        cx={960}
        cy={421.5}
        r={radius}
      />
      {lasers.map(laser => (
        <Laser
          key={laser.startingPosition}
          ringIndex={index}
          debug={laser.currentRotatedPosition}
          {...laser}
        />
      ))}
      {blockers.map(blocker => (
        <Blocker
          key={blocker.startingPosition}
          ringIndex={index}
          position={blocker.startingPosition}
          debug={blocker.currentRotatedPosition}
        />
      ))}
    </g>
  );
}

export default Ring;
