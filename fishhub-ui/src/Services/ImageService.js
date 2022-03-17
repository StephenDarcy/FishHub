import http from "../http-common";

const getBySpecies = (species) => {
  return http.get(`/image/${species}`);
};

const deleteAll = () => {
  return http.delete(`/image/delete`);
};

const ImageService = {
  getBySpecies,
  deleteAll,
};
export default ImageService;
