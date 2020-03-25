import React from "react";
import { ORIGIN, ROTATION_TIMING } from "./constants";
import { Filter, Gradient } from "./Defs";

type PowerPortProps = {
  position: number;
  isPowered?: boolean;
};

function PowerPort(props: PowerPortProps) {
  const { position, isPowered } = props;

  const rotation = 30 * position;
  const fillColor = isPowered ? "#6FFF52" : "#AD0D11";
  const strokeColor = isPowered ? "#DDFFBB" : "#D97140";

  return (
    <g
      id={`power-port-${position}`}
      transform={`rotate(${rotation}, ${ORIGIN.x}, ${ORIGIN.y})`}
    >
      <path
        filter={`url(#${Filter.PowerPortGlow})`}
        style={{ transition: "fill 150ms" }}
        fill={fillColor}
        stroke="none"
        d="m 910.39868,36.901213 -15.05384,25.507164 20.48749,16.47573 c 30.75484,-3.768751 61.1733,-3.640172 89.82987,0 l 20.4875,-16.47573 -15.0538,-25.507164 c -34.47578,-4.219892 -68.57367,-4.07585 -100.69722,0 z"
      />
      <path
        fill="none"
        style={{ transition: "stroke 150ms" }}
        stroke={strokeColor}
        strokeOpacity={0.66}
        strokeWidth={2}
        strokeLinejoin="round"
        d="m 910.39868,36.901213 -15.05384,25.507164 20.48749,16.47573 c 30.75484,-3.768751 61.1733,-3.640172 89.82987,0 l 20.4875,-16.47573 -15.0538,-25.507164 c -34.47578,-4.219892 -68.57367,-4.07585 -100.69722,0 z"
      />
      <path
        fill="none"
        stroke={`url(#${Gradient.PowerPortWallGradient})`}
        filter={`url(#${Filter.SoftGlow})`}
        strokeWidth={isPowered ? 4 : 0}
        strokeLinejoin="round"
        d="m 1053.5143,72.5 c -7.3343,-1.941408 -18.7444,-5.616683 -23.1413,-4.438542 -6.373,1.70764 -21.3875,19.192548 -25.7372,18.731559 C 983,84.5 983,84.5 960,84.5 c -23,0 -23,0 -44.6358,2.293017 -4.3497,0.460989 -19.36425,-17.023919 -25.73725,-18.731559 -4.3969,-1.178141 -15.807,2.497134 -23.1413,4.438542"
      />
      <g
        filter={`url(#${Filter.PowerPortImpactFlare})`}
        style={{
          mixBlendMode: "screen",
          opacity: isPowered ? 1 : 0,
          transition: isPowered ? `opacity 0ms ${ROTATION_TIMING}ms` : ""
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
        <path
          d={`m ${ORIGIN.x - 12},83 a 24,422 0 0 0 24,0 z`}
          fill="#ddff99"
        />
        <path d={`m ${ORIGIN.x - 4},83 a 8,360 0 0 0 8,0 z`} fill="white" />
      </g>
      )}
    </g>
  );
}

export default PowerPort;
