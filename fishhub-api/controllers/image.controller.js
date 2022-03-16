const axios = require("axios");
const fs = require("fs");
var path = require("path");

exports.find = (req, res) => {
  const species = req.params.species;
  console.log("Received from client:" + species);
  let imageFile = getImgFile(
    `https://en.wikipedia.org/w/api.php?action=query&titles=` +
      species +
      `&prop=pageimages&format=json&pithumbsize=2048`,
    species
  );

  imageFile.then(function (result) {
    res.sendFile(path.resolve("images/image.jpg"));
  });
};

async function getOtherImage(pageURL) {
  const imgPath = "./images/image.jpg";
  try {
    const { data: response } = await axios.get(pageURL);

    var item_id = Object.keys(response.query.pages)[0];
    console.log(response.query.pages[item_id].thumbnail.source);
    return JSON.stringify(response.query.pages[item_id].thumbnail.source);
  } catch (error) {
    console.log(error);
  }
}

async function getImgFile(pageURL, species) {
  var imgSource;
  const imgPath = "./images/image.jpg";
  try {
    const { data: response } = await axios.get(pageURL);
    var item_id = Object.keys(response.query.pages)[0];

    imgSource = JSON.stringify(response.query.pages[item_id].thumbnail.source);
  } catch (error) {
    imgSource = await getOtherImage(
      `https://commons.wikimedia.org/w/api.php?prop=pageimages|imageinfo|
    info|redirects&gsrnamespace=6&pilimit=max&pithumbsize=250&iiprop=extme
    tadata&iiextmetadatafilter=ImageDescription&action=query&inprop=url&red
    irects=&format=json&generator=search&gsrsearch=intitle:` +
        species +
        `&gsrlimi
    t=20`
    );
  } finally {
    console.log(imgSource);
    let url = imgSource.replace(/['"]+/g, "");
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
  }
}
