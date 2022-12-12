import React, { useState, useEffect } from "react";
import FriendsDisplay from "./FriendsDisplay";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button";

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
            // TODO(grant): get date diff and determine if past due
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
                <div className="friendsHeader">
                    <div style={{display: "flex", flex: 1, justifyContent: "flex-start"}}>
                        <h1 className="friendsHeaderLabel">Friends</h1>
                    </div>
                    <div style={{display: "flex", flex: 1, justifyContent: "center"}}>
                        <TextField 
                            id="friendSearch" 
                            label="" 
                            variant="standard"
                            value={searchQuery}
                            style={{width: 300, marginRight: 30, marginLeft: 30}}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
                                endAdornment: (
                                    searchQuery ?
                                    <InputAdornment position="end"><CancelIcon style={{cursor: "pointer"}} onClick={(e => setSearchQuery(""))}/></InputAdornment> :
                                    <></>
                                )
                            }}
                            onChange={e => setSearchQuery(e.target.value)} 
                        />
                    </div>
                    <div style={{display: "flex", flex: 1, justifyContent: "flex-end"}}>
                        <Button 
                            variant="contained" 
                            style={{height: 30, marginRight: 20}} 
                            startIcon={<AddIcon/>}
                        >
                            New Friend
                        </Button>
                    </div>
                </div>
                <div className="sectionDivider"></div>
                {
                    friends.length ?
                    <FriendsDisplay user={user} windowDimensions={windowDimensions} friends={displayFriends} display={"pastDue"} /> :
                    <div className="noFriendsDiv">
                        <p className="noFriendsLabel">No friends yet.</p>
                    </div>
                }
            </div>
        </>
    );
}

export default HomePage;