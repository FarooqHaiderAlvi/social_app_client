import React from "react";
import spin from "../assets/spinner.gif";
export default function Spin() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src={spin}
        alt="Loading"
        className="img-fluid bg-white text-center mx-auto"
        style={{ height: "50px", width: "50px" }}
      ></img>
    </div>
  );
}
