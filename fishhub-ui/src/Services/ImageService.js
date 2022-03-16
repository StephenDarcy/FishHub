import http from "../http-common";

const getBySpecies = (species) => {
  return http.get(`/image/${species}`);
};

const ImageService = {
  getBySpecies,
};
export default ImageService;
