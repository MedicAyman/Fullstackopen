import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data.sort((a, b) => {
    return Number(b.likes) - Number(a.likes);
  });
};
const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  return await axios.delete(`${baseUrl}/${blog.id}`, config);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, remove };
