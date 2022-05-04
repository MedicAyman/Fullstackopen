import React from "react";
import { useState } from "react";

export default function Form({ persons, setPersons }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();
    if (
      persons.map((person) => person.name).includes(newName) ||
      persons.map((person) => person.number).includes(newNumber)
    ) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      let p = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(p));
      setNewName("");
      setNewNumber("");
    }
  };
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        name: <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
