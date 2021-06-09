import React from 'react';
import "./MultiCheckbox.css";

function MultiCheckbox(props) {
  const { id, people, selected, selectPerson, unselectPerson, selectPersonAll, unselectPersonAll, popupMultiCheckbox } = props;
  console.log("MultiCheckbox", selected);

  return (
    <div>
      {/* 배경 눌러서 Modal 닫기 */}
      <div className="unclick" onClick={() => popupMultiCheckbox(-1)} />
      {/* Modal */}
      <div className="checkbox__container">
        {people.length === selected.length ?
        <button onClick={() => unselectPersonAll(id)}>전체해제</button>
        :
        <button onClick={() => selectPersonAll(id)}>전체선택</button>}
        {people.map(person => {
          let isSelected = false;
          for(let i=0; i<selected.length; i++) {
            if(person.id === selected[i]) {
              isSelected = true;
              break;
            }
          }
          return isSelected ?
          <button
          key={person.id}
          onClick={() => unselectPerson(id, person.id)}>
            선택됨
          </button>
          :
          <button
          key={person.id}
          onClick={() => selectPerson(id, person.id)}>
            {person.name}
          </button>
        })}
      </div>
    </div>
  )
}

export default MultiCheckbox;