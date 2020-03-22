import React from "react";
import { PORT_RADIUS, ORIGIN } from "./constants";

export enum Mask {
  PortRadiusCutoff = "PortRadiusCutoff"
}

export enum Filter {
  SelectedRingGlow = "SelectedRingGlow",
  SoftGlow = "SoftGlow"
}

export enum Gradient {
  VictoryMessageRadialGradient = "VictoryMessageRadialGradient",
  VictoryMessageLinearGradient = "VictoryMessageLinearGradient"
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
    <filter id={Filter.SoftGlow} x="-0.5" y="-0.5" width="2" height="2">
      <feGaussianBlur result="blur5" stdDeviation={5} />
      <feGaussianBlur result="blur10" stdDeviation={10} />
      <feMerge>
        <feMergeNode in="blur5" />
        <feMergeNode in="blur10" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
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
  </defs>
));

export default Defs;
