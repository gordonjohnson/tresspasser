import React from "react";
import { PORT_RADIUS, ORIGIN } from "./constants";

export enum Mask {
  PortRadiusCutoff = "PortRadiusCutoff"
}

export enum Filter {
  SelectedRingGlow = "SelectedRingGlow",
  SoftGlow = "SoftGlow",
  PowerPortGlow = "PowerPortGlow",
  PowerPortImpactFlare = "PowerPortImpactFlare"
}

export enum Gradient {
  VictoryMessageRadialGradient = "VictoryMessageRadialGradient",
  VictoryMessageLinearGradient = "VictoryMessageLinearGradient",
  PowerPortWallGradient = "PowerPortWallGradient"
}

// This component centralizes definitions for shared graphical objects that will
// be referenced at a later time by other components.
const Defs = React.memo(() => (
  <defs>
    {/* ------------------ MASKS ------------------ */}
    <mask id={Mask.PortRadiusCutoff} maskUnits="userSpaceOnUse">
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={PORT_RADIUS} fill="white" />
    </mask>

    {/* ------------------ FILTERS ------------------ */}
    <filter id={Filter.SelectedRingGlow} x="-0.5" y="-0.5" width="2" height="2">
      <feGaussianBlur result="blur5" stdDeviation={5} />
      <feGaussianBlur result="blur8" stdDeviation={8} />
      <feGaussianBlur result="blur12" stdDeviation={12} />
      <feMerge>
        <feMergeNode in="blur5" />
        <feMergeNode in="blur8" />
        <feMergeNode in="blur12" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id={Filter.SoftGlow} x="-2" y="-2" width="5" height="5">
      <feGaussianBlur result="blur5" stdDeviation={5} />
      <feGaussianBlur result="blur10" stdDeviation={10} />
      <feMerge>
        <feMergeNode in="blur5" />
        <feMergeNode in="blur10" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id={Filter.PowerPortGlow} x="-2.5" y="-2.5" width="5" height="5">
      <feGaussianBlur result="blur4" stdDeviation={4} />
      <feGaussianBlur result="blur12" stdDeviation={12} />
      <feGaussianBlur result="blur30" stdDeviation={30} />
      <feMerge>
        <feMergeNode in="blur4" />
        <feMergeNode in="blur4" />
        <feMergeNode in="blur12" />
        <feMergeNode in="blur12" />
        <feMergeNode in="blur30" />
      </feMerge>
    </filter>
    <filter
      id={Filter.PowerPortImpactFlare}
      x="-4.5"
      y="-4.5"
      width="10"
      height="10"
    >
      <feGaussianBlur result="blur" stdDeviation={4} />
    </filter>

    {/* ------------------ GRADIENTS ------------------ */}
    <radialGradient id={Gradient.VictoryMessageRadialGradient}>
      <stop offset="0%" stopColor="#FFF" stopOpacity={0.66} />
      <stop offset="100%" stopColor="#FFF" stopOpacity={0} />
    </radialGradient>
    <linearGradient
      id={Gradient.VictoryMessageLinearGradient}
      gradientTransform="rotate(90)"
    >
      <stop offset="0%" stopColor="#173144" stopOpacity={0.97} />
      <stop offset="100%" stopColor="#1C4B72" stopOpacity={0.97} />
    </linearGradient>
    <linearGradient
      id={Gradient.PowerPortWallGradient}
      spreadMethod="reflect"
      x1="0"
      x2="50%"
    >
      <stop offset="0%" stopColor="white" stopOpacity="0"></stop>
      <stop offset="33%" stopColor="white" stopOpacity="0.8"></stop>
    </linearGradient>
  </defs>
));

export default Defs;
