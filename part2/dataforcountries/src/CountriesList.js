import React, { useState } from "react";
import Country from "./Country";

export default function CountriesList({ countries }) {
 
  if (countries.length > 10) {
    return <p>more than 10, be more specific</p>;
  }
  let displayList = () => {
    if (countries.lenght <= 10) {
      displayList = countries.map((country) => {
        <Country country={country} />;
      });
    } else {
      return displayList;
    }
  };

  
  return (
    <>
      <br></br>
      <h2>Countries list </h2>
      <ul>
        {countries.length === 1 ? (
          <Country country={countries[0]} />
        ) : (
          React.Children.toArray(countries.map((c) => <Country country={c} />))
        )}
      </ul>
    </>
  );
}
