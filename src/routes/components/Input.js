import React, { useState } from "react";
import "./Input.scss";

export default function Input({
  isSelected,
  type,
  value,
  placeholder,
  onChange,
  id,
  textAlign = "start",
}) {
  const [inputValue, setInputValue] = useState(value);

  return (
    <div className="input-container">
      <input
        style={{ textAlign }}
        className={"input"}
        type={type}
        value={inputValue}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={(e) => onChange(e.target.value, id)}
      />
      {type == "number" ? <p>원</p> : <></>}
    </div>
  );
}
