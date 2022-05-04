import React from "react";
import DeleteBtn from './DeleteBtn'
export default function Person({ person, setPersons, persons, setNotification}) {
  return (
    <>
      <li>
        {person.name}: {person.number}
        <DeleteBtn person={person} setPersons={setPersons} persons={persons} setNotification={setNotification}/>
      </li>
    </>
  );
}
