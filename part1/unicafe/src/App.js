import { useState } from "react";

const Statisitcs = (props) => {

  const PositiveCent = () => {
    if (props.good === 0) {
      return "no one likes it";
    }
    let percentage = props.good / (props.good + props.neutral + props.bad);
    return percentage * 100;
  };

  if (props.good + props.neutral + props.bad === 0) {
    return <p>No statistics available</p>  
  }

  return (
    <>
      <h1>
        <b>statistics</b>
      </h1>
      <p>good: {props.good}</p>
      <p>neutral: {props.neutral}</p>
      <p>bad: {props.bad}</p>
      <p>All: {props.good + props.neutral + props.bad}</p>
      <p>average: {(props.good + props.neutral + props.bad) / 3}</p>
      <p>positives: {PositiveCent()}%</p>
    </>
  );
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

      <p>
        <button
          onClick={() => {
            setBad(bad + 1);
          }}
        >
          Bad
        </button>
        <button
          onClick={() => {
            setNeutral(neutral + 1);
          }}
        >
          Neutral
        </button>
        <button
          onClick={() => {
            setGood(good + 1);
          }}
        >
          Good
        </button>
      </p>
      <br></br>
      <Statisitcs good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
