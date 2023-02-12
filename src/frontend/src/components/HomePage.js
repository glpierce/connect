import React, { useState, useEffect } from "react";
import FriendsHeader from "./FriendsHeader";
import FriendsDisplay from "./FriendsDisplay";
import AddOverlay from "./AddOverlay";

function HomePage({ user, windowDimensions }) {
  const [friends, setFriends] = useState([]);
  const [pdFriends, setPDFriends] = useState(
    friends.filter((friend) => friend.past_due)
  );
  const [displayFriends, setDisplayFriends] = useState(friends);
  const [searchQuery, setSearchQuery] = useState("");
  const [addToggle, setAddToggle] = useState(false);

  useEffect(() => {
    getFriends();
  }, []);

  async function getFriends() {
    const response = await fetch(
      `http://localhost:4000/get_friends/${user.id}`
    );
    const data = await response.json();
    console.log(data);
    setFriends(data);
    setDisplayFriends(data);
    setPDFriends(data.filter((friend) => friend.past_due));
  }

  useEffect(() => {
    if (!searchQuery) {
      setDisplayFriends(friends);
    } else {
      setDisplayFriends(
        friends.filter((friend) =>
          friend.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, friends]);

  return (
    <>
      <div>
        <h1 className="pastDueHeader">Past Due</h1>
        <div className="sectionDivider"></div>
        {pdFriends.length ? (
          <FriendsDisplay
            user={user}
            windowDimensions={windowDimensions}
            friends={pdFriends}
            display={"pastDue"}
          />
        ) : (
          <div className="noFriendsDiv">
            <p className="noFriendsLabel">No past due friends.</p>
          </div>
        )}
      </div>
      <div>
        <FriendsHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setAddToggle={setAddToggle}
        />
        <div className="sectionDivider"></div>
        {friends.length ? (
          <FriendsDisplay
            user={user}
            windowDimensions={windowDimensions}
            friends={displayFriends}
            display={"pastDue"}
          />
        ) : (
          <div className="noFriendsDiv">
            <p className="noFriendsLabel">No friends yet.</p>
          </div>
        )}
      </div>
      <AddOverlay
        addToggle={addToggle}
        setAddToggle={setAddToggle}
        user={user}
      />
    </>
  );
}

export default HomePage;

// [
//     {
//         id: 1,
//         user_id: 1,
//         name: "Yousef",
//         birthdate: "11/25",
//         last_messaged: new Date(),
//         frequency: 7,
//         past_due: false
//     },
//     {
//         id: 2,
//         user_id: 1,
//         name: "Shroomsef",
//         birthdate: "11/25",
//         last_messaged: new Date(),
//         frequency: 182,
//         past_due: true
//     },
//     {
//         id: 3,
//         user_id: 1,
//         name: "Ted",
//         birthdate: "3/17",
//         last_messaged: new Date(),
//         frequency: 30,
//         past_due: false
//     },
//     {
//         id: 4,
//         user_id: 1,
//         name: "Jill",
//         birthdate: "4/18",
//         last_messaged: new Date(),
//         frequency: 365,
//         past_due: false
//     },
//     {
//         id: 5,
//         user_id: 1,
//         name: "Dan",
//         birthdate: "9/13",
//         last_messaged: new Date(),
//         frequency: 7,
//         past_due: true
//     },
//     {
//         id: 6,
//         user_id: 1,
//         name: "Num 6",
//         birthdate: "2/11",
//         last_messaged: new Date(),
//         frequency: 14,
//         past_due: false
//     },
//     {
//         id: 7,
//         user_id: 1,
//         name: "Robert",
//         birthdate: "9/13",
//         last_messaged: new Date(),
//         frequency: 91,
//         past_due: true
//     },
//     {
//         id: 8,
//         user_id: 1,
//         name: "Last",
//         birthdate: "2/11",
//         last_messaged: new Date(),
//         frequency: 30,
//         past_due: true
//     },
// ]
