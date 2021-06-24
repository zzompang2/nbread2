import React, { useState } from "react";
import NameTag from "./NameTag";
import "./SingleSelect.css";

export default function SingleSelect({
  options,
  selectedOption,
  selectedOptions,
  onSelect,
  onUnselect,
  onSelectAll,
  onUnselectAll,
}) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="single-select">
      <div className="selected_options" onClick={() => setIsClicked(true)}>
        <NameTag name={options[selectedOption].name} />
      </div>

      {isClicked ? (
        <div>
          <div className="unclick" onClick={() => setIsClicked(false)} />
          <div className="option_list">
            <div className="options" onClick={() => setIsClicked(true)}>
              <NameTag name={options[selectedOption].name} />
            </div>
            <div className="options">
              {options.map((option) => {
                if (option.id !== selectedOption)
                  return (
                    <NameTag
                      key={option.id}
                      name={option.name}
                      onClick={() => onSelect(option.id)}
                    />
                  );
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
