import React from "react";
import { useState } from "react";

export function PersonsList({ searchResult }) {
  
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {searchResult.map((p) => (
          <li key={p.name + Math.random()}>
            {p.name}: {p.number}
          </li>
        ))}
      </ul>
    </>
  );
}
