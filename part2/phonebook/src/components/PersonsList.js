import React from "react";
import Person from "./Person";

export function PersonsList({ searchResult, setPersons, persons }) {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {React.Children.toArray(searchResult.map((p) => <Person person={p} setPersons={setPersons} persons={persons}/>))}
        </ul>
    </>
  );
}
