import http from "../http-common";
const getAll = () => {
  return http.get("/api/users/");
};
const get = (id) => {
  return http.get(`/api/users/${id}`);
};
const create = (data) => {
  return http.post("/api/users/", data);
};
const update = (id, data) => {
  return http.put(`/api/users/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/api/users/${id}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
};
export default TutorialService;
