import React from "react";
import "./Result.css";

function Result(props) {
  const { setResultToggle, members, payments, middleResult } = props;

  /**
   * 합이 0 이 되는 subset 들로 최대한 나누고,
		 그 subset 들의 index 집합을 반환한다.
   * @param {*} moneyToPay 
   * @returns 
   */
  function getMostSubsets(moneyToPay) {
    const money = [...moneyToPay];
    const subsets = [[]]; /* 모든 subset 의 index array */
    const result = []; /* 합이 0 이 되는 subset 의 index array */

    /* 모든 subset 의 index array 만들기.
     * 현재까지의 부분집합 + 현재까지의 부분집합에 i 번째 원소를 넣은 부분집합 */
    for (let i = 0; i < money.length; i++) {
      const len = subsets.length;
      for (let j = 0; j < len; j++) {
        const subset = [...subsets[j], i]; /* new subset */
        let sum = 0;

        /* 길이가 전체의 절반 이상인데 합이 0 이려면,
				   이미 구한 RESULT 의 여집합인 경우 뿐이다 */
        if (subset.length > money.length / 2) continue;

        /* SUBSET 의 총 금액 SUM 을 구한다
				   금액이 undefined 인 index 는 이미 RESULT 에 들어간 것이므로 제외 */
        for (let k = 0; k < subset.length; ) {
          if (money[subset[k]] !== undefined) {
            sum += money[subset[k]];
            k += 1;
          } else subset.splice(k, 1);
        }
        /* SUM 이 0 인 SUBSET 인 경우 RESULT 에 추가하고
					 다른 조합에 원소들이 포함되지 않도록 MONEY 값을 undefined 으로 한다.
					 그리고 I 번째 원소를 포함한 조합은 더이상 있을 수 없으므로 break. */
        if (sum === 0 && subset.length !== 0) {
          result.push(subset);
          for (let k = 0; k < subset.length; k++) money[subset[k]] = undefined;
          break;
        } else subsets.push(subset);
      }
    }
    /* 남은 원소들이 있는 경우 (합은 0 이지만 길이가 전체 길이의 절반 초과인 경우) */
    const rest = [];
    for (let i = 0; i < money.length; i++)
      if (money[i] !== undefined) rest.push(i);
    if (rest.length !== 0) result.push(rest);

    return result;
  }

  const moneyToPay = middleResult.map((res) => res.usedMoney - res.paidMoney);
  const subsets = getMostSubsets(moneyToPay); // index array of subset
  const moneyFlows = []; //payer, payee 쌍의 집합

  /* 각 SUBSET 내에서 돈의 이동(from->to)를 구한다.
     SUBSET 내의 money 총합은 0 이므로 SUBSET 내에서만 주고 받아 정산을 
     끝낼 수 있다. n 명의 사람이 있다면 n-1 번의 송금으로 가능하다. 돈을 보내지
     않는 한 사람(ROOT)은 총 지출액이 가장 큰 사람으로 정한다. */
  console.log(subsets);
  for (let i = 0; i < subsets.length; i++) {
    const subset = subsets[i];
    const money = [];

    /* SUBSET 의 원소(전체 array 에서의 index)에 대응하는 money */
    for (let j = 0; j < subset.length; j++) money.push(moneyToPay[subset[j]]);

    /* 총 지출액이 가장 큰 사람의 index */
    const root = money.indexOf(Math.min(...money));

    /* SUBSET 내에서 정산이 완료될 때까지 {FROM, TO} 를 구한다 */
    while (money[root] !== 0) {
      let from, to;

      for (let j = 0; j < money.length; j++) {
        /* 돈을 줘야 하는 사람 */
        if (from === undefined && money[j] > 0) {
          from = j;
          /* ROOT 가 받을 금액보다 작은 경우, ROOT 에게 우선적으로 보낸다 */
          if (money[from] <= Math.abs(money[root])) to = root;
        } else if (to === undefined && money[j] < 0 && j !== root) to = j;
        /* 돈을 보내야 하는 사람 */

        if (from !== undefined && to !== undefined) break;
      }
      moneyFlows.push({
        from: subset[from],
        to: subset[to],
        money: money[from],
      });
      money[to] += money[from];
      money[from] = 0;
    }
  }

  let isAllZero = true;
  for (let i = 0; i < moneyFlows.length; i++) {
    if (moneyFlows[i].money !== 0) {
      isAllZero = false;
      break;
    }
  }

  console.log(moneyFlows);

  return (
    <div className="result-container" onClick={() => setResultToggle(false)}>
      <div className="result-bg">
        <div className="title">엔빵 완료!</div>
        <div className="payments">
          <div className="table-row">
            <span className="bodyText table-name">이름</span>
            <span className="bodyText table-pay">총 지불액</span>
          </div>
          {members.map((member) => (
            <div key={member.id} className="table-row">
              <div className="table-name whiteBox">
                {member.name === "" ? `사람${member.id + 1}` : member.name}
              </div>
              <div className="table-pay whiteBox">{moneyToPay[member.id]}</div>
            </div>
          ))}
        </div>

        <div className="empty" />

        {isAllZero ? (
          <div className="bodyText">정산할 게 없네요! 이렇게 깔끔할 수가!</div>
        ) : (
          <div>
            <div className="bodyText">돈 보내주세요</div>
            <div className="moneyFlow">
              <div className="table-row">
                {/* <span className="bodyText table-id2">번호</span> */}
                <span className="bodyText table-name">보내는 이</span>
                <span className="bodyText table-pay">금액</span>
                {/* <span className="bodyText table-id2">번호</span> */}
                <span className="bodyText table-name">받는 이</span>
              </div>

              {moneyFlows.map((flow, idx) => (
                <div key={idx} className="table-row">
                  {/* <div className="table-id2 whiteBox">{flow.from+1}</div> */}
                  <div className="table-name whiteBox">
                    {members[flow.from].name === ""
                      ? `사람${members[flow.from].id + 1}`
                      : members[flow.from].name}
                  </div>
                  <div className="table-pay whiteBox">{flow.money}원</div>
                  {/* <div className="table-id2 whiteBox">{flow.to+1}</div> */}
                  <div className="table-name whiteBox">
                    {members[flow.to].name === ""
                      ? `사람${members[flow.to].id + 1}`
                      : members[flow.to].name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="empty" />
      </div>
    </div>
  );
}

export default Result;
