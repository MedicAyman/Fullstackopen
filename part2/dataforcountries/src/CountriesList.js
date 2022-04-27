import React from "react";
import Country from "./Country";

export default function CountriesList({ countries }) {
  let displayList = () => {
    if (countries.lenght <= 10) {
      displayList = countries.map((country) => {
        <Country country={country} />;
      });
    } else {
      return displayList;
    }
  };
  console.log("length of the array: ", countries.length)
  return (
    <>
      <br></br>
      <h2>Countries list </h2>
      <ul>
        {countries.length >= 10 ? (
         <p>more than 10</p>
        ) : (
          React.Children.toArray(
            countries.map((c, index) => <Country country={c} />)
          )
        )}
      </ul>
    </>
  );
}
