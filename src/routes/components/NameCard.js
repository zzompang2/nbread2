import React, { useState } from "react";
import "./NameCard.scss";
import { Delete, Circle, Handle } from "../../icons";
import Colors from "./Colors";

export default function NameCard({
  id,
  name = "이름",
  mark,
  totalPaid = 0,
  changeName,
  changeMark,
  deleteMember,
  selectedNameCardId,
  selectNameCard,
}) {
  const isSelected = id == selectedNameCardId;

  console.log(Colors);

  function returnMarkComponents() {
    const result = [],
      row1 = [],
      row2 = [];
    for (let i = 0; i < 10; i++) {
      row1.push(
        <div key={i} onClick={() => changeMark(id, i)}>
          <Circle radius={i == mark ? 9 : 5} color={Colors[i]} />
        </div>
      );
      row2.push(
        <div key={i + 10} onClick={() => changeMark(id, i + 10)}>
          <Circle radius={i + 10 == mark ? 9 : 5} color={Colors[i + 10]} />
        </div>
      );
    }
    result.push(<div className="mark-list-row">{row1}</div>);
    result.push(<div className="mark-list-row">{row2}</div>);
    return result;
  }

  return (
    <div
      className="name-card"
      onClick={(e) => selectNameCard(id, e)}
      style={
        isSelected
          ? { borderWidth: "2px", borderStyle: "solid", borderColor: "green" }
          : {}
      }
    >
      <div className="handle">
        <Handle />
      </div>
      <div className="hover-space" />
      <div className="text-frame">
        <div className="row">
          <input
            className={isSelected ? "input-focus" : "input-blur"}
            value={name}
            placeholder="이름"
            disabled={!isSelected}
            autoComplete="off"
            onChange={(e) => changeName(e.target.value, id)}
          />
          {isSelected ? (
            <div className="delete-btn" onClick={() => deleteMember(id)}>
              <Delete />
            </div>
          ) : (
            <></>
          )}
        </div>
        {isSelected ? (
          <div className="mark-list">{returnMarkComponents()}</div>
        ) : (
          <p className="sub-title">총 결제 금액: {totalPaid}원</p>
        )}
      </div>
    </div>
  );
}
