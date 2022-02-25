import http from "../http-rfishbase";

const getScientific = (data) => {
  return http.get("/scientific/", data);
};

const FishService = {
  getScientific,
};

export default FishService;
