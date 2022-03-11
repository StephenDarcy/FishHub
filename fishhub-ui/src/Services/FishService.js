import http from "../http-rfishbase";

const getScientific = (data) => {
  return http.get(`/scientific`, {
    params: {
      common: data,
    },
  });
};

const getCountry = (data) => {
  return http.get(`/country`, {
    params: {
      scientific: data,
    },
  });
};

const getFoodchain = (data) => {
  return http.get(`/foodchain`, {
    params: {
      scientific: data,
    },
  });
};

const getEcosystem = (data) => {
  return http.get(`/ecosystem`, {
    params: {
      scientific: data,
    },
  });
};

const getFisheries = (data) => {
  return http.get(`/fisheries`, {
    params: {
      scientific: data,
    },
  });
};

const getFood = (data) => {
  return http.get(`/food`, {
    params: {
      scientific: data,
    },
  });
};

const getAquarium = (data) => {
  return http.get(`/aquarium`, {
    params: {
      scientific: data,
    },
  });
};

const getParameters = (data) => {
  return http.get(`/parameters`, {
    params: {
      scientific: data,
    },
  });
};

const getSwim = (data) => {
  return http.get(`/swim`, {
    params: {
      scientific: data,
    },
  });
};

const FishService = {
  getScientific,
  getCountry,
  getAquarium,
  getEcosystem,
  getFisheries,
  getFood,
  getFoodchain,
  getParameters,
  getSwim,
};

export default FishService;
