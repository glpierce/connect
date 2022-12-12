import React from "react";
import Navigation from "./Navigation";

function Header({ user, setUser }) {
    return(
        <div className="headerContainer" style={{justifyContent: (!!Object.keys(user).length ? "space-between" : "space-around")}}>
            {!!Object.keys(user).length ? <div className="navPlaceholder"></div> : null}
            <h1>Connect</h1>
            {Object.keys(user).length ? <Navigation user={user} setUser={setUser} /> : null}
        </div>
    )
}

export default Header