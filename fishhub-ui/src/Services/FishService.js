import http from "../http-rfishbase";

const getScientific = (data) => {
  return http.get(`/scientific`, {
    params: {
      common: data,
    },
  });
};

const FishService = {
  getScientific,
};

export default FishService;
