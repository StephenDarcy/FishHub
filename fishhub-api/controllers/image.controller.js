const axios = require("axios");

exports.find = (req, res) => {
  axios
    .get(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Paracheirodon_simulans.jpg/1024px-Paracheirodon_simulans.jpg"
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
