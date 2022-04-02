import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import FishService from "../Services/FishService";
import SearchResult from "./SearchResult";
import "../Styles/SearchDialog.css";

export default function SearchDialog(props) {
  const [open, setOpen] = useState(false);
  const [currentFish, setCurrentFish] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchComplete, setSearchComplete] = useState(false);
  const [data, setData] = useState([]);

  const handleClickOpen = () => {
    setSearchComplete(false);
    setSearching(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChoice = (species) => {
    props.setFish(species);
    handleClose();
  };

  let handleSearch = async () => {
    setSearching(true);
    await FishService.getScientific(currentFish)
      .then((response) => {
        console.log(response.status);
        console.log(response.data);

        if (response.status === 200) {
          setSearching(false);
          setSearchComplete(true);
          setData([]);
          setData(refineData(response.data));
          //if only one result redirect
          if (response.data.length == 1) {
            props.setFish(response.data[0].Species);
            handleClose();
          }
        } else {
          console.log("Error fetching search result");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    setCurrentFish(e.target.value);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Select to add a fish
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: "100%", height: "40%", alignItems: "center" },
        }}
      >
        <DialogTitle>Fishhub Search</DialogTitle>

        <DialogContent>
          {searching ? (
            <CircularProgress />
          ) : (
            <>
              {!searchComplete ? (
                <>
                  <DialogContentText>
                    Search from over 34,800 fish below, to compare the
                    compatibility with another fish in a aquarium or ecosystem
                  </DialogContentText>
                  <form onSubmit={handleSearch}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Search for a fish..."
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChange}
                    />
                  </form>
                </>
              ) : (
                <>
                  <h6>Select a fish from below</h6>
                  {data.map((species) => (
                    <div
                      className="search-results"
                      key={species.SpecCode + species.ComName + species.Species}
                    >
                      <SearchResult selectFish={handleChoice} {...species} />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSearch}>Search</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

SearchDialog.propTypes = {
  setFish: PropTypes.func,
};

const refineData = (data) => {
  let refinedData = [];
  let speciesCodes = [];
  data.forEach((species) => {
    if (speciesCodes.includes(species.SpecCode)) {
      // refining duplicate species
      let index = refinedData.findIndex(
        (obj) => obj.SpecCode == species.SpecCode
      );

      refinedData[index].ComName += ", " + species.ComName;
    } else {
      speciesCodes.push(species.SpecCode);
      refinedData.push(species);
    }
  });
  return refinedData;
};
