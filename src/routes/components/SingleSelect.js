import React, { useState } from "react";
import Colors from "./Colors";
import NameTag from "./NameTag";
import "./SingleSelect.scss";

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
      <div className="selected-options" onClick={() => setIsClicked(true)}>
        <NameTag
          name={options[selectedOption].name}
          color={Colors[options[selectedOption].mark]}
        />
      </div>

      {isClicked ? (
        <div>
          <div className="unclick" onClick={() => setIsClicked(false)} />
          <div className="option-list">
            <div className="options" onClick={() => setIsClicked(true)}>
              <NameTag
                name={options[selectedOption].name}
                color={Colors[options[selectedOption].mark]}
              />
            </div>
            <div className="options">
              {options.map((option) => {
                if (option.id !== selectedOption)
                  return (
                    <NameTag
                      key={option.id}
                      name={option.name}
                      color={Colors[option.mark]}
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
