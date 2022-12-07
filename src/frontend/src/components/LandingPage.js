import React, { useState } from "react"
import Login from "./Login"
import CreateAccount from "./CreateAccount"

function LandingPage({ setUser }) {
    const [createAccount, setCreateAccount] = useState(false)

    function toggleForm() {
        setCreateAccount(!createAccount)
    }

    return(
        <div style={{marginTop: !!createAccount ? "40px" : "100px"}}>
            {!!createAccount ? <CreateAccount setUser={setUser} /> : <Login setUser={setUser} />}
            <p onClick={toggleForm}>{!!createAccount ? "Already have an account? Sign in!" : "Don't have an account? Sign up!"}</p>
        </div>
    )
}

export default LandingPage