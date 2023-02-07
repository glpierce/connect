import React, { useState } from "react";
import { FormControl, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';

function CreateAccount({ setUser, hash }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [emailInUse, setEmailInUse] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (password === passwordConfirmation) {
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
            fetch("http://localhost:4000/create_account", payload)
            .then((r) => {
              if (r.ok) {
                  r.json().then((userResp) => {
                    if (userResp.status === "SUCCESS") {
                      setUser(userResp)
                    } else {
                      console.log(userResp)
                    }
                    });
              } else {
                  r.json().then((err) => console.log(err.errors)); //finish error handling
              }
            });
        } else {
          resetPasswordFields();
          setPasswordMatch(false);
        }
    }

    function resetPasswordFields() {
        setPassword("");
        setPasswordConfirmation("");
    }


    return(
        <div>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                <TextField
                required
                id="user-email"
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                {emailInUse ? <p>There is already an account associated with this email</p> : <></>}
                <TextField
                required
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                required
                id="confirm"
                label="Confirm Password"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                {passwordMatch ? <></> : <p>Passwords must match</p>}
                <br />
                <Button variant="outlined" style={{color: "#083C5A", borderColor: "#083C5A"}} onClick={handleSubmit}>Sign Up!</Button>
            </FormControl>
            </Box>
        </div>
    );
}

export default CreateAccount;
