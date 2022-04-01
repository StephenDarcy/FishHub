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

// Gets all the relevant information about a specific species
const getAllData = async (data) => {
  let responseData = {
    countries: [],
    aquariumTrade: [],
    ecosystem: [],
    fisheries: [],
    food: [],
    foodchain: [],
    parameters: [],
  };

  // getting all the country data
  try {
    await getCountry(data).then((response) => {
      let countryData = response.data;
      countryData.forEach((country) => {
        let countryObj = {
          country: {
            name: "",
            status: "",
          },
        };
        // adding objects for each country
        countryObj.country = country.country;
        countryObj.status = country.Status;
        responseData["countries"].push(countryObj);
      });
    });
  } catch (error) {
    console.log("Could not get country data: " + error);
  }

  // getting country fish was introduced to for aquarium trade
  try {
    await getAquarium(data).then((response) => {
      let aquariumData = response.data;
      aquariumData.forEach((country) => {
        let aquariumObj = {
          country: "",
        };
        // adding objects for each country if introduced for aquarium trade
        if (country.Reason == "ornamental") {
          aquariumObj.country = country.TO;
        }
        responseData["aquariumTrade"].push(aquariumObj);
      });
    });
  } catch (error) {
    console.log("Could not get aquarium data: " + error);
  }

  // getting ecosystem data
  try {
    await getEcosystem(data).then((response) => {
      let ecosystemData = response.data;
      ecosystemData.forEach((ecosystem) => {
        let ecosystemObj = {
          name: "",
          climate: "",
          type: "",
          location: "",
          salinity: "",
        };
        ecosystemObj.name = ecosystem.EcosystemName;
        ecosystemObj.climate = ecosystem.Climate;
        ecosystemObj.type = ecosystem.EcosystemType;
        ecosystemObj.location = ecosystem.Location;
        ecosystemObj.salinity = ecosystem.Salinity;

        responseData["ecosystem"].push(ecosystemObj);
      });
    });
  } catch (error) {
    console.log("Could not get ecosystem data: " + error);
  }

  // getting fisheries data
  try {
    await getFisheries(data).then((response) => {
      let fisheriesData = response.data;
      fisheriesData.forEach((fishery) => {
        let fisheriesObj = {
          continent: "",
          location: "",
          status: "",
        };

        fisheriesObj.continent = fishery.ContinentGrp;
        fisheriesObj.location = fishery.FAO;
        fisheriesObj.status = fishery.Status;

        responseData["fisheries"].push(fisheriesObj);
      });
    });
  } catch (error) {
    console.log("Could not get fisheries data: " + error);
  }

  // getting food data
  try {
    await getFood(data).then((response) => {
      let foodData = response.data;
      foodData.forEach((foodGroup) => {
        let foodObj = {
          food: "",
        };

        foodObj.food = foodGroup.Foodgroup;
        responseData["food"].push(foodObj);
      });
    });
  } catch (error) {
    console.log("Could not get food data: " + error);
  }

  // getting food chain data
  try {
    await getFoodchain(data).then((response) => {
      let foodchainData = response.data;
      foodchainData.forEach((foodchain) => {
        let foodchainObj = {
          foodText: "",
          trophicLevel: 0,
        };

        foodchainObj.foodText = foodchain.AddRems;
        foodchainObj.trophicLevel = foodchain.FoodTroph;
        responseData["foodchain"].push(foodchainObj);
      });
    });
  } catch (error) {
    console.log("Could not get foodchain data: " + error);
  }

  // getting water parameters
  try {
    await getParameters(data).then((response) => {
      let parameterData = response.data;
      parameterData.forEach((paramData) => {
        let parameterObj = {
          minTemp: 0,
          maxTemp: 0,
          maxDH: 0,
          minPH: 0,
          maxPH: 0,
        };

        parameterObj.minTemp = paramData.TempMin;
        parameterObj.maxTemp = paramData.TempMax;
        parameterObj.maxDH = paramData.dHMax;
        parameterObj.minPH = paramData.pHMin;
        parameterObj.maxPH = paramData.pHMax;

        responseData["parameters"].push(parameterObj);
      });
    });
  } catch (error) {
    console.log("Could not get parameter data: " + error);
  }
  return responseData;
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
  getAllData,
};

export default FishService;
