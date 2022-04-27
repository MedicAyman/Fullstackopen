import React from "react";

export default function Country({country}) {
  return <>
    <li key={country.population}>{country.name.official}</li>
  </>
}
