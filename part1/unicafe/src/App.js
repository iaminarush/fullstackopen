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

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const [average, setAverage] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    calculateAverage();
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    calculateAverage();
  };
  const increaseBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    calculateAverage();
  };
  const calculateAverage = () => {
    console.log(good, neutral, bad, all);
    setAverage((good - bad) / all);
  };

  return (
    <div>
      <Header />
      <Button text={"good"} onClick={increaseGood} />
      <Button text={"neutral"} onClick={increaseNeutral} />
      <Button text={"bad"} onClick={increaseBad} />
      <Counter text={"good"} count={good} />
      <Counter text={"neutral"} count={neutral} />
      <Counter text={"bad"} count={bad} />
      <Counter text={"all"} count={all} />
      <Average average={average} />
    </div>
  );
};

export default App;
