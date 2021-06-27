import React, { useState } from "react";
import "./PaymentCard.scss";
import { Circle, Handle } from "../../icons";
import SingleSelect from "./SingleSelect";
import MultiSelect from "./MultiSelect";
import Input from "./Input";

export default function PaymentCard({
  id,
  memo,
  payer,
  money,
  users,
  members,
  changeMemo,
  changePayer,
  changeMoney,
  selectUser,
  unselectUser,
  selectUserAll,
  unselectUserAll,
  deletePayment,
  selectedPaymentCardId,
  selectPaymentCard,
}) {
  const isSelected = id == selectedPaymentCardId;

  function countUsers() {
    let num = 0;
    users.forEach((isUser) => {
      if (isUser) num++;
    });
    return num;
  }

  return (
    <div
      key={id}
      className="payment-card"
      onClick={(e) => selectPaymentCard(id, e)}
      // style={
      //   isSelected
      //     ? { borderWidth: "2px", borderStyle: "solid", borderColor: "green" }
      //     : {}
      // }
    >
      <div className="hover-space" />
      <div className="handle" onClick={() => deletePayment(id)}>
        <Handle />
      </div>
      {/* 결제한 사람 */}
      <SingleSelect
        options={members}
        selectedOption={payer}
        onSelect={(mid) => changePayer(id, mid)}
      />
      {/* 메모 */}
      <div className="memo">
        <Input
          isSelected={isSelected}
          value={memo}
          placeholder={"결제" + (id + 1)}
          // disabled={!isSelected}
          // autoComplete="off"
          onChange={changeMemo}
          id={id}
        />
      </div>
      {/* 결제한 금액 */}
      <div className="money">
        <Input
          isSelected={isSelected}
          type="number"
          value={money === 0 ? "" : money}
          placeholder="0"
          onChange={changeMoney}
          id={id}
          textAlign="end"
        />
      </div>
      <p className="count-users">/ {countUsers()}명</p>
      {/* 사용한 사람들 */}
      <MultiSelect
        options={members}
        selectedOptions={users}
        onSelect={(mid) => selectUser(id, mid)}
        onUnselect={(mid) => unselectUser(id, mid)}
        onSelectAll={() => selectUserAll(id)}
        onUnselectAll={() => unselectUserAll(id)}
      />
    </div>
  );
}
