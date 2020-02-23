import React from "react";
import { LaserState } from "./types";
import { RING_RADIUS, PORT_RADIUS } from "./constants";

export interface LaserProps extends LaserState {
  ringIndex: number;
  ringIsSelected: boolean;
  debug: number;
}

function calculateBeamLength(props: LaserProps): number {
  const {
    currentRotatedPosition,
    currentBeamTarget,
    ringIndex,
    isTouchingPort,
    obstructedBy
  } = props;

  if (isTouchingPort) {
    return PORT_RADIUS + RING_RADIUS[ringIndex];
  } else if (currentRotatedPosition === obstructedBy?.position) {
    return RING_RADIUS[ringIndex] - RING_RADIUS[obstructedBy.ringIndex];
  } else if (currentBeamTarget === obstructedBy?.position) {
    return RING_RADIUS[ringIndex] + RING_RADIUS[obstructedBy.ringIndex] - 15.5;
  } else {
    return 1400;
  }
}

export function Laser(props: LaserProps) {
  const { startingPosition, ringIndex, isTouchingPort, ringIsSelected } = props;
  const rotation = 30 * startingPosition;
  const translateY = 48.5 * ringIndex;
  const beamLength = calculateBeamLength(props);

  return (
    <g
      style={{
        transformOrigin: "960px 421.5px",
        transform: `rotate(${rotation}deg) `
      }}
    >
      {/*
          Using a <path> or <line> as the laser beam doesn't work well the
          glow filter since those elements have no actual height/width.
          Instead, we use a <rect> to create the beam. That way we can
          leverage objectBoundingBox units in the filter definition.
        */}
      <rect
        id={`laser-beam-${ringIndex}-${startingPosition}`}
        x={isTouchingPort ? 950 : 955}
        y={274 - translateY}
        width={isTouchingPort ? 20 : 10}
        height={beamLength}
        fill={isTouchingPort ? "lime" : "red"}
        filter={"url(#laserBeamGlow)"}
      />
      <circle
        id={`emitter-glow-${ringIndex}-${startingPosition}`}
        cx={960}
        cy={274 - translateY}
        r={23}
        fill={isTouchingPort ? "lime" : "red"}
        filter={"url(#emitterGlow)"}
      />
      <circle
        id={`emitter-${ringIndex}-${startingPosition}`}
        cx={960}
        cy={274 - translateY}
        r={23}
        fill="white"
        stroke="white"
        strokeWidth={1.5}
        opacity={ringIsSelected ? 1 : 0.8}
      />
      <path
        fill="none"
        stroke={isTouchingPort ? "#296944ff" : "#580812ff"}
        strokeWidth={4}
        strokeLinecap="round"
        d={`m 950,${264.79436 - translateY} 10,9.70564 9.41127,-9.70564`}
      />
      <path
        fill="none"
        stroke={isTouchingPort ? "#296944ff" : "#580812ff"}
        strokeWidth={4}
        strokeLinecap="round"
        d={`m 950,${275.79436 - translateY} 10,9.70564 9.41127,-9.70564`}
      />

      {/* <text
        x={947}
        y={288 - translateY}
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
