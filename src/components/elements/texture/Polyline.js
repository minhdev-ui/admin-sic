import React from "react";

const Polyline = ({
  edge = 100,
  fill = "none",
  rotate = 30,
  top,
  right,
  left,
  ani = "rushBottom",
}) => {
  return (
    <svg
      className={`texture ${ani} `}
      height={edge}
      width={edge}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        right: `${right}%`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <polygon
        points={`0,0 ${edge / 2},${edge} ${edge},0 0,0`}
        fill={fill}
        stroke={fill === "none" ? "#fff" : ""}
        strokeWidth="1"
      />
    </svg>
  );
};

export default Polyline;
