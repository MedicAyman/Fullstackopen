import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = {
    content,
    id: getId(),
    vote: 0,
  };

  const response = await axios.post(baseUrl, object);
  return response.data;
};
const update = async (object) => {
  try {
    const response = await axios.put(`${baseUrl}/${object.id}`, object);

    return response.data;
  } catch (error) {}
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  createNew,
  update,
};
