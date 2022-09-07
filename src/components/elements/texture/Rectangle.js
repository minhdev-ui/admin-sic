import React from "react";

const Rectangle = ({
  top = 0,
  left,
  right,
  fill = "#6163ff",
  h = 10,
  ani = "rushBottom",
}) => {
  return (
    <svg
      width={h * 3}
      height={h}
      className={`texture ${ani} `}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        right: `${right}%`,
        transform: "rotate(-10deg)",
      }}
    >
      <rect
        width={h * 3}
        height={h}
        stroke={fill === "none" ? "#fff" : ""}
        strokeWidth="1"
        fill={fill}
      />
    </svg>
  );
};

export default Rectangle;
