const axios = require("axios");
const fs = require("fs");
var path = require("path");

exports.find = (req, res) => {
  let imageFile = getImgFile(
    "https://en.wikipedia.org/w/api.php?action=query&titles=Dublin&prop=pageimages&format=json&pithumbsize=2048"
  );
  imageFile.then(function (result) {
    res.sendFile(path.resolve("images/image.jpg"));
  });
};

async function getImgFile(pageURL) {
  var sent;
  const imgPath = "./images/image.jpg";
  try {
    const { data: response } = await axios.get(pageURL);
    var item_id = Object.keys(response.query.pages)[0];
    sent = JSON.stringify(response.query.pages[item_id].thumbnail.source);
  } catch (error) {
    console.log(error);
  }

  try {
    let url = sent.replace(/['"]+/g, "");
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    return new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream(imgPath))
        .on("error", reject)
        .once("close", () => resolve(imgPath));
    });
  } catch (error) {
    console.log(error);
  }
}
