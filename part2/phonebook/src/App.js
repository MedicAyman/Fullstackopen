import Form from "./Form";
import Search from './Search'
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  return (
    <div>
      <h2>Phonebook</h2>

      
      <Form persons={persons}  setPersons={setPersons}/>
      <Search persons={persons} />
    </div>
  );
};

export default App;
