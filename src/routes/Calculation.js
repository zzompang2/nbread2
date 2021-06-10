import React, { Fragment, useState } from 'react';
import "./Calculation.css";
import UsersSelect from "./UsersSelect";
import Result from "./Result";

let [paidMoneyAll, usedMoneyAll] = [0, 0];
let middleResult = [
	{id: 0, name: "철수", paidMoney: 0, usedMoney: 0, bonus: 0},
	{id: 1, name: "영희", paidMoney: 0, usedMoney: 0, bonus: 0}
];

function Calculation(props) {
	const [members, setMembers] = useState([{id: 0, name: "철수"}, {id: 1, name: "영희"}]);
	const [payments, setPayments] = useState([
		{id: 0, memo: "결제1", payer: 0, money: 0, users: [0,1]},
		{id: 1, memo: "결제2", payer: 1, money: 0, users: [0,1]}
	]);
	const [selectedPid, setSelectedPid] = useState(-1);					// UsersSelect 가 눌려있는 payment
	const [resultToggle, setResultToggle] = useState(false);	// Result 창 토글

	/**
	 * MID 멤버의 이름을 NEWNAME 으로 수정한다.
	 * @param {text} newName 수정된 이름
	 * @param {number} mid id of member
	 */
	function changeName(newName, mid) {
		console.log("changeName/새로운 이름 및 mid =", newName, mid);
		const newMembers = members.slice();
		newMembers[mid] = {id: mid, name: newName};
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
		newPayments[pid] = {...newPayments[pid], memo: newMemo};
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
		newPayments[pid] = {...newPayments[pid], money: newMoney};
		setPayments(newPayments);
	}

	/**
	 * MEMBERS 에 새로운 멤버를 추가한다.
	 */
	function addMember() {
		const newId = members.length;
		console.log("addMember/새로운 멤버 id =", newId);
		setMembers([...members, {id: newId, name: "이름"+(newId+1)}]);
	}

	/**
	 * PAYMENTS 에 새로운 결제 내역을 추가한다.
	 */
	function addPayment() {
		const newId = payments.length;
		console.log("addPayment/새로운 결제 id =", newId);
		setPayments([...payments, {id: newId, memo: "결제"+(newId+1), payer: 0, money: 0, users: members.map(member => member.id)}]);
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
		for(let i=0; i<payments.length; i++) {
			if(payments[i].payer === mid) {
				console.log("삭제 실패: 결제한 내역이 있는 사람입니다.");
				return;
			}
		}
		// USERS 에 포함되어 있는 경우: USERS 리스트에서 제외
		// 제거된 멤버 뒤의 멤버들은 ID 를 1씩 줄여준다.
		const newPayments = payments.map(payment => {
			return {
				...payment,
				payer: payment.payer > mid ? payment.payer-1 : payment.payer,
				users: payment.users.filter(id => id !== mid).map(id => id < mid ? id : id-1)
			};
		});

		// 제거된 멤버 뒤의 멤버들은 ID 를 1씩 줄여준다.
		const newMembers = members.slice(0, mid).concat(
			members.slice(mid+1).map(member => {
				return {...member, id: member.id-1};
			})
		);
		setMembers(newMembers);
		setPayments(newPayments);
	}

	/**
	 * PID 결제 내역을 삭제하고 삭제된 결제 내역 이후의 ID 를 수정한다. 연속된 ID 를 갖게 하기 위함이다.
	 * @param {number} pid id of payment
	 */
	function deletePayment(pid) {
		console.log("deletePayment/삭제한 결제 내역 id =", pid);
		const newPayments = payments.slice(0, pid).concat(
			payments.slice(pid+1).map(payment => {
				return {...payment, id: payment.id-1};
			})
		);
		setPayments(newPayments);
	}

	/**
	 * MID 를 갖는 멤버의 이름을 리턴한다.
	 * @param {number} mid id of member
	 * @returns 
	 */
	function findName(mid) {
		for(let i=0; i<members.length; i++) {
			if(members[i].id === mid)
			return members[i].name;
		}
		return "X";
	}

	/**
	 * 선택한 멤버를 PID 결제 내역의 PAYER 으로 한다.
	 * @param {*} e 
	 */
	function changePayer(e) {
		const { id: pid, value: newPayer } = e.target;
		console.log("changePayer/(결제 내역, 새로운 결제자)의 id =", pid, newPayer);
		const newPayments = payments.slice();
		newPayments[Number(pid)] = {...newPayments[Number(pid)], payer: Number(newPayer)};
		setPayments(newPayments);
	}

	/**
	 * PID 결제 내역의 USERS 에 MID 멤버를 추가한다.
	 * @param {number} pid 결제 내역의 ID
	 * @param {number} mid 멤버의 ID
	 */
	function selectUser(pid, mid) {
		const newPayments = payments.slice();
		newPayments[pid] = {...newPayments[pid], users: [...newPayments[pid].users, mid]};
		setPayments(newPayments);
	}

	/**
	 * PID 결제 내역의 USERS 에 MID 멤버를 제거한다.
	 * @param {number} pid 결제 내역의 ID
	 * @param {number} mid 멤버의 ID
	 */
	function unselectUser(pid, mid) {
		const newPayments = payments.slice();
		newPayments[pid] = {...newPayments[pid], users: newPayments[pid].users.filter(id => id !== mid)};
		setPayments(newPayments);
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
		newPayments[pid] = {...newPayments[pid], users: members.map(member => member.id)};
		setPayments(newPayments);
	}

	/**
	 * PID 결제 내역의 USERS 에 모든 멤버를 제거한다.
	 * @param {number} pid 결제 내역의 ID
	 */
	function unselectUserAll(pid) {
		const newPayments = payments.slice();
		newPayments[pid] = {...newPayments[pid], users: []};
		setPayments(newPayments);
	}

	/**
	 * 멤버별 총 결제 금액 및 총 사용 금액을 계산한다.
	 * @returns Array of {id, name, paidMoney, usedMoney, bonus}
	 */
	function updateMiddleResult() {
		console.log("updateMiddleResult");
		middleResult = members.map(member => {return {...member, paidMoney: 0, usedMoney: 0, bonus: 0}});
		payments.forEach(payment => {
			let money = Number(payment.money);
			middleResult[payment.payer].paidMoney += money;
			
			/* 나누어 떨어지지 않으면 올림해서 보내기로 한다 */
			const num = payment.users.length;
			const rest = money % num;
			if(rest !== 0) {
				const bonus = num - rest;	// 결제자가 받을 추가 금액
				money += bonus;						// 나누어 떨어지도록 더함
				middleResult[payment.payer].bonus = bonus;	
			}
			payment.users.forEach(mid => {
				middleResult[mid].usedMoney += money / num;
			});
		});

		paidMoneyAll = 0;
		usedMoneyAll = 0;
		middleResult.forEach(res => {
			paidMoneyAll += res.paidMoney;
			usedMoneyAll += res.usedMoney;
		});
	}

	// 뭐가 수정되든 항상 업데이트
	updateMiddleResult();

	return (
		<div className="container">
			<div className="calculation__container">
				<div className="name">
					<div className="title">
						이름 입력
						<button onClick={addMember}>추가하기</button>
					</div>
					<div>
						이름
						{members.map(member =>
						<div key={member.id}>
							<div>{member.id}</div>
							<input
								value={member.name}
								placeholder="이름"
								onChange={(e) => changeName(e.target.value, member.id)}/>
							<button onClick={() => deleteMember(member.id)}>X</button>
						</div>
						)}
					</div>
				</div>

				<div className="money">
					<div className="title">
						결제내역 및 정산 대상 입력
						<button onClick={addPayment}>추가하기</button>
					</div>
					<div className="table__id">
						<div className="table__id__memo">메모</div>
						<div className="table__id__payer">결제한 사람</div>
						<div className="table__id__money">결제한 금액</div>
						<div className="table__id__users">사용한 사람들</div>
					</div>
					{payments.map(payment =>
					<div key={payment.id} className="table__element">
						{/* 메모 */}
						<input
						className="table__id__memo"
						value={payment.memo}
						placeholder="결제"
						onChange={e => changeMemo(e.target.value, payment.id)}/>
						{/* 결제한 사람 */}
						<select
						className="table__id__payer"
						id={payment.id}
						value={payment.payer}
						onChange={changePayer}>
							{members.map(member => (
								<option
								key={member.id}
								value={member.id}>
									{member.name}
								</option>
							))}
						</select>
						{/* 결제한 금액 */}
						<input
						className="table__id__money"
						type="number"
						value={payment.money}
						placeholder="0"
						onChange={e => changeMoney(e.target.value, payment.id)}/>
						{/* 사용한 사람들 */}
						<div className="table__id__users">
							<button onClick={() => popupUsersSelect(payment.id)}>
								{payment.users.length === members.length ?
								"전체"
								:
								payment.users.length === 0 ?
								"사용한 사람들을 선택해 주세요"
								:
								payment.users.map(id => findName(id))
								}
							</button>
							{selectedPid === payment.id ?
							<UsersSelect
							pid={payment.id}
							users={payment.users}
							members={members}
							selectUser={selectUser}
							unselectUser={unselectUser}
							selectUserAll={selectUserAll}
							unselectUserAll={unselectUserAll}
							popupUsersSelect={popupUsersSelect} />
							:
							<Fragment />}
						</div>
						<button onClick={() => deletePayment(payment.id)}>X</button>
					</div>
					)}
				</div>

				<div className="column3">
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
				</div>
			</div>
			{resultToggle ?
			<Result
			setResultToggle={setResultToggle}
			members={members}
			payments={payments}
			middleResult={middleResult} />
			:
			<Fragment />}
		</div>
	);
}

export default Calculation;