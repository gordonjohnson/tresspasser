import React from "react";
import { Blocker } from "./Blocker";
import { ORIGIN, RING_RADIUS } from "./constants";
import { Laser } from "./Laser";
import { RingState } from "./types";
import { Filter } from "./Defs";

interface RingProps extends RingState {
  onMouseDown: (
    event: React.MouseEvent<SVGCircleElement, MouseEvent>,
    ringIndex: number
  ) => void;
  onDoubleClick: () => void;
  isBeingDragged: boolean;
}

function Ring(props: RingProps) {
  const {
    lasers = [],
    blockers = [],
    onMouseDown,
    onDoubleClick,
    ...ring
  } = props;
  const { index, isSelected = false, isDisabled = false } = ring;

  return (
    <g id={`ring-${index}`}>
      <circle
        id={`ring-${index}-hit-box`}
        style={{ cursor: isSelected ? "move" : "pointer" }}
        onMouseDown={e => onMouseDown(e, index)}
        onDoubleClick={onDoubleClick}
        fill="none"
        stroke={"transparent"}
        strokeWidth={48}
        cx={ORIGIN.x}
        cy={ORIGIN.y}
        r={RING_RADIUS[index]}
      />
      <circle
        fill="none"
        stroke={isSelected ? "rgb(248, 171, 18)" : "rgba(255,255,255,0.66)"}
        strokeWidth={isSelected ? 5 : 3}
        strokeOpacity={isDisabled ? 0.2 : 1}
        cx={ORIGIN.x}
        cy={ORIGIN.y}
        r={RING_RADIUS[index]}
        filter={`url(#${
          isSelected ? Filter.SelectedRingGlow : Filter.SoftGlow
        })`}
        style={{ mixBlendMode: "screen" }}
        pointerEvents="none"
      />
      {lasers.map(laser => (
        <Laser key={laser.startingPosition} ring={ring} {...laser} />
      ))}
      {blockers.map(blocker => (
        <Blocker key={blocker.startingPosition} ring={ring} {...blocker} />
      ))}
    </g>
  );
}

export default Ring;
