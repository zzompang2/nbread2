import React, { useState } from "react";
import "./NameCard.scss";
import { Delete, Circle, Handle } from "../../icons";
import Colors from "./Colors";
import Input from "./Input";

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
    <div className="name-card" onClick={(e) => selectNameCard(id, e)}>
      <div className="handle" onClick={() => deleteMember(id)}>
        <Handle />
      </div>
      <div className="hover-space" />
      <div className="text-frame">
        <Input
          isSelected={isSelected}
          value={name}
          placeholder={"이름" + (id + 1)}
          onChange={changeName}
          id={id}
        />
        {isSelected ? (
          <div className="mark-list">{returnMarkComponents()}</div>
        ) : (
          <p className="sub-title">총 결제 금액: {totalPaid}원</p>
        )}
      </div>
    </div>
  );
}
