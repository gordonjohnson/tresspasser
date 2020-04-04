import React, { ReactNode } from "react";
import { LaserState } from "./types";
import {
  ORIGIN,
  RING_RADIUS,
  BEAM_LENGTH,
  LASER_POINTER_RADIUS,
  ROTATION_TIMING,
  PORT_RADIUS
} from "./constants";
import { Filter, Mask } from "./Defs";

interface LaserProps extends LaserState {
  ring: {
    index: number;
    isSelected: boolean;
    isDisabled: boolean;
    isBeingDragged: boolean;
    rotationOffset: number;
  };
}

type BeamPart = { href: string; width: number; height: number };

interface BeamParts {
  beamOuterGlowStartCap: BeamPart;
  beamOuterGlow: BeamPart;
  beamStartCap: BeamPart;
  beam: BeamPart;
  emitterGlow: BeamPart;
  outerFlare: BeamPart;
  innerFlare: BeamPart;
  core: BeamPart;
}

const greenBeamParts = {
  beamOuterGlowStartCap: {
    href: require("./assets/green/beam-outer-glow-start-cap.png"),
    width: 196,
    height: 169
  },
  beamOuterGlow: {
    href: require("./assets/green/beam-outer-glow.png"),
    width: 196,
    height: BEAM_LENGTH
  },
  beamStartCap: {
    href: require("./assets/green/beam-start-cap.png"),
    width: 72,
    height: 36
  },
  beam: {
    href: require("./assets/green/beam.png"),
    width: 72,
    height: BEAM_LENGTH
  },
  emitterGlow: {
    href: require("./assets/green/emitter-glow.png"),
    width: 92,
    height: 92
  },
  outerFlare: {
    href: require("./assets/green/outer-flare.png"),
    width: 70,
    height: 677
  },
  innerFlare: {
    href: require("./assets/green/inner-flare.png"),
    width: 38,
    height: 700
  },
  core: {
    href: require("./assets/green/bright-core.png"),
    width: 18,
    height: 694
  }
};

const redBeamParts = {
  beamOuterGlowStartCap: {
    href: require("./assets/red/beam-outer-glow-start-cap.png"),
    width: 301,
    height: 177
  },
  beamOuterGlow: {
    href: require("./assets/red/beam-outer-glow.png"),
    width: 301,
    height: BEAM_LENGTH
  },
  beamStartCap: {
    href: require("./assets/red/beam-start-cap.png"),
    width: 89,
    height: 50
  },
  beam: {
    href: require("./assets/red/beam.png"),
    width: 89,
    height: BEAM_LENGTH
  },
  emitterGlow: {
    href: require("./assets/red/emitter-glow.png"),
    width: 112,
    height: 112
  },
  outerFlare: {
    href: require("./assets/red/outer-flare.png"),
    width: 82,
    height: 441
  },
  innerFlare: {
    href: require("./assets/red/inner-flare.png"),
    width: 24,
    height: 426
  },
  core: {
    href: require("./assets/red/bright-core.png"),
    width: 16,
    height: 413
  }
};

const RedBeam = (props: LaserProps) => beamFormer(redBeamParts, props);

const GreenBeam = (props: LaserProps) => {
  return (
    <>
      {beamFormer(greenBeamParts, props)}
      <GreenBeamImpactFlare {...props} />
    </>
  );
};

