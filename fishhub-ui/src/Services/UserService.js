import http from "../http-common";
const getAll = () => {
  return http.get("/users/");
};
const get = (id) => {
  return http.get(`/users/${id}`);
};
const create = (data) => {
  return http.post("/users/", data);
};
const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};
const remove = (id) => {
  return http.delete(`/users/${id}`);
};
const login = (data) => {
  return http.post("/users/login/", data);
};
const logout = () => {
  return http.get("/users/logout/");
};

const loggedIn = () => {
  return http.get("/users/loggedIn/");
};

const UserService = {
  getAll,
  get,
  create,
  update,
  remove,
  login,
  logout,
  loggedIn,
};
export default UserService;
