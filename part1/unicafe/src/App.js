import React, { useState } from "react";

const Header = () => {
  return <h1>give feedback</h1>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value, sign }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {sign}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={good + bad + neutral} />
          <StatisticLine
            text={"average"}
            value={(good - bad) / (good + bad + neutral)}
          />
          <StatisticLine
            text={"positive"}
            value={good / (good + bad + neutral)}
            sign={"%"}
          />
        </tbody>
      </table>
    </>
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
    <>
      <Header />
      <table>
        <tbody>
          <tr>
            <td>
              <Button text={"good"} onClick={increaseGood} />
            </td>
            <td>
              <Button text={"neutral"} onClick={increaseNeutral} />
            </td>
            <td>
              <Button text={"bad"} onClick={increaseBad} />
            </td>
          </tr>
          <StatisticLine text={"all"} value={good + neutral + bad} />
        </tbody>
      </table>

      {/* <Average average={(good - bad) / all} />
        <Positive positive={(good / all) * 100} /> */}
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
