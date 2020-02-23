import React from "react";

type PowerPortProps = {
  position: number;
  isPowered?: boolean;
};

function PowerPort(props: PowerPortProps) {
  const { position, isPowered } = props;

  const rotation = 30 * position;
  const strokeColor = isPowered ? "#0f0" : "red";

  return (
    <g
      transform={`rotate(${rotation}, 960, 421.5)`}
      // style={{
      //   transformOrigin: "960px 421.5px",
      //   transform: `rotate(${rotation}deg)`
      // }}
    >
      <path
        fill={strokeColor}
        stroke={strokeColor}
        strokeOpacity={0.66}
        strokeWidth={2}
        d="m 910.39868,36.901213 -15.05384,25.507164 20.48749,16.47573 c 30.75484,-3.768751 61.1733,-3.640172 89.82987,0 l 20.4875,-16.47573 -15.0538,-25.507164 c -34.47578,-4.219892 -68.57367,-4.07585 -100.69722,0 z"
      />
      {isPowered && (
        <path
          fill="none"
          stroke={"white"}
          strokeOpacity={0.66}
          strokeWidth={2}
          strokeLinejoin="round"
          d="m 1053.5143,72.5 c -7.3343,-1.941408 -18.7444,-5.616683 -23.1413,-4.438542 -6.373,1.70764 -21.3875,19.192548 -25.7372,18.731559 C 983,84.5 983,84.5 960,84.5 c -23,0 -23,0 -44.6358,2.293017 -4.3497,0.460989 -19.36425,-17.023919 -25.73725,-18.731559 -4.3969,-1.178141 -15.807,2.497134 -23.1413,4.438542"
        />
      )}
    </g>
  );
}

export default PowerPort;
