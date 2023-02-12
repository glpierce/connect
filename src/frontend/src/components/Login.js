import React, { useState } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
const ariaLabel = { "aria-label": "description" };

function Login({ setUser, hash }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const postObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password_digest: hash(password) }),
    };
    const response = await fetch("http://localhost:4000/login", postObj);
    setIsLoading(false);
    console.log(response);
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    } else {
      const error = await response.json();
      setError(error.error_message);
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div>
      <form>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <Input
            inputProps={ariaLabel}
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            inputProps={ariaLabel}
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="outlined"
            style={{ color: "#083C5A", borderColor: "#083C5A" }}
            type="submit"
            onClick={(e) => handleLoginSubmit(e)}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <div>{!!error ? <p>{error}</p> : <></>}</div>
        </Box>
      </form>
    </div>
  );
}

export default Login;
