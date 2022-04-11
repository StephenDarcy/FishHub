import http from "../http-common";

const getAll = () => {
  return http.get(`/thread/`);
};

const create = (data) => {
  return http.post(`/thread/`, data);
};

const ThreadService = {
  getAll,
  create,
};
export default ThreadService;
