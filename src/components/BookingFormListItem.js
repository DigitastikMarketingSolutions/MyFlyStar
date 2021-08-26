import React, { useEffect, useState } from "react";
import "./BookingFormListItem.css";
import { Select, MenuItem, TextField, FormControl, InputLabel } from "@material-ui/core";

function BookingFormListItem(props) {
  const [name, setName] = useState(["Mr.", "", "", ""]);
  const {handleCallback} = props

  useEffect(() => {
    handleCallback(
      name[2].trim()
        ? name.join(" ")
        : name.slice(0, 2).concat(name[3]).join(" ")
    );
  }, [name]);

  function handleNameChange(text, pos) {
    setName((curr) => {
      const newText = [...curr];
      newText[pos] = text;
      return newText;
    });
  }

  return (
    <div className="bookingListItem">
      <span className="bookingListItem__input">{props.idx + 1}.</span>
      <FormControl>
        <InputLabel id="title-label">Title</InputLabel>
        <Select
          className="bookingListItem__select"
          labelId="title-label"
          value={name[0]}
          required={true}
          onChange={(e) => handleNameChange(e.target.value, 0)}
        >
          <MenuItem value="Mr.">Mr.</MenuItem>
          <MenuItem value="Mrs.">Mrs.</MenuItem>
          <MenuItem value="Mstr.">Mstr.</MenuItem>
          <MenuItem value="Ms.">Ms.</MenuItem>
        </Select>
        <br/>
      </FormControl>
      <TextField
        className="bookingListItem__input"
        type="text"
        size="small"
        label="First Name"
        variant="outlined"
        value={name[1]}
        onChange={(e) => handleNameChange(e.target.value, 1)}
      />
      <TextField
        className="bookingListItem__input"
        type="text"
        size="small"
        label="Middle Name"
        variant="outlined"
        value={name[2]}
        onChange={(e) => handleNameChange(e.target.value, 2)}
      />
      <TextField
        className="bookingListItem__input"
        type="text"
        size="small"
        label="Last Name"
        variant="outlined"
        value={name[3]}
        onChange={(e) => handleNameChange(e.target.value, 3)}
      />
    </div>
  );
}

export default BookingFormListItem;
