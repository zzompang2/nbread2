import React from "react";
import "./TitleBar.css";

export default function TitleBar({ title, onClick }) {
  return (
    <div className="titleBar">
      {title}
      <button onClick={onClick}>+ 추가</button>
    </div>
  );
}
