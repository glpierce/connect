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

function AddOverlay({ addToggle, setAddToggle, user, toggleFriendReload }) {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [lastContacted, setLastContacted] = useState(null);
  const [frequency, setFrequency] = useState("");
  const [frequencyUnit, setFrequencyUnit] = useState("days");

  function closeOverlay() {
    setName("");
    setBirthday(null);
    setLastContacted(null);
    setFrequency("");
    setFrequencyUnit("days");
    setAddToggle(false);
  }

  function handleBirthday(value) {
    setBirthday(value);
  }

  function handleLastContacted(value) {
    setLastContacted(value);
  }

  function handleFrequency(value) {
    console.log(value);
    if (/^[0-9]*$/.test(value)) {
      setFrequency(value);
    }
  }

  function calculateFrequency() {
    if (frequency === "") {
      return null;
    }
    const frequencyInt = parseInt(frequency);
    switch (frequencyUnit) {
      case "years":
        return frequencyInt * 365;
      case "months":
        return frequencyInt * 30;
      case "weeks":
        return frequencyInt * 7;
      default:
        return frequencyInt;
    }
  }

  function formatDate(value) {
    if (value === null) {
      return null;
    } else {
      const dateTime = new Date(value);
      const result = `${dateTime.getFullYear()}-${
        dateTime.getMonth() + 1
      }-${dateTime.getDate()}`;
      console.log("Date", result);
      return result;
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
        birthdate: formatDate(birthday),
        last_messaged: formatDate(lastContacted),
        frequency: calculateFrequency(),
      }),
    };
    const response = await fetch("http://localhost:4000/add_friend", request);
    console.log(response.status);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      closeOverlay();
      toggleFriendReload();
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
      closeOverlay={() => closeOverlay()}
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
