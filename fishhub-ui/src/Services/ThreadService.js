import http from "../http-common";

const getAll = () => {
  return http.get(`/thread/`);
};

const getOne = (id) => {
  return http.get(`/thread/${id}`);
};

const create = (data) => {
  return http.post(`/thread/`, data);
};

const ThreadService = {
  getAll,
  create,
  getOne,
};
export default ThreadService;
