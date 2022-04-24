import { useState } from "react";

const StatisitcsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};
const Statisitcs = (props) => {
  const PositiveCent = () => {
    if (props.good === 0) {
      return "no one likes it";
    }
    let percentage = props.good / (props.good + props.neutral + props.bad);
    return percentage * 100 + " %";
  };

  if (props.good + props.neutral + props.bad === 0) {
    return <p>No statistics available</p>;
  }

  return (
    <>
      <h1>
        <b>statistics</b>
      </h1>
      <table>
        <tbody>
          <StatisitcsLine text="good" value={props.good} />
          <StatisitcsLine text="neutral" value={props.neutral} />
          <StatisitcsLine text="bad" value={props.bad} />
          <StatisitcsLine
            text="All"
            value={props.bad + props.good + props.neutral}
          />
          <StatisitcsLine
            text="Average"
            value={(props.good + props.neutral + props.bad) / 3}
          />
          <StatisitcsLine text="Positives" value={PositiveCent()} />
        </tbody>
      </table>
    </>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  

  return (
    <div>
      <h1>
        <b>Give feedback</b>
      </h1>

      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />

      <br></br>
      <Statisitcs good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
