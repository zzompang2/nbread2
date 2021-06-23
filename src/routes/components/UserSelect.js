import React, { useState } from "react";
import "./UserSelect.css";

export default function UserSelect({
  options,
  selectedOptions,
  onSelect,
  onUnselect,
  onSelectAll,
  onUnselectAll,
  style, // [결제한 사람]과 [사용한 사람들] 두 곳 모두 이 컴포넌트로 사용하기 위해.
  ...rest
}) {
  console.log("UserSelect");

  const [isClicked, setIsClicked] = useState(false);
  const selectedOptionsNum = selectedOptions.reduce((result, isSelected) => {
    console.log(result);
    return result + isSelected;
  }, 0);

  function popupOptionList(toggle) {
    console.log("popupOptionList", toggle);
    setIsClicked(toggle);
  }

  return (
    <div className="user_select" style={style}>
      <div className="selected_options" onClick={() => popupOptionList(true)}>
        {selectedOptionsNum == options.length ? (
          <p className="option">ALL</p>
        ) : selectedOptionsNum == 0 ? (
          <p className="option">반드시 한 명 이상 선택해 주세요</p>
        ) : (
          <>
            {selectedOptions.map((isSelected, id) => {
              if (isSelected)
                return (
                  <p key={id} className="option">
                    {options[id].name}
                  </p>
                );
            })}
          </>
        )}
      </div>

      {isClicked ? (
        <div>
          <div className="unclick" onClick={() => popupOptionList(false)} />
          <div className="option_list">
            <div className="options" onClick={() => popupOptionList(true)}>
              {selectedOptions.map((isSelected, id) => {
                if (isSelected)
                  return (
                    <p
                      key={id}
                      className="option"
                      onClick={() => onUnselect(id)}
                    >
                      {options[id].name}
                    </p>
                  );
              })}
            </div>
            <div className="text_button">
              <p onClick={onSelectAll}>모두 선택</p>
              <p onClick={onUnselectAll}>모두 제외</p>
            </div>
            <div className="options">
              {selectedOptions.map((isSlected, id) => {
                if (!isSlected)
                  return (
                    <p key={id} className="option" onClick={() => onSelect(id)}>
                      {options[id].name}
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
