import axios from "axios";

const baseUrl = "http://localhost:3001/persons";
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data)
};
const remove = id => {
    console.log("request delete")
    const request = axios.delete(`${baseUrl}/${id}`)
    console.log("axios deleted")
    
    return request.then(res => res.data)
    
}

const update = (id, newNumber) => {
    console.log("updating ", id)
    const request = axios.put(`${baseUrl}/${id}`, newNumber)
    return request.then(res => res.data)
}

export default{
    getAll,
    remove,
    update,
}