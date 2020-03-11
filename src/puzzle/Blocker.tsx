import React from "react";
import { BlockerState } from "./types";
import { ROTATION_TIMING, ORIGIN } from "./constants";

interface BlockerProps extends BlockerState {
  ring: {
    index: number;
    isSelected: boolean;
    isDisabled: boolean;
    rotationOffset: number;
  };
}

export function Blocker(props: BlockerProps) {
  const { startingPosition, ring } = props;
  const rotation = (360 / 12) * (startingPosition + ring.rotationOffset);
  const translation = -49 * ring.index;
  return (
    <g
      style={{
        transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`,
        transform: `rotate(${rotation}deg) translateY(${translation}px)`,
        transition: `transform ${ROTATION_TIMING}ms linear`
      }}
    >
      <path
        fill="none"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeOpacity={ring.isDisabled ? 0.2 : 1}
        d="m 923,279.5 c 0,0 6.20881,0.99632 9.26021,3.4959 3.0514,2.49958 3.73979,10.4877 7.73979,11.653 4,1.1653 13.31899,1.52945 20,1.52945 6.68101,0 16,-0.36415 20,-1.52945 4,-1.1653 4.68839,-9.15342 7.73979,-11.653 C 990.79119,280.49632 997,279.5 997,279.5"
      />
      {/* <text
        x={947}
        y={288}
        fill="red"
        stroke="black"
        strokeWidth={2}
        style={{ fontSize: 40, fontWeight: "bold" }}
      >
        {props.debug}
      </text> */}
    </g>
  );
}
