import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
      }}
    >
      <Spin />
    </div>
  );
};

export default Loading;
