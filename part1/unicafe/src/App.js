import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const PositiveCent = () => {
    if (good === 0) {
      return 'no likes it'
    }
    let percentage = good/(good+neutral+bad)
    return percentage * 100
   }
  
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

      <p>All: {good+neutral+bad}</p>
      <p>average: {(good+neutral+bad)/ 3}</p>
      <p>positives: {PositiveCent()}</p>
    </div>
  )
}

export default App