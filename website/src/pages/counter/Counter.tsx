import React from 'react';
import './Counter.css';

function Counter({ startDate }) {
  const counts = [];
  let item = 0;
  const today = new Date(); // Current date

  // Calculate the number of days since the start date to today
  const dayDifference = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalDays = 49; // Total count of days

  for (let i = 1; i <= 13; i++) {
    const count = i <= 7 ? i : 14 - i;
    const countItems = [];

    for (let j = 0; j < count; j++) {
      item++;
      let element: JSX.Element;

      // Determine element value based on conditions
      if (item <= dayDifference) {
        // element = '</>'; // Condition 1
        element = (
          <div>
            <div>{'</>'}</div>
            <div>{item}</div>
          </div>
        )
      } else if (item === totalDays) {
        // element = '⚑' //'&#9873;'; // Condition 2
        // element = String.fromCharCode(9873);
        element = <div className="count--end">&#9873;</div>
      } else {
        // element = ''; // Condition 3
        element = <div></div>
      }
      countItems.push(
        <div key={j} className="count--item" title={`Day ${item}`}>
          {element}
        </div>
      );
    }

    counts.push(
      <div key={i} className="count">
        {countItems}
      </div>
    );
  }

  return (
    <div id="count--container" className="count--container">
      {counts}
    </div>
  );
}

export default Counter;