const GreenBeamImpactFlare = (props: LaserProps) => {
  return (
    <g
      filter={`url(#${Filter.PowerPortImpactFlare})`}
      style={{
        mixBlendMode: "screen",
        transform: `rotate(180deg) ${
          props.ring.isSelected ? "scaleX(1)" : "scaleX(0.6)"
        }`,
        transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`,
        visibility: "visible"
      }}
    >
      <path
        d="m 987.93072,83 a 27.930717,7.6013975 0 0 1 -13.96536,6.583003 27.930717,7.6013975 0 0 1 -27.93072,0 A 27.930717,7.6013975 0 0 1 932.06928,86.625 l 27.93072,0 z"
        fill="#38ff14"
      />
      <path
        d="m 983.33452,83 a 23.334524,5.126524 0 0 1 -11.66726,4.4397 23.334524,5.126524 0 0 1 -23.33452,0 23.334524,5.126524 0 0 1 -11.66726,-4.4397 l 23.33452,0 z"
        fill="white"
      />
      <path d={`m ${ORIGIN.x - 12},83 a 24,422 0 0 0 24,0 z`} fill="#ddff99" />
      <path d={`m ${ORIGIN.x - 4},83 a 8,360 0 0 0 8,0 z`} fill="white" />
    </g>
  );
};

const beamFormer = (parts: BeamParts, props: LaserProps) => {
  const { startingPosition, ring } = props;
  const {
    beamOuterGlowStartCap,
    beamOuterGlow,
    beamStartCap,
    beam,
    emitterGlow,
    outerFlare,
    innerFlare,
    core
  } = parts;

  const yOffset = ORIGIN.y - RING_RADIUS[ring.index];
  const x = (part: BeamPart) => ORIGIN.x - part.width / 2;

  const beamOuterGlowElement = (
    <g
      style={{
        transition: `opacity 100ms`,
        opacity: ring.isSelected ? 1 : 0
      }}
    >
      <image
        {...beamOuterGlowStartCap}
        x={x(beamOuterGlowStartCap)}
        y={yOffset - beamOuterGlowStartCap.height / 2}
      />
      <image
        {...beamOuterGlow}
        x={x(beamOuterGlow)}
        y={yOffset + beamOuterGlowStartCap.height / 2}
        preserveAspectRatio="none"
      />
    </g>
  );

  const beamElement = (
    <g
      style={{
        transition: `transform 100ms opacity 100ms`,
        transform: ring.isSelected ? "scaleX(1)" : "scaleX(0.6)",
        opacity: ring.isSelected ? 1 : 0.8,
        transformOrigin: ORIGIN.x
      }}
    >
      <image
        {...beamStartCap}
        x={x(beamStartCap)}
        y={yOffset - beamStartCap.height / 2}
      />
      <image
        {...beam}
        x={x(beam)}
        y={yOffset + beamStartCap.height / 2}
        preserveAspectRatio="none"
      />
    </g>
  );

  const emitterGlowElement = (
    <image
      {...emitterGlow}
      x={x(emitterGlow)}
      y={yOffset - emitterGlow.height / 2}
      style={{
        transition: `transform 100ms`,
        transform: ring.isSelected ? "scale(1)" : "scale(.85)",
        transformOrigin: `${ORIGIN.x}px ${yOffset}px`
      }}
    />
  );

  const outerFlareElement = (
    <image
      {...outerFlare}
      x={x(outerFlare)}
      y={yOffset}
      style={{
        transition: `opacity 100ms`,
        opacity: ring.isSelected ? 1 : 0.7
      }}
    />
  );

  const innerFlareElement = (
    <image {...innerFlare} x={x(innerFlare)} y={yOffset} />
  );

  const coreElement = (
    <image
      {...core}
      x={x(core)}
      y={yOffset}
      style={{
        transition: `opacity 100ms`,
        opacity: ring.isSelected ? 1 : 0.8
      }}
    />
  );

  return (
    <g
      id={`beam-${ring.index}-${startingPosition}`}
      style={{
        animation: "glowAnimation 1.5s infinite"
      }}
    >
      {emitterGlowElement}
      <g
        style={{
          transition: `transform 100ms`,
          transform: ring.isSelected ? "scaleX(1)" : "scaleX(.65)",
          transformOrigin: ORIGIN.x
        }}
      >
        {beamOuterGlowElement}
        {beamElement}
        {outerFlareElement}
        {innerFlareElement}
        {coreElement}
      </g>
    </g>
  );
};

const Emitter = (props: LaserProps) => {
  const { ring, isTouchingPort, startingPosition } = props;
  const cx = ORIGIN.x;
  const cy = ORIGIN.y - RING_RADIUS[ring.index];

  let chevronColor = isTouchingPort ? "#296944" : "#580812";
  let circleColor: string;

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

  const circle = (
    <circle
      cx={cx}
      cy={cy}
      r={LASER_POINTER_RADIUS}
      strokeWidth={0}
      fill={circleColor}
      opacity={ring.isDisabled ? 1 : 0.9}
      filter={
        ring.isSelected && !ring.isDisabled
          ? `url(#${Filter.SoftGlow})`
          : undefined
      }
    />
  );

  const chevron = (
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
      {circle}
      {chevron}
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
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`,
          transition: ring.isBeingDragged
            ? undefined
            : `transform ${ROTATION_TIMING}ms linear`
        }}
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
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`,
          transition: ring.isBeingDragged
            ? undefined
            : `transform ${ROTATION_TIMING}ms linear`
        }}
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
  const rotationStyle = {
    transform: `rotate(${rotation}deg)`,
    transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`,
    transition: ring.isBeingDragged
      ? undefined
      : `transform ${ROTATION_TIMING}ms linear`
  };

  // Figure what type of beam to draw
  let laserBeam: ReactNode;
  if (ring.isDisabled) {
    laserBeam = null;
  } else if (isTouchingPort) {
    laserBeam = <GreenBeam {...props} />;
  } else {
    laserBeam = <RedBeam {...props} />;
  }

  // Lasers beams will extend to infinity unless they are obstructed by a power
  // port, a blocker, or another laser. The obstruction type determines what
  // masking layer we apply to the beam.
  let mask: string | undefined;
  if (isTouchingPort) {
    mask = `url(#${Mask.PortRadiusCutoff})`;
  } else if (obstructedBy) {
    const facing =
      currentRotatedPosition === obstructedBy.position ? "back" : "front";
    mask = `url(#${facing}-mask-${obstructedBy.ringIndex}-${obstructedBy.position})`;
  }

  return (
    <g id={`laser-${ring.index}-${startingPosition}`} pointerEvents="none">
      <g mask={mask} style={{ mixBlendMode: "screen" }}>
        <g style={rotationStyle}>{laserBeam}</g>
      </g>
      <g style={rotationStyle}>
        <Emitter {...props} />
      </g>
      {/* Each laser creates 2 obstruction masks that other lasers may apply */}
      <FrontObstructionMask {...props} />
      <BackObstructionMask {...props} />
    </g>
  );
};
