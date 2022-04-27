import React from "react";
import {useState } from "react";
import CountriesList from "./CountriesList";

export default function Search({ countries }) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);

    let filterResult = countries.filter((c) => c.name.common.toUpperCase().includes(search.toUpperCase()));
    
    setResult(filterResult);
    
  };
  return (
    <>
      <div>
        Search: <input value={search} onChange={handleChangeSearch} />
      </div>

      <CountriesList countries={result} />
    </>
  );
}
