import React from "react";
import BookService from "./BookService";
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
    if (persons.map((person) => person.name).includes(newName)) {
      let personToUpdate = persons.find((p) => p.name === newName);
      if (
        window.confirm(
          `sure wanna update ${personToUpdate.name} with ${newNumber}`
        )
      ) {
        personToUpdate = { ...personToUpdate, number: newNumber };
        console.log("personToUpdate", personToUpdate);
        BookService.update(personToUpdate.id, personToUpdate).then((updatedPerson) => {
          
          setPersons(
            persons.map((person) =>
              person.id !== personToUpdate.id ? person : updatedPerson
            )
          );
          
        });
      }
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
        number: <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
