import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import sampleImg1 from "../Images/fish-icon.webp";
import sampleImg2 from "../Images/fish-icon2.webp";

export default function DisplayFish(props) {
  const { loading = false } = props;

  let getSampleImage = () => {
    if (props.number == 1) {
      return sampleImg1;
    } else {
      return sampleImg2;
    }
  };

  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState({
    avatar: "sampleImage",
    title: `Sample Fish ${props.number}`,
    image: `${getSampleImage}`,
    subTitle: "",
    bottomText: "",
  });

  return (
    <Card sx={{ minWidth: 345, maxWidth: 600, m: 2 }}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar alt="Fish" src={data.avatar} />
          )
        }
        action={
          loading ? null : <IconButton aria-label="settings"></IconButton>
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
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
            data.subTitle
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <CardMedia
          component="img"
          height="400"
          image={getSampleImage()}
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
          <Typography variant="body2" color="text.secondary" component="p">
            {data.bottomText}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

DisplayFish.propTypes = {
  loading: PropTypes.bool,
  species: PropTypes.string,
  number: PropTypes.number,
};
