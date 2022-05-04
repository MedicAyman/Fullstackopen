import React from "react";
import DeleteBtn from './DeleteBtn'
export default function Person({ person, setPersons, persons}) {
  return (
    <>
      <li>
        {person.name}: {person.number}
        <DeleteBtn person={person} setPersons={setPersons} persons={persons} />
      </li>
    </>
  );
}
