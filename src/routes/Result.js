import React from 'react';
import './Result.css';

function Result(props) {
  const { setResultToggle, people, payment } = props;

  return (
    <div className="result__container" onClick={() => setResultToggle(false)}>
      <div className="result__bg">
        Result
      </div>
    </div>
  )
}

export default Result;