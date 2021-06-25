import React, { useState } from "react";
import NameTag from "./NameTag";
import "./MultiSelect.scss";
import Colors from "./Colors";

export default function MultiSelect({
  options,
  selectedOptions,
  onSelect,
  onUnselect,
  onSelectAll,
  onUnselectAll,
}) {
  console.log("MultiSelect");

  const [isClicked, setIsClicked] = useState(false);
  const selectedOptionsNum = selectedOptions.reduce((result, isSelected) => {
    console.log(result);
    return result + isSelected;
  }, 0);

  return (
    <div className="multi-select">
      <div className="selected-options" onClick={() => setIsClicked(true)}>
        {selectedOptionsNum == options.length ? (
          <NameTag name="ALL" />
        ) : selectedOptionsNum == 0 ? (
          <NameTag name="반드시 한 명 이상 선택해 주세요" />
        ) : (
          <>
            {selectedOptions.map((isSelected, id) => {
              if (isSelected)
                return (
                  <NameTag
                    key={id}
                    name={options[id].name}
                    color={Colors[options[id].mark]}
                  />
                );
            })}
          </>
        )}
      </div>

      {isClicked ? (
        <div>
          <div className="unclick" onClick={() => setIsClicked(false)} />
          <div className="option-list">
            <div className="options" onClick={() => setIsClicked(true)}>
              {selectedOptions.map((isSelected, id) => {
                if (isSelected)
                  return (
                    <NameTag
                      key={id}
                      name={options[id].name}
                      color={Colors[options[id].mark]}
                      onClick={() => onUnselect(id)}
                    />
                  );
              })}
            </div>
            <div className="text-button">
              <p onClick={onSelectAll}>모두 선택</p>
              <p onClick={onUnselectAll}>모두 제외</p>
            </div>
            <div className="options">
              {selectedOptions.map((isSlected, id) => {
                if (!isSlected)
                  return (
                    <NameTag
                      key={id}
                      name={options[id].name}
                      color={Colors[options[id].mark]}
                      onClick={() => onSelect(id)}
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
