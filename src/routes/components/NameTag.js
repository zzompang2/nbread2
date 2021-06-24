import React, { useState } from "react";
import "./NameTag.css";

export default function NameTag({ name, onClick }) {
  return (
    <p className="name-tag" onClick={onClick}>
      {name}
    </p>
  );
}
