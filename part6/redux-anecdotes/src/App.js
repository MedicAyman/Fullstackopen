import { useSelector } from "react-redux";
import AnecdotesList from "./components/AnecdotesList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
