import React from 'react';
import './Counter.css';

function Counter({ startDate, duration }) {

  // Calculate the number of days since the start date to today
  const dayDifference = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  let countItems = [];
  const counts = [];
  let day = 0;

  // Helper to render each counter item based on day and current progress
  const renderItem = (day: number) => {
    if (day <= dayDifference) {
      return (<div>{`</${day}>`}</div>);
    } else if (day === duration) {
      return <div className="count--end">&#9873;</div>;
    } else {
      return <div></div>;
    }
  };

  for (let i = 1; i <= duration; i++) {
    day++;
    countItems.push(
      <div key={day} className="count--day" title={`Day ${day}`}>
        {renderItem(day)}
      </div>
    );

    if (i % 6 === 0) {
      counts.push(<div key={i} className="count">{countItems}</div>);
      countItems = [];
    }
  }

  return (
    <div id="count--container" className="count--container">
      {counts}
    </div>
  );
}

export default Counter;