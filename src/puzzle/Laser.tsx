import React from "react";
import { LaserState } from "./types";

export interface LaserProps extends LaserState {
  ringIndex: number;
  debug: number;
}

export function Laser(props: LaserProps) {
  const { startingPosition, ringIndex, isTouchingPort } = props;
  const rotation = 30 * startingPosition;
  const translateY = 48.5 * ringIndex;

  return (
    <g
      style={{
        transformOrigin: "960px 421.5px",
        transform: `rotate(${rotation}deg) `
      }}
    >
      <circle
        cx={960}
        cy={274 - translateY}
        r={23}
        fill="white"
        stroke="white"
        strokeWidth={1.5}
      />
      <path
        fill="none"
        stroke="#296944ff"
        strokeWidth={3}
        strokeLinecap="round"
        d={`m 950,${264.79436 - translateY} 10,9.70564 9.41127,-9.70564`}
      />
      <path
        fill="none"
        stroke="#296944ff"
        strokeWidth={3}
        strokeLinecap="round"
        d={`m 950,${275.79436 - translateY} 10,9.70564 9.41127,-9.70564`}
      />
      <path
        d={`M 960,${298 - translateY} v 1300`}
        fill="none"
        stroke={isTouchingPort ? "lime" : "red"}
        strokeWidth="5"
        strokeLinecap="butt"
      />
      <text
        x={947}
        y={288 - translateY}
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
