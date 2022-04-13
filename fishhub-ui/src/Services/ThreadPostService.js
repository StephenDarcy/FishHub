import http from "../http-common";

const getAll = (threadId) => {
  return http.get(`/threadPosts/${threadId}`);
};

const create = (data) => {
  return http.post(`/threadPosts/`, data);
};

const ThreadPostService = {
  getAll,
  create,
};
export default ThreadPostService;
