import React, { useState } from "react";
import "./NameTag.css";

export default function NameTag({ name, color, onClick }) {
  return (
    <p
      className="name-tag"
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {name}
    </p>
  );
}
