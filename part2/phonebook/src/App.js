import Form from "./components/Form";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import BookService from "./components/BookService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    BookService.getAll().then((initialList) => setPersons(initialList));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      <Form
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />
      <Search persons={persons} setPersons={setPersons} setNotification={setNotification} />
    </div>
  );
};

export default App;
