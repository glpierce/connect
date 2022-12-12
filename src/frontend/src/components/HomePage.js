import React, { useState, useEffect } from "react";
import FriendsHeader from "./FriendsHeader";
import FriendsDisplay from "./FriendsDisplay";
import AddOverlay from "./AddOverlay";

function HomePage({ user, windowDimensions }) {
    const [friends, setFriends] = useState([
        {
            id: 1,
            user_id: 1,
            name: "Yousef",
            birthdate: "11/25",
            last_messaged: new Date(),
            frequency: 7
        },
        {
            id: 2,
            user_id: 1,
            name: "Shroomsef",
            birthdate: "11/25",
            last_messaged: new Date(),
            frequency: 182
        },
        {
            id: 3,
            user_id: 1,
            name: "Ted",
            birthdate: "3/17",
            last_messaged: new Date(),
            frequency: 30
        }, 
        {
            id: 4,
            user_id: 1,
            name: "Jill",
            birthdate: "4/18",
            last_messaged: new Date(),
            frequency: 365
        },
        {
            id: 5,
            user_id: 1,
            name: "Dan",
            birthdate: "9/13",
            last_messaged: new Date(),
            frequency: 91
        },
        {
            id: 6,
            user_id: 1,
            name: "Num 6",
            birthdate: "2/11",
            last_messaged: new Date(),
            frequency: 30
        },
        {
            id: 7,
            user_id: 1,
            name: "Robert",
            birthdate: "9/13",
            last_messaged: new Date(),
            frequency: 91
        },
        {
            id: 8,
            user_id: 1,
            name: "Last",
            birthdate: "2/11",
            last_messaged: new Date(),
            frequency: 30
        },
    ]);
    const [pdFriends, setPDFriends] = useState([]);
    const [displayFriends, setDisplayFriends] = useState(friends)
    const [searchQuery, setSearchQuery] = useState("")
    const [addToggle, setAddToggle] = useState(false);

    // useEffect(() => {
    //     getFriends();
    // }, [])

    // function getFriends() {
    //     fetch(`http://localhost:5000/get_friends/${user.id}`)
    //     .then(r => r.json())
    //     .then(data => {
    //         console.log(data);
    //         setFriends(data);
    //         setDisplayFriends(data)
    //         findPDFriends();
    //     })
    // }

    useEffect(() => {
        if (!searchQuery) {
            setDisplayFriends(friends);
        } else {
            setDisplayFriends(friends.filter(friend => friend.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
    }, [searchQuery, friends])

    function findPDFriends() {
        const pd = friends.filter(friend => {
            // TODO(grant): get date diff and determine if past due or do on backend
        });
        setPDFriends(pd);
    }

    return(
        <>
            <div>
                <h1 className="pastDueHeader">Past Due</h1>
                <div className="sectionDivider"></div>
                {
                    pdFriends.length ?
                    <FriendsDisplay user={user} windowDimensions={windowDimensions} friends={pdFriends} display={"pastDue"} /> :
                    <div className="noFriendsDiv">
                        <p className="noFriendsLabel">No past due friends.</p>
                    </div>
                }
            </div>
            <div>
                <FriendsHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} setAddToggle={setAddToggle} />
                <div className="sectionDivider"></div>
                {
                    friends.length ?
                    <FriendsDisplay user={user} windowDimensions={windowDimensions} friends={displayFriends} display={"pastDue"} /> :
                    <div className="noFriendsDiv">
                        <p className="noFriendsLabel">No friends yet.</p>
                    </div>
                }
            </div>
            <AddOverlay addToggle={addToggle} setAddToggle={setAddToggle} />
        </>
    );
}

export default HomePage;