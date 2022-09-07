import * as React from "react";
import PropTypes from "prop-types";

export default function Circle({
  rad = 50,
  top = 0,
  left,
  right,
  fill = "#6163ff",
  ani = "rushBottom",
}) {
  return (
    <svg
      width={rad * 2}
      height={rad * 2}
      fill="none"
      className={`texture ${ani} `}
      style={{ top: `${top}px`, left: `${left}px`, right: `${right}px` }}
    >
      <circle
        cx={rad}
        cy={rad}
        r={rad}
        fill={fill}
        stroke={fill === "none" ? "#fff" : ""}
        strokeWidth="1"
      />
    </svg>
  );
}

Circle.prototype = {
  rad: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  fill: PropTypes.string.isRequired,
};
