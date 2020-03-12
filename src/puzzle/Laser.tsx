import React, { Fragment, ReactNode } from "react";
import { LaserState } from "./types";
import {
  ORIGIN,
  RING_RADIUS,
  BEAM_LENGTH,
  LASER_POINTER_RADIUS,
  ROTATION_TIMING,
  PORT_RADIUS
} from "./constants";

interface LaserProps extends LaserState {
  ring: {
    index: number;
    isSelected: boolean;
    isDisabled: boolean;
    rotationOffset: number;
  };
}

const RedLaserBeam = (props: LaserProps) => {
  const { startingPosition, ring } = props;

  const beams = [
    { name: "outer", width: 32, blur: 48, color: "#F00" },
    { name: "outer2", width: 24, blur: 12, color: "#F00" },
    { name: "mid", width: 8, blur: 2, color: "#F45C57" }
    // { name: "core", width: 6, blur: 1, color: "#FFF" }
  ];

  const x = (beamWidth: number) => ORIGIN.x - 0.5 * beamWidth;
  const y = ORIGIN.y - RING_RADIUS[ring.index];

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
      </defs>

      <g
        style={{
          animation: "glowAnimation 1.5s infinite",
          mixBlendMode: "screen"
        }}
      >
        {beams.map(b => (
          <Fragment key={b.name}>
            <filter
              id={`filter-${b.name}-${ring.index}-${startingPosition}`}
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
              filter={`url(#filter-${b.name}-${ring.index}-${startingPosition})`}
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
  const { startingPosition, ring } = props;

  // const beams = [
  //   { name: "outer", width: 32, blur: 48, color: "#39ff14" },
  //   { name: "outer2", width: 24, blur: 12, color: "#39ff14" },
  //   { name: "mid", width: 8, blur: 2, color: "#ddff99" }
  //   // { name: "core", width: 6, blur: 1, color: "#FFF" }
  // ];

  const x = (beamWidth: number) => ORIGIN.x - 0.5 * beamWidth;
  const y = ORIGIN.y - RING_RADIUS[ring.index];

  const coreWidth = 12;
  const coreHeight = 800;

  return (
    <g
      id={`beam-${ring.index}-${startingPosition}`}
      style={{
        animation: "glowAnimation 1.5s infinite",
        mixBlendMode: "screen"
      }}
    >
      <g
        style={{
          transition: "transform 0.5s ease-out",
          transform: `scaleX(${ring.isSelected ? 1 : 0.66})`,
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
        {ring.isSelected && (
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

        {ring.isSelected && (
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
  const { ring, isTouchingPort, startingPosition } = props;
  const cx = ORIGIN.x;
  const cy = ORIGIN.y - RING_RADIUS[ring.index];

  let chevronColor = isTouchingPort ? "#296944" : "#580812";
  let circleColor;
  //let circleColor = isTouchingPort ? "#D2EDC6" : "#D6BFBC";

  if (ring.isDisabled && ring.isSelected) {
    circleColor = "#614202";
    chevronColor = "#000";
  } else if (ring.isDisabled) {
    circleColor = "#B6B6B3";
    chevronColor = "#4C4C49";
  } else if (ring.isSelected) {
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
      r={ring.isSelected ? LASER_POINTER_RADIUS + 3 : LASER_POINTER_RADIUS}
      fill={isTouchingPort ? "#39FF14" : "#F00"}
      filter={"url(#emitterGlow)"}
      style={{ mixBlendMode: ring.isSelected ? "screen" : "normal" }}
    />
  );

  const whiteCircle = (
    <circle
      cx={cx}
      cy={cy}
      r={LASER_POINTER_RADIUS}
      strokeWidth={0}
      fill={circleColor}
      opacity={ring.isDisabled ? 1 : 0.9}
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
    <g id={`laser-emitter-${ring.index}-${startingPosition}`}>
      {ring.isDisabled ? null : backgroundGlow}
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

const FrontObstructionMask = (props: LaserProps) => {
  /**
   * Places a wedge ⌔ behind the current laser emitter that other beams cannot
   * draw into.
   *
   * If the current laser is obstructing another beam from across the opposite
   * end of the ring, the other beam will apply this mask.
   *
   *        ⌔      this mask (hides other beam)
   *       (▼)     this laser
   *        ↑
   *       (△)     other laser
   *
   */

  const { startingPosition, ring, currentRotatedPosition } = props;
  const rotation = (360 / 12) * (startingPosition + ring.rotationOffset);
  const innerRadius = RING_RADIUS[ring.index];
  const outerRadius = innerRadius + BEAM_LENGTH;
  const angle = 45;
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
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y - RING_RADIUS[ring.index]}
          r={LASER_POINTER_RADIUS}
          fill="black"
        />
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
      </g>
    </mask>
  );
};

const BackObstructionMask = (props: LaserProps) => {
  /**
   * Places an arc ◠ behind the current laser emitter that other beams may
   * draw into, but not elsewhere.
   *
   * If the current laser is obstructing another beam that is behind it, the
   * other beam will only be visible within this mask and not outside of it.
   *
   *       (▽)    other laser
   *        ⭣
   *        ◠     this mask (shows other beam)
   *       (▼)     this laser
   *
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
        <circle
          cx={ORIGIN.x}
          cy={ORIGIN.y - RING_RADIUS[ring.index]}
          r={LASER_POINTER_RADIUS}
          fill="black"
        />
      </g>
    </mask>
  );
};

export const Laser = (props: LaserProps) => {
  const {
    startingPosition,
    ring,
    isTouchingPort,
    obstructedBy,
    currentRotatedPosition
  } = props;

  // Lasers are initially drawn vertically starting at 12 o'clock pointing to
  // 6 o'clock. They then get rotated some number of degrees into their actual
  // position via a transform.
  const rotation = (360 / 12) * (startingPosition + ring.rotationOffset);

  // Figure what type of beam to draw
  let laserBeam: ReactNode;
  if (ring.isDisabled) {
    laserBeam = null;
  } else if (isTouchingPort) {
    laserBeam = <GreenLaserBeam {...props} />;
  } else {
    laserBeam = <RedLaserBeam {...props} />;
  }

  // Lasers beams will extend to infinity unless they are obstructed by a power
  // port, a blocker, or another laser. The obstruction type determines what
  // masking layer we apply to the beam.
  let mask: string | undefined;
  if (isTouchingPort) {
    mask = "url(#portRadiusCutoff)";
  } else if (obstructedBy) {
    const facing =
      currentRotatedPosition === obstructedBy.position ? "back" : "front";
    mask = `url(#${facing}-mask-${obstructedBy.ringIndex}-${obstructedBy.position})`;
  }

  return (
    <g id={`laser-${ring.index}-${startingPosition}`} mask={mask}>
      <g
        transform={`rotate(${rotation} ${ORIGIN.x},${ORIGIN.y})`}
        style={{ transition: `transform ${ROTATION_TIMING}ms linear` }}
      >
        {laserBeam}
        <Emitter {...props} />
      </g>
      {/* Each laser creates 2 obstruction masks that other lasers may apply */}
      <FrontObstructionMask {...props} />
      <BackObstructionMask {...props} />
    </g>
  );
};
