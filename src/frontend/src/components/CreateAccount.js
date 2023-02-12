import React, { useState } from "react";
import { FormControl, TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";

function CreateAccount({ setUser, hash }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emailInUse, setEmailInUse] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setEmailInUse(null);
    if (password === passwordConfirmation) {
      setPasswordMatch(true);
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password_digest: hash(password),
        }),
      };
      const response = await fetch(
        "http://localhost:4000/create_account",
        payload
      );
      if (response.ok) {
        const userData = await response.json();
        console.log("SUCCESS", userData);
        setUser(userData);
      } else {
        const error = await response.json();
        handleError(error);
      }
    } else {
      handleError({ status: "PASSWORD_MATCH" });
    }
  }

  function handleError(error) {
    console.log(error);
    switch (error.status) {
      case "EMAIL_IN_USE":
        resetPasswordFields();
        setEmailInUse(error.error_message);
        break;
      case "PASSWORD_MATCH":
        resetPasswordFields();
        setPasswordMatch(false);
        break;
      default:
        resetForm();
        break;
    }
  }

  function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    resetPasswordFields();
    setEmailInUse(null);
    setPasswordMatch(true);
  }

  function resetPasswordFields() {
    setPassword("");
    setPasswordConfirmation("");
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <FormControl>
          <TextField
            required
            id="first-name"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            id="last-name"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {!!emailInUse ? <p style={{ color: "error" }}>{emailInUse}</p> : null}
          <TextField
            sx={!!emailInUse ? { borderColor: "error" } : {}}
            required
            id="user-email"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {passwordMatch ? (
            <></>
          ) : (
            <p style={{ color: "red" }}>Passwords must match</p>
          )}
          <TextField
            sx={!passwordMatch ? { borderColor: "error" } : {}}
            required
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            sx={!passwordMatch ? { borderColor: "error.main" } : {}}
            required
            id="confirm"
            label="Confirm Password"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <br />
          <Button
            variant="outlined"
            style={{ color: "#083C5A", borderColor: "#083C5A" }}
            onClick={handleSubmit}
          >
            Sign Up!
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}

export default CreateAccount;
