import React from 'react'

const Header = ({course}) => {
  return <p>{course}</p>
}

// assuming the number of parts = exercises
const Content = ({parts}) => {
  return <>
    <Part parts={parts}/>
  </>
}

const Part = ({ parts }) => {
  return parts.map((part, i) => <p key={i}>{part.name}: {part.exercises} </p>)
}
const Total = ({parts}) => {
  let sum = parts.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.exercises
  }, 0)
  return <>
   <p>Total: {sum} </p>
  </>
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>

      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      
    </div>
  )
}

export default App