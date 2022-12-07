import React, { useState } from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
const ariaLabel = { 'aria-label': 'description' };

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    

    function handleLoginSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const postObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password })
        };
        fetch("http://localhost:5000/login", postObj)
        .then((r) => {
            setIsLoading(false);
            console.log(r);
            if (r.ok) {
                r.json().then((userResp) => setUser(userResp));
            } else {
                r.json().then((err) => {
                    setErrors(err.errors);
                    setEmail("");
                    setPassword("");
                });
            };
        });
    }

    return(
        <div>
            <form>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Input 
                        inputProps={ariaLabel} 
                        placeholder="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input 
                        inputProps={ariaLabel} 
                        placeholder="password" 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button 
                        variant="outlined" 
                        style={{color: "#083C5A", borderColor: "#083C5A"}} 
                        type="submit"
                        onClick={(e) => handleLoginSubmit(e)}
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </Button>
                    <div>
                        {!!errors ? <p>{errors}</p> : <></>}
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default Login
