import React, { useState } from "react";
import "./SingleSelect.css";

export default function SingleSelect({
  options,
  selectedOption,
  selectedOptions,
  onSelect,
  onUnselect,
  onSelectAll,
  onUnselectAll,
  style, // [결제한 사람]과 [사용한 사람들] 두 곳 모두 이 컴포넌트로 사용하기 위해.
  ...rest
}) {
  const [isClicked, setIsClicked] = useState(false);

  function popupOptionList(toggle) {
    console.log("popupOptionList", toggle);
    setIsClicked(toggle);
  }

  return (
    <div className="user_select" style={style}>
      <div className="selected_options" onClick={() => popupOptionList(true)}>
        <p className="option">{options[selectedOption].name}</p>
      </div>

      {isClicked ? (
        <div>
          <div className="unclick" onClick={() => popupOptionList(false)} />
          <div className="option_list">
            <div className="options" onClick={() => popupOptionList(true)}>
              <p className="option">{options[selectedOption].name}</p>
            </div>
            <div className="options">
              {options.map((option) => {
                if (option.id !== selectedOption)
                  return (
                    <p
                      key={option.id}
                      className="option"
                      onClick={() => onSelect(option.id)}
                    >
                      {option.name}
                    </p>
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
