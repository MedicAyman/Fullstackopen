import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1><b>Give feedback</b></h1>  
      
      <p>
        <button onClick={() => {setBad(bad + 1)}}>Bad</button>
        <button onClick={() => {setNeutral(neutral + 1)}}>Neutral</button>
        <button onClick={() => {setGood(good + 1)}}>Good</button>
      </p>
      <br></br>

      <h1><b>statistics</b></h1>  

      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

export default App