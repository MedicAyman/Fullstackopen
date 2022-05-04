import React from "react";
import { useState } from "react";

import { PersonsList } from "./PersonsList";

export default function Search({ persons, setPersons, setNotification}) {
  const [search, setNewSearch] = useState("");
  const [searchResult, setNewSearchResult] = useState(persons);



  const handleChangeSearch = (event) => {
    setNewSearch(event.target.value);

    let result = persons.filter((p) =>
      p.name.toUpperCase().includes(search.toUpperCase())
    );

    setNewSearchResult(result);
  };
  return (
    <>
      <div>
        Search: <input value={search} onChange={handleChangeSearch} />
      </div>
      <PersonsList searchResult={searchResult} setPersons={setPersons} persons={persons} setNotification={setNotification}/>
    </>
  );
}
