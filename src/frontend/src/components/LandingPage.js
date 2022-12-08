import React, { useState } from "react";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import sha256 from 'js-sha256';

function LandingPage({ setUser }) {
    const [createAccount, setCreateAccount] = useState(false);

    function toggleForm() {
        setCreateAccount(!createAccount);
    }

    function hash(str) {
        return(sha256(str));
    }

    return(
        <div style={{marginTop: !!createAccount ? "40px" : "100px"}}>
            {!!createAccount ? <CreateAccount setUser={setUser} hash={hash} /> : <Login setUser={setUser} hash={hash} />}
            <p onClick={toggleForm}>{!!createAccount ? "Already have an account? Sign in!" : "Don't have an account? Sign up!"}</p>
        </div>
    )
}

export default LandingPage