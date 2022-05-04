import React from "react";
import BookService from "./BookService";

export default function DeleteBtn({
  person,
  setPersons,
  persons,
  setNotification,
}) {
  const handleDelete = (id) => {
    if (window.confirm(`sure you wanna delete ${person.name} phone's number`)) {
      BookService.remove(id)
        .then((res) => {
          let newList = persons.filter((person) => person.id !== id);
          setPersons(newList);
          console.log("updated state", persons);
        })
        .catch((res) => {
          setNotification({ content: "already deleted", type: "error" });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
    }
  };

  return <button onClick={() => handleDelete(person.id)}>Delete</button>;
}
