/*
Course component to display courses, their name, exercises, number of exo 
*/
import React from "react";

export default function Course({ course }) {

  // already done using reduce, calculates the sum of exercises
  let totalExercises = course.parts.reduce((sum, part) => {
    return sum += part.exercises
  }, 0)
 
  
  return (
    <div>
      <h1>{course.name}</h1>

      <ul>
        {course.parts.map((part) => (
          <li key={part.id}>
            {part.name}: {part.exercises}
          </li>
        ))}
      </ul>
      <b>total of {totalExercises} exercises</b>
    </div>
  );
}
