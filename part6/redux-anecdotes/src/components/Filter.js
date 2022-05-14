import { useSelector, useDispatch } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";
const Filter = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();

    const query = event.target.value;

    const payload = {
      query: query,
      anecdotes: anecdotes,
    };

    dispatch(filterAnecdotes(payload));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <input type="text" onChange={handleChange} name="filterinput" />
    </div>
  );
};

export default Filter;
