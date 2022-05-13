import { useSelector } from "react-redux";
import AnecdotesList from "./components/AnecdotesList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList anecdotes={anecdotes} />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
