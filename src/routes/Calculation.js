import React, { Fragment, useState } from 'react';
import "./Calculation.css";
import MultiCheckbox from "./MultiCheckbox";
import Result from "./Result";

let [personIdMax, paymentIdMax] = [1, 1];
let [paidAll, usedAll] = [0, 0];

function Calculation(props) {
	const [people, setPeople] = useState([{id: 0, name: "철수"}, {id: 1, name: "영희"}]);
	const [payment, setPayment] = useState([
		{id: 0, memo: "결제1", payer: 0, money: 0, people: [0,1]},
		{id: 1, memo: "결제2", payer: 1, money: 0, people: [0,1]}
	]);
	const [selectedId, setSelectedId] = useState(-1);					// MultiCheckbox 가 눌려있는 payment
	const [resultToggle, setResultToggle] = useState(false);	// Result 창 토글

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
		setPayment([...payment, {id: paymentIdMax, memo: "결제"+(paymentIdMax+1), payer: 0, money: 0, people: people.map(person => person.id)}]);
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

	function selectPerson(id, person) {
		const newPayment = payment.map(pay => pay.id === id ? {...pay, people: [...pay.people, person]} : pay);
		setPayment(newPayment);
	}

	function unselectPerson(id, person) {
		const newPayment = payment.map(pay => pay.id === id ? {...pay, people: pay.people.filter(id => id !== person)} : pay);
		setPayment(newPayment);
	}

	function popupMultiCheckbox(id) {
		console.log("popupMultiCheckbox", id);
		setSelectedId(selectedId === id ? -1 : id);
	}

	function selectPersonAll(id) {
		const newPayment = payment.map(pay => pay.id === id ? {...pay, people: people.map(person => person.id)} : pay);
		setPayment(newPayment);
	}

	function unselectPersonAll(id) {
		const newPayment = payment.map(pay => pay.id === id ? {...pay, people: []} : pay);
		setPayment(newPayment);
	}
	
	function updateResult() {
		const result = people.map(person => {return {...person, paid: 0, used: 0}});
		payment.forEach(pay => {
			for(let i=0; i<result.length; i++) {
				if(result[i].id === pay.payer) {
					result[i].paid += Number(pay.money);
					break;
				}
			}

			pay.people.forEach(id => {
				for(let i=0; i<result.length; i++) {
					if(result[i].id === id) {
						result[i].used += Number(pay.money) / pay.people.length;
						break;
					}
				}
			})
		})

		paidAll = 0;
		usedAll = 0;
		result.forEach(res => {
			paidAll += res.paid;
			usedAll += res.used;
		});
		return result;
	}

	return (
		<div className="container">
			<div className="calculation__container">
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
					<div className="table__id">
						<div className="table__id__memo">메모</div>
						<div className="table__id__payer">결제한 사람</div>
						<div className="table__id__money">결제한 금액</div>
						<div className="table__id__people">사용한 사람들</div>
					</div>
					{payment.map(pay =>
					<div key={pay.id} className="table__element">
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
						{/* 사용한 사람들 */}
						<div className="table__id__people">
							<button  onClick={() => popupMultiCheckbox(pay.id)}>
								{pay.people.map(id => findName(id))}
							</button>
							{selectedId === pay.id ?
							<MultiCheckbox
							id={pay.id}
							people={people}
							selected={pay.people}
							selectPerson={selectPerson}
							unselectPerson={unselectPerson}
							selectPersonAll={selectPersonAll}
							unselectPersonAll={unselectPersonAll}
							popupMultiCheckbox={popupMultiCheckbox} />
							:
							<Fragment />}
						</div>
						<button onClick={() => deletePayment(pay.id)}>X</button>
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
						</div>
						{updateResult().map(person => 
							<div key={person.id} className="result__element">
								<div className="result__element__name">
									{person.name}
								</div>
								<div className="result__element__paidMoney">
									{person.paid}
								</div>
								<div className="result__element__usedMoney">
									{person.used}
								</div>
							</div>
						)}
						<div className="result__element">
								<div className="result__element__name">
									총 합
								</div>
								<div className="result__element__paidMoney">
									{paidAll}
								</div>
								<div className="result__element__usedMoney">
									{usedAll}
								</div>
							</div>
					</div>
					<button className="calculateBtn" onClick={() => setResultToggle(true)}>N빵 하기</button>
				</div>
			</div>
			{ resultToggle ?
			<Result
			setResultToggle={setResultToggle}
			people={people}
			payment={payment} />
			:
			<Fragment /> }
		</div>
	);
}

export default Calculation;