import React, { Fragment } from "react";
import { LaserState, Obstructor } from "./types";
import {
  ORIGIN,
  RING_RADIUS,
  BEAM_LENGTH,
  LASER_POINTER_RADIUS
} from "./constants";

export interface LaserProps extends LaserState {
  ringIndex: number;
  ringIsSelected: boolean;
  ringIsDisabled: boolean;
}

interface LaserBeamMaskProps {
  id: string;
  currentRotatedPosition: number;
  obstructedBy?: Obstructor;
}

const LaserBeamMask = (props: LaserBeamMaskProps) => {
  // A <mask> is used to shorten the length of the laser beam when the beam
  // becomes obstructed

  const { id, currentRotatedPosition, obstructedBy } = props;
  if (!obstructedBy) {
    // beam doesn't need to be masked and will extend to the ends of the screen
    return null;
  }
  const radius = RING_RADIUS[obstructedBy.ringIndex];

  // The beam mask varies depending on where the obstruction is in relation
  // to the beam emitter
  const obstructedOnSameSide = currentRotatedPosition === obstructedBy.position;

  if (obstructedOnSameSide) {
    // The beam may not extend *inside* of the ring causing the obstruction
    return (
      <mask id={id} maskUnits="userSpaceOnUse">
        <rect x={0} y={0} width="100%" height="100%" fill="white" />
        <path
          strokeWidth={3}
          fill="black"
          stroke="black"
          d={`M ${ORIGIN.x - radius},${ORIGIN.y}
              a ${radius},${radius} 0 0 1 ${2 * radius},0
              v ${BEAM_LENGTH}
              h -${2 * radius}
              Z`}
        />
      </mask>
    );
  }

  // The obstruction must be across on the other side of the ring. In that case,
  // the beam may not extend *outside* of the ring causing the obstruction
  return (
    <mask id={id} maskUnits="userSpaceOnUse">
      <path
        strokeWidth={3}
        fill="white"
        stroke="white"
        d={`M ${ORIGIN.x - radius},${ORIGIN.y}
            a ${radius},${radius} 0 0 0 ${2 * radius},0
            v -${BEAM_LENGTH}
            h -${2 * radius}
            Z`}
      />
    </mask>
  );
};

const RedLaserBeam = (props: LaserProps) => {
  const { startingPosition, ringIndex } = props;
  const id = `beam-${ringIndex}-${startingPosition}`;

  const beams = [
    { name: "outer", width: 32, blur: 48, color: "#F00" },
    { name: "outer2", width: 24, blur: 12, color: "#F00" },
    { name: "mid", width: 8, blur: 2, color: "#F45C57" }
    // { name: "core", width: 6, blur: 1, color: "#FFF" }
  ];

  const x = (beamWidth: number) => ORIGIN.x - 0.5 * beamWidth;
  const y = ORIGIN.y - RING_RADIUS[ringIndex];

  return (
    <>
      <defs>
        <linearGradient
          id="whiteToTransparentLinearGradient"
          gradientTransform="rotate(90)"
        >
          <stop offset="66%" stopColor="white"></stop>
          <stop offset="100%" stopColor="white" stopOpacity="0"></stop>
        </linearGradient>

        <LaserBeamMask id={id} {...props} />
      </defs>

      <g
        style={{
          animation: "glowAnimation 1.5s infinite",
          mixBlendMode: "screen"
        }}
        mask={`url(#${id})`}
      >
        {beams.map(b => (
          <Fragment key={b.name}>
            <filter
              id={`filter-${b.name}-${ringIndex}-${startingPosition}`}
              x="-450%"
              y="0"
              width="900%"
              height="100%"
            >
              <feGaussianBlur result="blur" stdDeviation={b.blur} />
            </filter>

            <rect
              // x={960 - b.width / 2}
              // y={274 - translateY}
              x={x(b.width)}
              y={y}
              width={b.width}
              height={BEAM_LENGTH}
              fill={b.color}
              filter={`url(#filter-${b.name}-${ringIndex}-${startingPosition})`}
            />
          </Fragment>
        ))}

        <filter id="the-core" x="-450%" y="0" width="900%" height="100%">
          <feGaussianBlur result="blur" stdDeviation={1} />
          <feMerge>
            <feMergeNode in="blur" />
            {/* <feMergeNode in="SourceGraphic" /> */}
          </feMerge>
        </filter>

        {/* <rect
          id={`core-laser-beam-${ringIndex}-${startingPosition}`}
          x={960 - 3}
          y={274 - translateY}
          width={6}
          height={beamLength}
          fill="url(#whiteToTransparentLinearGradient)"
          filter={"url(#the-core)"}
          // mask={`url(#mask-laser-beam-${ringIndex}-${startingPosition})`}
        /> */}

        <filter id={`angry2`} x="-450%" y="0" width="900%" height="100%">
          <feGaussianBlur result="blur" stdDeviation={4} />
          <feGaussianBlur result="blur2" stdDeviation={8} />
          <feGaussianBlur result="blur3" stdDeviation={16} />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur2" />
          </feMerge>
        </filter>
        <filter id={`angry3`} x="-450%" y="0" width="900%" height="100%">
          <feGaussianBlur result="blur2" stdDeviation={2} />
        </filter>

        {}

        <path
          d={`m ${x(32)},${y} a 16,422 0 0 0 16,422 16,422 0 0 0 16,-422 z`}
          fill="#F00"
          filter={"url(#angry2)"}
        />
        <path
          d={`m ${x(14)},${y} a 7,422 0 0 0 7,422 7,422 0 0 0 7,-422 z`}
          fill="#F45C57"
          filter={"url(#angry3)"}
        />

        <path
          d={`m ${x(10)},${y} a 5,414 0 0 0 5,414 5,414 0 0 0 5,-414 z`}
          fill="url(#whiteToTransparentLinearGradient)"
          // fill="white"
          filter={"url(#the-core)"}
        />
      </g>
    </>
  );
};

