import React, { useState } from "react";
import Overlay from "react-overlay-component";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material";
import { textFieldTheme } from "../themes/theme";

function AddOverlay({ addToggle, setAddToggle, user }) {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [lastContacted, setLastContacted] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [frequencyUnit, setFrequencyUnit] = useState("days");

  function handleBirthday(value) {
    setBirthday(value);
  }

  function handleLastContacted(value) {
    setLastContacted(value);
  }

  function handleFrequency(value) {
    if (/^[0-9]*$/.test(value)) {
      if (value === "") {
        setFrequency(null);
      } else {
        setFrequency(parseInt(value));
      }
    }
  }

  function calculateFrequency() {
    switch (frequencyUnit) {
      case "years":
        return frequency * 365;
      case "months":
        return frequency * 30;
      case "weeks":
        return frequency * 7;
      default:
        return frequency;
    }
  }

  async function handleAdd() {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        name: name,
        birthday: birthday,
        lastContacted: lastContacted,
        frequency: calculateFrequency(),
      }),
    };
    console.log(request);
    const response = await fetch("http://localhost:4000/add_friend", request);
    console.log(response.status);
    if (response.ok) {
      console.log(response.json());
    }
  }

  function renderFrequency() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <h4 style={{ marginRight: 10 }}>Contact every</h4>
        <div style={{ marginRight: 10 }}>
          <TextField
            variant="outlined"
            value={frequency}
            label="Number"
            onChange={(e) => handleFrequency(e.target.value)}
          />
        </div>
        <Select
          id="frequencyInput"
          value={frequencyUnit}
          label="Contact Frequency"
          onChange={(e) => setFrequencyUnit(e.target.value)}
          style={{ width: 180 }}
        >
          <MenuItem value={"days"}>Days</MenuItem>
          <MenuItem value={"weeks"}>Weeks</MenuItem>
          <MenuItem value={"months"}>Months</MenuItem>
          <MenuItem value={"years"}>Years</MenuItem>
        </Select>
      </div>
    );
  }

  return (
    <Overlay
      configs={{ animate: true }}
      isOpen={addToggle}
      closeOverlay={() => setAddToggle(false)}
    >
      <div className="overlayContainer">
        <h2 className="friendName">New Friend</h2>
        <div className="overlayDivider" />
        <ThemeProvider theme={textFieldTheme}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              required
              id="name"
              label="Name"
              variant="standard"
              value={name}
              style={{ width: 400, marginBottom: 15, marginTop: 15 }}
              color="primary"
              onChange={(e) => setName(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div style={{ marginBottom: 15 }}>
                <DesktopDatePicker
                  label="Birthday"
                  inputFormat="MM/DD/YYYY"
                  value={birthday}
                  onChange={handleBirthday}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
              <div style={{ marginBottom: 15 }}>
                <DesktopDatePicker
                  label="Last Contacted"
                  inputFormat="MM/DD/YYYY"
                  value={lastContacted}
                  onChange={handleLastContacted}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>
            {renderFrequency()}
            <Button
              id="demo-customized-button"
              variant="contained"
              color="success"
              disableElevation
              style={{ textTransform: "none" }}
              onClick={handleAdd}
            >
              Add Friend
            </Button>
          </div>
        </ThemeProvider>
      </div>
    </Overlay>
  );
}

export default AddOverlay;
