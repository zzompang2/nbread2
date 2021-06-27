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
          id={selectedOption}
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
                id={selectedOption}
                name={options[selectedOption].name}
                color={Colors[options[selectedOption].mark]}
              />
            </div>
            <p>결제한 사람을 선택하세요.</p>
            <div className="options">
              {options.map((option) => {
                if (option.id !== selectedOption)
                  return (
                    <NameTag
                      key={option.id}
                      id={option.id}
                      name={option.name}
                      color={Colors[option.mark]}
                      onClick={() => {
                        onSelect(option.id);
                        setIsClicked(false);
                      }}
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
