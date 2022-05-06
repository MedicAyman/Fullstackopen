import React from "react";
import BookService from "./BookService";
import { useState } from "react";

export default function Form({ persons, setPersons, setNotification }) {
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
        BookService.update(personToUpdate.id, personToUpdate).then(
          (updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personToUpdate.id ? person : updatedPerson
              )
            );
          }
        );
        setNotification({ content: "Added successfully", type: "success" });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    } else {
      let p = {
        name: newName,
        number: newNumber,
      };

      BookService.create(p)
        .then((createdPerson) => {
          setPersons(persons.concat(p));
          setNotification({ content: "Added successfully", type: "success" });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setNotification({ content: error.response.data, type: "error" });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          console.log("Person creation error: ", error.response.data);
        });
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
