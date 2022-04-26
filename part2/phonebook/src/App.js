import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setNewSearch] = useState("");
  const [searchResult, setNewSearchResult] = useState([]);

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleChangeSearch = (event) => {
    
    setNewSearch(event.target.value)

    let result = persons.filter(p => p.name.toUpperCase().includes(search.toUpperCase()))
    
    setNewSearchResult(result)
    

  };

  const addName = (event) => {
    event.preventDefault();
    if (
      persons.map((person) => person.name).includes(newName) ||
      persons.map((person) => person.number).includes(newNumber)
    ) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      let p = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(p));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Search: <input value={search} onChange={handleChangeSearch} />
      </div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          name: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {searchResult.map((p) => (
          <li key={p.name + Math.random()}>
            {p.name}: {p.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
