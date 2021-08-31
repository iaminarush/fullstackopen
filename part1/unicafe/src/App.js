import React, { useState } from "react";

const Header = () => {
  return <h1>give feedback</h1>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Counter = ({ text, count }) => {
  return (
    <p>
      {text} {count}
    </p>
  );
};

const Average = ({ average }) => {
  return <p>Average {average}</p>;
};

const Positive = ({ positive }) => {
  return <p>Positive {positive * 100}%</p>;
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <Counter text={"good"} count={good} />
      <Counter text={"neutral"} count={neutral} />
      <Counter text={"bad"} count={bad} />
      <Counter text={"all"} count={good + bad + neutral} />
      <Average average={(good - bad) / (good + bad + neutral)} />
      <Positive positive={good / (good + bad + neutral)} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  };
  const increaseBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header />
      <Button text={"good"} onClick={increaseGood} />
      <Button text={"neutral"} onClick={increaseNeutral} />
      <Button text={"bad"} onClick={increaseBad} />

      <Counter text={"all"} count={good + neutral + bad} />
      {/* <Average average={(good - bad) / all} />
        <Positive positive={(good / all) * 100} /> */}
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
