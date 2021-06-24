import React, { Fragment, useState } from "react";
import "./Calculation.css";
import Result from "./Result";
import TitleBar from "./components/TitleBar";
import NameCard from "./components/NameCard";
import PaymentCard from "./components/PaymentCard";

let [paidMoneyAll, usedMoneyAll] = [0, 0];
let middleResult = [
  { id: 0, name: "철수", paidMoney: 0, usedMoney: 0, bonus: 0 },
  { id: 1, name: "영희", paidMoney: 0, usedMoney: 0, bonus: 0 },
];

function Calculation(props) {
  const [members, setMembers] = useState([
    { id: 0, name: "철수", mark: 0 },
    { id: 1, name: "영희", mark: 1 },
  ]);
  const [payments, setPayments] = useState([
    { id: 0, memo: "결제1", payer: 0, money: 0, users: [true, true] },
    { id: 1, memo: "결제2", payer: 1, money: 0, users: [true, true] },
  ]);
  const [selectedPid, setSelectedPid] = useState(-1); // UsersSelect 가 눌려있는 payment
  const [resultToggle, setResultToggle] = useState(false); // Result 창 토글

  /**
   * MID 멤버의 이름을 NEWNAME 으로 수정한다.
   * @param {text} newName 수정된 이름
   * @param {number} mid id of member
   */
  function changeName(newName, mid) {
    console.log("changeName/새로운 이름 및 mid =", newName, mid);
    const newMembers = members.slice();
    newMembers[mid] = { ...newMembers[mid], name: newName };
    setMembers(newMembers);
  }

  /**
   * MID 멤버의 mark id 를 MARKID 으로 바꾼다.
   * @param {number} mid id of member
   * @param {number} markId mark id of member
   */
  function changeMark(mid, markId) {
    console.log("changeMark/mid 및 새로운 mark id =", mid, markId);
    const newMembers = members.slice();
    newMembers[mid] = { ...newMembers[mid], mark: markId };
    setMembers(newMembers);
  }

  /**
   * PID 결제의 메모를 수정한다.
   * @param {text} newMemo 수정된 메모 내용
   * @param {number} pid id of payment
   */
  function changeMemo(newMemo, pid) {
    console.log("changeMemo/새로운 메모 및 pid =", newMemo, pid);
    const newPayments = payments.slice();
    newPayments[pid] = { ...newPayments[pid], memo: newMemo };
    setPayments(newPayments);
  }

  /**
   * PID 결제의 결제 금액을 수정한다.
   * @param {number} newMoney 수정된 금액
   * @param {number} pid id of payment
   */
  function changeMoney(newMoney, pid) {
    console.log("changeMoney/수정된 금액 및 pid =", newMoney, pid);
    const newPayments = payments.slice();
    newPayments[pid] = { ...newPayments[pid], money: newMoney };
    setPayments(newPayments);
  }

  /**
   * MEMBERS 에 새로운 멤버를 추가한다.
   */
  function addMember() {
    const newId = members.length;
    console.log("addMember/새로운 멤버 id =", newId);
    setMembers([
      ...members,
      { id: newId, name: "이름" + (newId + 1), mark: newId % 20 },
    ]);

    setPayments(
      payments.map((payment) => {
        return { ...payment, users: payment.users.concat(true) };
      })
    );
  }

  /**
   * PAYMENTS 에 새로운 결제 내역을 추가한다.
   */
  function addPayment() {
    const newId = payments.length;
    console.log("addPayment/새로운 결제 id =", newId);
    setPayments([
      ...payments,
      {
        id: newId,
        memo: "결제" + (newId + 1),
        payer: 0,
        money: 0,
        users: members.map((isUser) => true),
      },
    ]);
  }

  /**
   * MID 멤버를 삭제하고, 삭제된 멤버 이후의 멤버들 ID 를 수정한다. 연속된 ID 를 갖게 하기 위함이다.
   *
   * 연속된 ID 를 갖게 하는 이유:
   * 연속된 ID 를 포기하면 삭제가 편하지만 USERS 들의 ID 를 검색하는 게 불편하다.
   * 연속하는 경우에는 삭제할 때 어렵지만 계산할 때 편하다.
   * 사용자가 멤버를 삭제하는 경우가 더 드문 경우이므로 이를 선택했다. (21.06.10)
   *
   * @param {number} mid id of member
   * @returns
   */
  function deleteMember(mid) {
    console.log("deleteMember/삭제한 멤버 id =", mid);

    // 결제한 내역이 있는 경우: 삭제 불가
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].payer === mid) {
        console.log("삭제 실패: 결제한 내역이 있는 사람입니다.");
        return;
      }
    }
    // USERS 에 포함되어 있는 경우: USERS 리스트에서 제외
    // 제거된 멤버 뒤의 멤버들은 ID 를 1씩 줄여준다.
    const newPayments = payments.map((payment) => {
      return {
        ...payment,
        payer: payment.payer > mid ? payment.payer - 1 : payment.payer,
        users: payment.users.slice(0, mid).concat(payment.users.slice(mid + 1)),
      };
    });

    // 제거된 멤버 뒤의 멤버들은 ID 를 1씩 줄여준다.
    const newMembers = members.slice(0, mid).concat(
      members.slice(mid + 1).map((member) => {
        return { ...member, id: member.id - 1 };
      })
    );
    setMembers(newMembers);
    setPayments(newPayments);
    selectNameCard(-1);
  }

  /**
   * PID 결제 내역을 삭제하고 삭제된 결제 내역 이후의 ID 를 수정한다. 연속된 ID 를 갖게 하기 위함이다.
   * @param {number} pid id of payment
   */
  function deletePayment(pid) {
    console.log("deletePayment/삭제한 결제 내역 id =", pid);
    const newPayments = payments.slice(0, pid).concat(
      payments.slice(pid + 1).map((payment) => {
        return { ...payment, id: payment.id - 1 };
      })
    );
    setPayments(newPayments);
  }

  /**
   * 선택한 멤버를 PID 결제 내역의 PAYER 으로 한다.
   * @param {number} pid id of payment
   * @param {number} mid id of member
   */
  function changePayer(pid, mid) {
    console.log("changePayer/(결제 내역, 새로운 결제자)의 id =", pid, mid);
    const newPayments = payments.slice();
    newPayments[Number(pid)] = {
      ...newPayments[Number(pid)],
      payer: Number(mid),
    };
    setPayments(newPayments);
  }

  /**
   * PID 결제 내역의 USERS 에 MID 멤버를 추가한다.
   * @param {number} pid 결제 내역의 ID
   * @param {number} mid 멤버의 ID
   */
  function selectUser(pid, mid) {
    console.log("selectUser/", pid, mid);
    const newPayments = payments.slice();
    newPayments[pid].users[mid] = true;
    setPayments(newPayments);
    console.log(newPayments[pid].users);
  }

  /**
   * PID 결제 내역의 USERS 에 MID 멤버를 제거한다.
   * @param {number} pid 결제 내역의 ID
   * @param {number} mid 멤버의 ID
   */
  function unselectUser(pid, mid) {
    console.log("unselectUser/", pid, mid);
    const newPayments = payments.slice();
    newPayments[pid].users[mid] = false;
    setPayments(newPayments);
    console.log(newPayments[pid].users);
  }

  /**
   * PID 결제 내역의 User Select 창을 띄운다.
   * @param {number} pid 선택된 결제 내역의 ID
   */
  function popupUsersSelect(pid) {
    console.log("popupUsersSelect/", pid);
    setSelectedPid(selectedPid === pid ? -1 : pid);
  }

  /**
   * PID 결제 내역의 USERS 에 모든 멤버를 포함한다.
   * @param {number} pid 결제 내역의 ID
   */
  function selectUserAll(pid) {
    const newPayments = payments.slice();
    newPayments[pid] = {
      ...newPayments[pid],
      users: members.map((member) => true),
    };
    setPayments(newPayments);
  }

  /**
   * PID 결제 내역의 USERS 에 모든 멤버를 제거한다.
   * @param {number} pid 결제 내역의 ID
   */
  function unselectUserAll(pid) {
    const newPayments = payments.slice();
    newPayments[pid] = {
      ...newPayments[pid],
      users: members.map((member) => false),
    };
    setPayments(newPayments);
  }

  const [selectedNameCardId, setSelectedNameCardId] = useState(-1);
  const [selectedPaymentCardId, setSelectedPaymentCardId] = useState(-1);

  /**
   * ID NameCard 를 선택한다. -1 인 경우, 선택되어 있는 걸 취소한다.
   * @param {*} e
   * @param {number} id 선택된 NameCard 의 id
   */
  function selectNameCard(id, e = null) {
    console.log("selectNameCard");
    e && e.stopPropagation(); // parent 가 선택되는 걸 막기
    if (id !== -1) selectPaymentCard(-1);
    if (selectedNameCardId != id) setSelectedNameCardId(id);
  }

  function selectPaymentCard(id, e = null) {
    console.log("selectPaymentCard");
    e && e.stopPropagation(); // parent 가 선택되는 걸 막기
    if (id !== -1) selectNameCard(-1);
    if (selectedPaymentCardId != id) setSelectedPaymentCardId(id);
  }

  /**
   * 멤버별 총 결제 금액 및 총 사용 금액을 계산한다.
   * @returns Array of {id, name, paidMoney, usedMoney, bonus}
   */
  function updateMiddleResult() {
    console.log("updateMiddleResult");
    middleResult = members.map((member) => {
      return { ...member, paidMoney: 0, usedMoney: 0, bonus: 0 };
    });
    payments.forEach((payment) => {
      let money = Number(payment.money);
      middleResult[payment.payer].paidMoney += money;

      /* 나누어 떨어지지 않으면 올림해서 보내기로 한다 */
      let num = 0;
      payment.users.forEach((isUser) => {
        if (isUser) num++;
      });
      const rest = money % num;
      if (rest !== 0) {
        const bonus = num - rest; // 결제자가 받을 추가 금액
        money += bonus; // 나누어 떨어지도록 더함
        middleResult[payment.payer].bonus = bonus;
      }
      payment.users.forEach((isUser, idx) => {
        if (isUser) middleResult[idx].usedMoney += money / num;
      });
    });

    paidMoneyAll = 0;
    usedMoneyAll = 0;
    middleResult.forEach((res) => {
      paidMoneyAll += res.paidMoney;
      usedMoneyAll += res.usedMoney;
    });
  }

  // 뭐가 수정되든 항상 업데이트
  updateMiddleResult();

  return (
    <div
      className="calculation"
      onClick={(e) => {
        selectNameCard(-1);
        selectPaymentCard(-1);
      }}
    >
      <div className="container">
        <div className="name_frame">
          <TitleBar title="사람들" onClick={addMember} />
          <div className="name_list">
            {members.map((member) => (
              <NameCard
                key={member.id}
                id={member.id}
                name={member.name}
                mark={member.mark}
                changeName={changeName}
                changeMark={changeMark}
                deleteMember={deleteMember}
                selectedNameCardId={selectedNameCardId}
                selectNameCard={selectNameCard}
              />
            ))}
          </div>
        </div>

        <div className="payment_frame">
          <TitleBar title="결제내역" onClick={addPayment} />
          <div className="table_titles">
            <div className="payer">결제한 사람</div>
            <div className="memo">메모</div>
            <div className="money">결제한 금액</div>
            <div className="users">사용한 사람들</div>
          </div>
          {payments.map((payment) => (
            <PaymentCard
              key={payment.id}
              id={payment.id}
              payer={payment.payer}
              memo={payment.memo}
              money={payment.money}
              users={payment.users}
              members={members}
              changeMemo={changeMemo}
              changePayer={changePayer}
              changeMoney={changeMoney}
              popupUsersSelect={popupUsersSelect}
              selectedPid={selectedPid}
              selectUser={selectUser}
              unselectUser={unselectUser}
              selectUserAll={selectUserAll}
              unselectUserAll={unselectUserAll}
              deletePayment={deletePayment}
              selectedPaymentCardId={selectedPaymentCardId}
              selectPaymentCard={selectPaymentCard}
            />
          ))}
        </div>

        {/* <div className="column3">
					<div className="result">
						<div className="title">
							중간 계산 결과
						</div>
						<div className="table__id">
							<div className="result__element__name">이름</div>
							<div className="result__element__paidMoney">총 결제 금액</div>
							<div className="result__element__usedMoney">총 사용 금액</div>
							<div className="result__element__usedMoney">보너스</div>
						</div>
						{middleResult.map(res => 
							<div key={res.id} className="result__element">
								<div className="result__element__name">
									{res.name}
								</div>
								<div className="result__element__paidMoney">
									{res.paidMoney}
								</div>
								<div className="result__element__usedMoney">
									{res.usedMoney}
								</div>
								<div className="result__element__usedMoney">
									{res.bonus}
								</div>
							</div>
						)}
						<div className="result__element">
								<div className="result__element__name">
									총 합
								</div>
								<div className="result__element__paidMoney">
									{paidMoneyAll}
								</div>
								<div className="result__element__usedMoney">
									{usedMoneyAll}
								</div>
							</div>
					</div>
					<button className="calculateBtn" onClick={() => setResultToggle(true)}>N빵 하기</button>
				</div> */}
      </div>
      {resultToggle ? (
        <Result
          setResultToggle={setResultToggle}
          members={members}
          payments={payments}
          middleResult={middleResult}
        />
      ) : (
        <Fragment />
      )}
    </div>
  );
}

export default Calculation;
