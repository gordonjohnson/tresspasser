import React from "react";

interface BlockerProps {
  ringIndex: number;
  position: number;
  debug: number;
}

export function Blocker(props: BlockerProps) {
  const { position, ringIndex } = props;
  const rotation = 30 * position;
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
        d="m 923,279.5 c 0,0 6.20881,0.85499 9.26021,3 3.0514,2.14501 3.73979,9 7.73979,10 4,1 13.31899,1.3125 20,1.3125 6.68101,0 16,-0.3125 20,-1.3125 4,-1 4.68839,-7.85499 7.73979,-10 3.0514,-2.14501 9.26021,-3 9.26021,-3"
      />
      <text
        x={947}
        y={288}
        fill="red"
        stroke="black"
        strokeWidth={2}
        style={{ fontSize: 40, fontWeight: "bold" }}
      >
        {props.debug}
      </text>
    </g>
  );
}