const GreenLaserBeam = (props: LaserProps) => {
  const { startingPosition, ringIndex, ringIsSelected } = props;

  // const beams = [
  //   { name: "outer", width: 32, blur: 48, color: "#39ff14" },
  //   { name: "outer2", width: 24, blur: 12, color: "#39ff14" },
  //   { name: "mid", width: 8, blur: 2, color: "#ddff99" }
  //   // { name: "core", width: 6, blur: 1, color: "#FFF" }
  // ];

  const x = (beamWidth: number) => ORIGIN.x - 0.5 * beamWidth;
  const y = ORIGIN.y - RING_RADIUS[ringIndex];

  const coreWidth = 12;
  const coreHeight = 800;

  return (
    <g
      id={`beam-${ringIndex}-${startingPosition}`}
      mask="url(#portRadiusCutoff)"
      style={{
        animation: "glowAnimation 1.5s infinite",
        mixBlendMode: "screen"
      }}
    >
      <g
        style={{
          transition: "transform 0.5s ease-out",
          transform: `scaleX(${ringIsSelected ? 1 : 0.66})`,
          transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`
        }}
      >
        <filter id={`blur1`} x="-450%" y="0" width="900%" height="100%">
          <feGaussianBlur result="blur" stdDeviation={1} />
        </filter>
        <filter id={`blur2`} x="-450%" y="0" width="900%" height="100%">
          <feGaussianBlur result="blur" stdDeviation={2} />
        </filter>
        <filter id={`blur12`} x="-450%" y="0" width="900%" height="100%">
          <feGaussianBlur result="blur" stdDeviation={12} />
        </filter>
        <filter id={`blur32`} x="-4.5" y="0" width="10" height="1">
          <feGaussianBlur result="blur" stdDeviation={32} />
        </filter>

        {/* Outer glow */}
        {ringIsSelected && (
          <rect
            x={x(24)}
            y={y}
            width={24}
            height={BEAM_LENGTH}
            fill={"#39ff14"}
            filter={"url(#blur32)"}
          />
        )}

        <rect
          x={x(24)}
          y={y}
          width={24}
          height={BEAM_LENGTH}
          fill={"#39ff14"}
          filter={"url(#blur12)"}
        />

        <rect
          x={x(18)}
          y={y}
          width={18}
          height={BEAM_LENGTH}
          fill={"#A1FF4E"}
          filter={"url(#blur2)"}
        />

        <defs>
          <linearGradient id="coreGradient" gradientTransform="rotate(90)">
            <stop offset="66%" stopColor="white" stopOpacity=".9"></stop>
            <stop offset="100%" stopColor="white" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient id="angryGradient2" gradientTransform="rotate(90)">
            <stop offset="66%" stopColor="#39ff14" stopOpacity=".9"></stop>
            <stop offset="100%" stopColor="#F7FF7F" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient id="angryGradient3" gradientTransform="rotate(90)">
            <stop offset="66%" stopColor="#39ff14" stopOpacity=".9"></stop>
            <stop offset="100%" stopColor="#F7FF7F" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient id="yellowGrad" gradientTransform="rotate(90)">
            <stop offset="66%" stopColor="#F7FF7F" stopOpacity="1"></stop>
            <stop offset="100%" stopColor="#F7FF7F" stopOpacity="0"></stop>
          </linearGradient>

          <filter id={`green-angry2`} x="-4.5" y="0" width="10" height="2">
            <feGaussianBlur result="blur" stdDeviation={4} />
            <feGaussianBlur result="blur2" stdDeviation={8} />
            {/* <feGaussianBlur result="blur3" stdDeviation={16} />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur2" />
          </feMerge> */}
          </filter>
          <filter
            id={`green-angry3`}
            x="-450%"
            y="0"
            width="900%"
            height="100%"
          >
            <feGaussianBlur result="blur3" stdDeviation={3} />
          </filter>
        </defs>

        {ringIsSelected && (
          <path
            d={`m ${x(40)},${y} a 20,522 0 0 0 20,522 20,522 0 0 0 20,-522 z`}
            fill="url(#angryGradient2)"
            filter={"url(#green-angry2)"}
          />
        )}
        <path
          d={`m ${x(28)},${y} a 14,522 0 0 0 14,522 14,522 0 0 0 14,-522 z`}
          fill="url(#angryGradient3)"
          filter={"url(#green-angry3)"}
        />

        <path
          d={`m ${x(coreWidth)},${y}
            a ${coreWidth / 2},${coreHeight} 0 0 0 ${coreWidth /
            2},${coreHeight}
            ${coreWidth / 2},${coreHeight} 0 0 0 ${coreWidth /
            2},-${coreHeight} z`}
          stroke="url(#yellowGrad)"
          strokeWidth={3}
          fill="url(#coreGradient)"
          filter={"url(#blur1)"}
        />
      </g>
    </g>
  );
};

const Emitter = (props: LaserProps) => {
  const {
    ringIndex,
    ringIsSelected,
    ringIsDisabled,
    isTouchingPort,
    startingPosition
  } = props;
  const cx = ORIGIN.x;
  const cy = ORIGIN.y - RING_RADIUS[ringIndex];

  let chevronColor = isTouchingPort ? "#296944" : "#580812";
  let circleColor;
  //let circleColor = isTouchingPort ? "#D2EDC6" : "#D6BFBC";

  if (ringIsDisabled && ringIsSelected) {
    circleColor = "#614202";
    chevronColor = "#000";
  } else if (ringIsDisabled) {
    circleColor = "#B6B6B3";
    chevronColor = "#4C4C49";
  } else if (ringIsSelected) {
    circleColor = "#fff";
  } else if (isTouchingPort) {
    circleColor = "#D2EDC6";
  } else {
    circleColor = "#D6BFBC";
  }

  const backgroundGlow = (
    <circle
      cx={cx}
      cy={cy}
      r={ringIsSelected ? LASER_POINTER_RADIUS + 3 : LASER_POINTER_RADIUS}
      fill={isTouchingPort ? "#39FF14" : "#F00"}
      filter={"url(#emitterGlow)"}
      style={{ mixBlendMode: ringIsSelected ? "screen" : "normal" }}
    />
  );

  const whiteCircle = (
    <circle
      cx={cx}
      cy={cy}
      r={LASER_POINTER_RADIUS}
      strokeWidth={0}
      fill={circleColor}
      opacity={ringIsDisabled ? 1 : 0.9}
    />
  );

  const arrows = (
    <path
      fill="none"
      stroke={chevronColor}
      strokeWidth={4}
      strokeLinecap="round"
      d={`m ${cx - 10},${cy - 10} 10,10 10,-10
        m 0,11 -10,10 -10,-10`}
    />
  );

  return (
    <g id={`laser-emitter-${ringIndex}-${startingPosition}`}>
      {ringIsDisabled ? null : backgroundGlow}
      {whiteCircle}
      {arrows}

      {/* <text
        x={cx}
        y={cy}
        fill="red"
        stroke="black"
        strokeWidth={2}
        textAnchor="middle"
        style={{ fontSize: 40, fontWeight: "bold" }}
      >
        {props.currentRotatedPosition}
      </text> */}
    </g>
  );
};

export const Laser = (props: LaserProps) => {
  const { startingPosition, ringIndex, isTouchingPort, ringIsDisabled } = props;

  // Lasers are drawn vertically at the 12 o'clock position, but are rotated
  // some number of degrees corresponding to their starting position on the ring
  const rotation = (360 / 12) * startingPosition;

  let laserBeam;

  if (ringIsDisabled) {
    laserBeam = null;
  } else if (isTouchingPort) {
    laserBeam = <GreenLaserBeam {...props} />;
  } else {
    laserBeam = <RedLaserBeam {...props} />;
  }

  return (
    <g
      id={`laser-${ringIndex}-${startingPosition}`}
      transform={`rotate(${rotation} ${ORIGIN.x},${ORIGIN.y})`}
    >
      {laserBeam}
      <Emitter {...props} />
    </g>
  );
};
