import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto", number: '0740263097' }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };


  const addName = (event) => {
    event.preventDefault();
    if (persons.map(person => person.name).includes(newName) || persons.map(person => person.number).includes(newNumber)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      let p = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(p));
      setNewName("");
      setNewNumber("")
    }
  };

  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug name: {newName}</div>
      <div>debug number: {newNumber}</div>
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
        {persons.map((p) => (
          <li key={p.name + Math.random()}>{p.name}: {p.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
