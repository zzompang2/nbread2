import React from 'react';
import "./Calculation.css";

function Calculation(props) {
  console.log(props);
	const people = [{id: 0, name: "철수"}, {id: 1, name: "영희"}];
	const payment = [
		{id: 0, memo: "결제1", paid: 0, money: 1000, people: [0,1]},
		{id: 1, memo: "결제2", paid: 1, money: 3000, people: [1]}
	];

	function handleChangeName() {
		console.log("handleChangeName");
	}

	function handleChangeMemo() {
		console.log("handleChangeMemo");
	}

	function handleChangeMoney() {
		console.log("handleChangeMoney");
	}

	return (
	  <div className="container">
			<div className="name">
				<div className="title">
					이름 입력
					<button>추가하기</button>
				</div>
				<div>
					이름
					{people.map(person =>
					<div key={person.id}>
						<input
							value={person.name}
							placeholder="이름"
							onChange={handleChangeName}/>
						<button>X</button>
					</div>
					)}
				</div>
			</div>
			<div className="money">
				<div className="title">
					결제내역 및 정산 대상 입력
					<button>추가하기</button>
				</div>
				<div>
					<div className="table__id">
						<div className="table__id__memo">메모</div>
						<div className="table__id__paid">결제한 사람</div>
						<div className="table__id__money">결제한 금액</div>
						<div className="table__id__people">사용한 사람들</div>
					</div>
					{payment.map(pay =>
					<div key={pay.id}>
						<input
						className="table__id__memo"
						value={pay.memo}
						placeholder="결제"
						onChange={handleChangeMemo}/>
						<button className="table__id__paid">{people[pay.paid].name}</button>
						<input
						className="table__id__money"
						value={pay.money}
						placeholder="0"
						onChange={handleChangeMoney}/>
						<button className="table__id__people">
							{pay.people.map(id => people[id].name)}
						</button>
						<button>X</button>
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