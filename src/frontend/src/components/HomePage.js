import React from "react";
import PastDue from "./PastDue";
import Friends from "./Friends";

function HomePage({ user }) {
    return(
        <>
            <PastDue/>
            <Friends/>
        </>
    )
}

export default HomePage;