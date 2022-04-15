import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import sampleImg from "../Images/sample-icon.webp";
import FishService from "../Services/FishService";

export default function DisplayFish(props) {
  const [loading, isLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({
    title: `Sample Fish ${props.number}`,
    image: sampleImg,
    subTitle: "",
    bottomText: "",
  });

  // add first 4 common names as subheading
  let getCommonNames = (names) => {
    let namesString = names[0].name + ", ";

    for (let i = 1; i < 3; i++) {
      if (names[i]) {
        namesString += names[i].name + ", ";
      }
    }

    // remove trailing comma
    return namesString.substring(0, namesString.length - 2);
  };

  let getBottomText = (parameters, ecosystem) => {
    let text = "";

    if (ecosystem[0]) {
      text += " Water type: " + ecosystem[0].salinity;
    }

    // checking to make sure temp not undefined.
    if (parameters[0].minTemp && parameters[0].maxTemp) {
      text +=
        " Temperature range: " +
        parameters[0].minTemp +
        "°C to " +
        parameters[0].maxTemp +
        "°C";
    }

    // checking to make sure not pH undefined.
    if (parameters[0].minPH && parameters[0].maxPH) {
      text +=
        " pH range: " +
        parameters[0].minPH +
        "pH to " +
        parameters[0].maxPH +
        "pH";
    }

    // checking to make sure not dH undefined.
    if (parameters[0].maxDH) {
      text += " Water hardness: " + parameters[0].maxDH + "°dH";
    }

    return text;
  };

  useEffect(() => {
    fetchData();
    async function fetchData() {
      if (props.species) {
        isLoading(true);
        await FishService.getAllData(props.species).then((response) => {
          let image = `http://localhost:6868/api/image/ + ${props.species}`;
          setData({
            title: `${props.species}`,
            image: image,
            subTitle: getCommonNames(response.commonNames),
            bottomText: getBottomText(response.parameters, response.ecosystem),
          });
          props.setData(response);
          isLoading(false);
        });
      }
    }
  }, [props.species]);

  return (
    <Card
      sx={{
        minWidth: 345,
        maxWidth: 600,
        m: 2,
        backgroundColor: "#1a1a1b",
        boxShadow: "0px 0px 4px 0px #dcdcdc",
      }}
    >
      <CardHeader
        sx={{ color: "#dcdcdc", borderBottom: "1px solid #dcdcdc" }}
        action={
          loading ? null : <IconButton aria-label="settings"></IconButton>
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="100%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            data.title
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            <h6 style={{ color: "#dcdcdc" }}>{data.subTitle}</h6>
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          style={{ height: 300, backgroundColor: "#1a1a1b", padding: 50 }}
          component="img"
          image={data.image}
          alt="Species Image"
        />
      )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="#dcdcdc" component="p">
            {data.bottomText}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

DisplayFish.propTypes = {
  species: PropTypes.string,
  number: PropTypes.number,
  setData: PropTypes.func,
};
