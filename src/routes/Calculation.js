import React, { useState } from 'react';
import "./Calculation.css";

let [personIdMax, paymentIdMax] = [1, 1];

function Calculation(props) {
	const [people, setPeople] = useState([{id: 0, name: "철수"}, {id: 1, name: "영희"}]);
	const [payment, setPayment] = useState([
		{id: 0, memo: "결제1", payer: 0, money: 1000, people: [0,1]},
		{id: 1, memo: "결제2", payer: 1, money: 3000, people: [0,1]}
	]);

	function changeName(newName, id) {
		console.log("changeName");
		const newPeople = people.map(person => person.id === id ? {...person, name: newName} : person);
		setPeople(newPeople);
	}

	function changeMemo(newMemo, id) {
		console.log("changeMemo");
		const newPayment = payment.map(pay => pay.id === id ? {...pay, memo: newMemo} : pay);
		setPayment(newPayment);
	}

	function changeMoney(newMoney, id) {
		console.log("changeMoney");
		const newPayment = payment.map(pay => pay.id === id ? {...pay, money: newMoney} : pay);
		setPayment(newPayment);
	}

	function addName() {
		console.log("addName", personIdMax);
		personIdMax = personIdMax+1;
		setPeople([...people, {id: personIdMax, name: "이름"+(personIdMax+1)}]);
	}

	function addPayment() {
		console.log("addPayment", paymentIdMax);
		paymentIdMax++;
		setPayment([...payment, {id: paymentIdMax, memo: "결제"+(paymentIdMax+1), payer: 0, money: 0, people: [0]}]);
	}

	function deletePerson(id) {
		console.log("deletePerson", id);
		const newPayment = [];

		for(let i=0; i<payment.length; i++) {
			// 결제한 내역이 있는 경우, 삭제 불가
			if(payment[i].payer === id) {
				console.log("삭제 실패: 결제한 내역이 있는 사람입니다.");
				return;
			}
			// 사용한 사람들에 포함되어 있는 경우, 시용한 사람 리스트에서 제외
			newPayment.push({...payment[i], people: payment[i].people.filter(pid => id !== pid)});
		}

		const newPeople = people.filter(person => person.id !== id);
		setPeople(newPeople);
		setPayment(newPayment);
	}

	function deletePayment(id) {
		console.log("deletePayment");
		const newPayment = payment.filter(pay => pay.id !== id);
		setPayment(newPayment);
	}

	function findName(id) {
		for(let i=0; i<people.length; i++) {
			if(people[i].id === id)
			return people[i].name;
		}
		return "X";
	}

	function changePayer(e) {
		const { id: payId, value: newPayer } = e.target;
		console.log("changePayer", payId, newPayer);
		const newPayment = payment.map(pay => pay.id === Number(payId) ? {...pay, payer: Number(newPayer)} : pay);
		setPayment(newPayment);
	}

	return (
	  <div className="container">
			<div className="name">
				<div className="title">
					이름 입력
					<button onClick={addName}>추가하기</button>
				</div>
				<div>
					이름
					{people.map(person =>
					<div key={person.id}>
						<input
							value={person.name}
							placeholder="이름"
							onChange={(e) => changeName(e.target.value, person.id)}/>
						<button onClick={() => deletePerson(person.id)}>X</button>
					</div>
					)}
				</div>
			</div>
			<div className="money">
				<div className="title">
					결제내역 및 정산 대상 입력
					<button onClick={addPayment}>추가하기</button>
				</div>
				<div>
					<div className="table__id">
						<div className="table__id__memo">메모</div>
						<div className="table__id__payer">결제한 사람</div>
						<div className="table__id__money">결제한 금액</div>
						<div className="table__id__people">사용한 사람들</div>
					</div>
					{payment.map(pay =>
					<div key={pay.id}>
						{/* 메모 */}
						<input
						className="table__id__memo"
						value={pay.memo}
						placeholder="결제"
						onChange={e => changeMemo(e.target.value, pay.id)}/>
						{/* 결제한 사람 */}
						<select
						className="table__id__payer"
						id={pay.id}
						value={pay.payer}
						onChange={changePayer}>
							{people.map(person => (
								<option
								key={person.id}
								value={person.id}>
									{person.name}
								</option>
							))}
						</select>
						{/* 결제한 금액 */}
						<input
						className="table__id__money"
						type="number"
						value={pay.money}
						placeholder="0"
						onChange={e => changeMoney(e.target.value, pay.id)}/>
						<button className="table__id__people">
							{pay.people.map(id => findName(id))}
						</button>
						<button onClick={() => deletePayment(pay.id)}>X</button>
					</div>
					)}
				</div>
			</div>
			<div className="result">
				<div className="title">
					중간 계산 결과
				</div>
			</div>
		</div>
	);
}

export default Calculation;