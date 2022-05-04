import Form from "./components/Form";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import BookService from "./components/BookService";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    BookService.getAll().then(initialList => setPersons(initialList))
  }, []);
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Form persons={persons} setPersons={setPersons} />
      <Search persons={persons} setPersons={setPersons}/>
    </div>
  );
};

export default App;
