import Form from "./Form";
import Search from "./Search";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("data fetched: ", response.data);
      setPersons(response.data)
    });
    
  }, []);
console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>

      <Form persons={persons} setPersons={setPersons} />
      <Search persons={persons} />
    </div>
  );
};

export default App;
