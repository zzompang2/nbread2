import React, { useState } from "react";
import "./PaymentCard.css";
import { Delete, Circle, Handle } from "../../icons";
import SingleSelect from "./SingleSelect";
import MultiSelect from "./MultiSelect";

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
  popupUsersSelect,
  selectedPid,
  selectUser,
  unselectUser,
  selectUserAll,
  unselectUserAll,
  deletePayment,
  selectedPaymentCardId,
  selectPaymentCard,
}) {
  const isSelected = id == selectedPaymentCardId;

  /**
   * MID 를 갖는 멤버의 이름을 리턴한다.
   * @param {number} mid id of member
   * @returns
   */
  function findName(mid) {
    for (let i = 0; i < members.length; i++) {
      if (members[i].id === mid) return members[i].name;
    }
    return "X";
  }

  function countUsers(users) {
    let num = 0;
    users.forEach((isUser) => {
      if (isUser) num++;
    });
    return num;
  }

  return (
    <div
      key={id}
      className="payment_card"
      onClick={(e) => selectPaymentCard(id, e)}
      style={isSelected ? { borderColor: "green" } : {}}
    >
      <div className="handle">
        <Handle className={"mark" + members[payer].mark} />
      </div>
      {/* 결제한 사람 */}
      <SingleSelect
        options={members}
        selectedOption={payer}
        onSelect={(mid) => changePayer(id, mid)}
      />
      {/* 메모 */}
      <div className="memo">
        <input
          className={isSelected ? "input-focus" : "input-blur"}
          value={memo}
          placeholder={"결제" + id}
          disabled={!isSelected}
          autoComplete="off"
          onChange={(e) => changeMemo(e.target.value, id)}
        />
      </div>
      {/* 결제한 금액 */}
      <div className="money">
        <input
          style={{ flex: "1", width: "0" }}
          className={isSelected ? "input-focus" : "input-blur"}
          type="number"
          value={money}
          placeholder="0"
          onChange={(e) => changeMoney(e.target.value, id)}
        />
      </div>
      {/* 사용한 사람들 */}
      <MultiSelect
        style={{ flex: 1 }}
        options={members}
        selectedOptions={users}
        onSelect={(mid) => selectUser(id, mid)}
        onUnselect={(mid) => unselectUser(id, mid)}
        onSelectAll={() => selectUserAll(id)}
        onUnselectAll={() => unselectUserAll(id)}
      />
      {isSelected ? (
        <div className="delete_btn" onClick={() => deletePayment(id)}>
          <Delete />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
