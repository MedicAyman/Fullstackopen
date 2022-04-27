import React from "react";

export default function Country({ country }) {
  return <div>
      <h3>{country.name.official}</h3>
      <p>Capital:  {country.capital}</p>
      <p>Area:  {country.area}</p>
      <p>Languages: </p>
      <ul>
          {React.Children.toArray(
              Object.values(country.languages).map(l => <li>{l}</li>)
          )}
      </ul>
      <br></br>
      <img src={country.flags.png} />
  </div>;
}
