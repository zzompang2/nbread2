import React, { useState } from "react";
import "./NameTag.css";

export default function NameTag({ id, name, color, onClick }) {
  return (
    <div
      className="name-tag"
      onClick={onClick}
      style={{ backgroundColor: color, color: "white" }}
    >
      {name === "" ? "이름" + (id + 1) : name}
    </div>
  );
}
