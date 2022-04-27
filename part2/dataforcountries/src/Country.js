import React from "react";
import { useState } from "react";
import Weather from "./Weather";

export default function Country({ country }) {
  const [show, setShow] = useState(false);

  const handleShow = () => () => {
    setShow(!show);
    console.log("show is on", show);
  };
  return (
    <li>
      {!show ? (
        <>
          <span>{country.name.common}</span>
          <button onClick={handleShow()}>{show ? "hide" : "show"}</button>
        </>
      ) : (
        <>
          <p>
            {country.name.official}{" "}
            <button onClick={handleShow()}>{show ? "hide" : "show"}</button>
          </p>

          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <p>Languages: </p>
          <ul>
            {React.Children.toArray(
              Object.values(country.languages).map((l) => <li>{l}</li>)
            )}
          </ul>
          <img src={country.flags.png} />
          <Weather country={country} />
        </>
      )}
    </li>
  );
}
