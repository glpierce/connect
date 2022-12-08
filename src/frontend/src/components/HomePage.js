import React, { useState, useEffect } from "react";
import PastDue from "./PastDue";
import Friends from "./Friends";

function HomePage({ user }) {
    const [friends, setFriends] = useState([]);
    const [pdFriends, setPDFriends] = useState([]);

    useEffect(() => {
        getFriends();
    }, [])

    function getFriends() {
        fetch('http://localhost:5000/get_friends')
        .then(r => r.json())
        .then(data => {
            console.log(data);
            setFriends(data);
            findPDFriends()
        })
    }

    function findPDFriends() {
        const pd = friends.filter(friend => {
            //
        });
        setPDFriends(pd);
    }

    return(
        <>
            <PastDue user={user} pdFriends={pdFriends}/>
            <Friends user={user} friends={friends}/>
        </>
    );
}

export default HomePage;