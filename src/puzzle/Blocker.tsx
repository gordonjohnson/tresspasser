import React from "react";
import { BlockerState } from "./types";

interface BlockerProps extends BlockerState {
  ringIndex: number;
  ringIsSelected: boolean;
  ringIsDisabled: boolean;
  debug: number;
}

export function Blocker(props: BlockerProps) {
  const { startingPosition, ringIndex, ringIsDisabled } = props;
  const rotation = 30 * startingPosition;
  const translation = -49 * ringIndex;
  return (
    <g
      // transform={`rotate(${rotation}, 960, 421.5) translate(0, ${translation})`}
      style={{
        transformOrigin: "960px 421.5px",
        transform: `rotate(${rotation}deg) translateY(${translation}px)`
      }}
    >
      <path
        fill="none"
        stroke="white"
        strokeWidth={3}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeOpacity={ringIsDisabled ? 0.2 : 1}
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
