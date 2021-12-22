import React from 'react'

const Header = ({course}) => {
  return <p>{course}</p>
}

// assuming the number of parts = exercises
const Content = ({parts, exercises}) => {
  return <>
    <Part parts={parts} exercises={exercises} />
  </>
}

const Part = ({parts, exercises}) => {
  return exercises.map((e, i) => <p>{parts[i]} {e}</p>)
}
const Total = ({exercises}) => {
  return <p> Total:
     {exercises.filter(x => x).length}
  </p>
}

const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14


  return (
    <div>

      <Header course={course}/>
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
      <Total exercises={[exercises1, exercises2, exercises3]}/>
      
    </div>
  )
}

export default App