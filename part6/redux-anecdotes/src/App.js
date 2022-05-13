import { useSelector, useDispatch } from "react-redux";
import AnecdotesList from "./components/AnecdotesList";

const App = () => {
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList anecdotes={anecdotes} />
      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
