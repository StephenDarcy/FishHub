import http from "../http-common";
const getAll = () => {
  return http.get("/users/");
};
const get = () => {
  return http.get(`/users/getUser`);
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

const getID = () => {
  return http.get("/users/getUserID/");
};

const uploadAvatar = (data) => {
  return http.post("/users/avatar/", data);
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
  getID,
  uploadAvatar,
};
export default UserService;
