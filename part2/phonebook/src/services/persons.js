import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const updatePerson = (object) => {
  return axios.put(`${baseUrl}/${object.id}`, object);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const personService = { getAll, createPerson, deletePerson, updatePerson };
export default personService;
