import React from "react";

export default function Course({course}) {
  return <div>
      <h1>{course.name}</h1>

      <ul>
        {course.parts.map(part => <li key={part.id}>{part.name}: {part.exercises}</li>)}
      </ul>
  </div>
}
