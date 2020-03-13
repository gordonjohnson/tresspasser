import React from "react";
import { BlockerState } from "./types";
import {
  ROTATION_TIMING,
  ORIGIN,
  BEAM_LENGTH,
  RING_RADIUS,
  PORT_RADIUS
} from "./constants";

interface BlockerProps extends BlockerState {
  ring: {
    index: number;
    isSelected: boolean;
    isDisabled: boolean;
    rotationOffset: number;
  };
}

const FrontImpactMask = (props: BlockerProps) => {
  /**
   * This mask should be applied to any beam that is being obstructed by the
   * front of the blocker.
   */

  const { startingPosition, ring, currentRotatedPosition } = props;
  const rotation = (360 / 12) * (startingPosition + ring.rotationOffset);
  const translation = -49 * ring.index;
  const innerRadius = RING_RADIUS[ring.index];
  const outerRadius = innerRadius + BEAM_LENGTH;
  const angle = 60;
  const toRad = Math.PI / 180;
  const sine = Math.sin(angle * toRad);
  const cosine = Math.cos(angle * toRad);
  const innerDeltaX = innerRadius * sine;
  const innerDeltaY = innerRadius - innerRadius * cosine;
  const outerDeltaX = outerRadius * sine;
  return (
    <mask
      id={`front-mask-${ring.index}-${currentRotatedPosition}`}
      maskUnits="userSpaceOnUse"
    >
      <rect x="0" y="0" width="100%" height="100%" fill="white" />
      <g
        transform={`rotate(${rotation} ${ORIGIN.x},${ORIGIN.y})`}
        style={{ transition: `transform ${ROTATION_TIMING}ms linear` }}
      >
        <path
          strokeWidth={3}
          fill="black"
          stroke="black"
          d={`m ${ORIGIN.x} ${ORIGIN.y - innerRadius}
             m -${innerDeltaX},${innerDeltaY}
             a ${innerRadius},${innerRadius} 0 0 1 ${2 * innerDeltaX},0
             l ${outerDeltaX - innerDeltaX},${innerRadius - outerRadius}
             a ${outerRadius},${outerRadius} 0 0 0 -${2 * outerDeltaX},0
             z`}
        />
        <g transform={`translate(0, ${translation})`}>
          <rect fill="black" x="928" y="271" width="65" height="11" />
          <path
            fill="black"
            stroke="black"
            strokeWidth={3}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            d="m 923,279.5 c 0,0 6.20881,0.99632 9.26021,3.4959 3.0514,2.49958 3.73979,10.4877 7.73979,11.653 4,1.1653 13.31899,1.52945 20,1.52945 6.68101,0 16,-0.36415 20,-1.52945 4,-1.1653 4.68839,-9.15342 7.73979,-11.653 C 990.79119,280.49632 997,279.5 997,279.5"
          />
        </g>
      </g>
    </mask>
  );
};

const BackImpactMask = (props: BlockerProps) => {
  /**
   * This mask should be applied to any beam that is being obstructed by the
   * back of the blocker.
   */
  const { startingPosition, ring, currentRotatedPosition } = props;
  const rotation = (360 / 12) * (startingPosition + ring.rotationOffset);
  const innerRadius = RING_RADIUS[ring.index];
  const outerRadius = PORT_RADIUS;

  return (
    <mask
      id={`back-mask-${ring.index}-${currentRotatedPosition}`}
      maskUnits="userSpaceOnUse"
    >
      <g
        transform={`rotate(${rotation} ${ORIGIN.x},${ORIGIN.y})`}
        style={{ transition: `transform ${ROTATION_TIMING}ms linear` }}
      >
        <path
          strokeWidth={3}
          fill="white"
          stroke="white"
          d={`M ${ORIGIN.x - outerRadius},${ORIGIN.y}
          a ${outerRadius},${outerRadius} 0 0 1 ${2 * outerRadius},0
          h -${outerRadius - innerRadius}
          a ${innerRadius},${innerRadius} 0 0 0 -${2 * innerRadius},0
          z`}
        />
      </g>
    </mask>
  );
};

export function Blocker(props: BlockerProps) {
  const { startingPosition, ring } = props;
  const rotation = (360 / 12) * (startingPosition + ring.rotationOffset);
  const translation = -49 * ring.index;
  return (
    <g id={`blocker-${ring.index}-${startingPosition}`}>
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
          {props.currentRotatedPosition}
        </text> */}
      </g>
      <FrontImpactMask {...props} />
      <BackImpactMask {...props} />
    </g>
  );
}
