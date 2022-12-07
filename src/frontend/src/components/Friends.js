import React from "react";
import FriendCard from "./FriendCard";

function Friends({ user, friends }) {

    function generateFriendCards() {
        const cards = friends.map(friend => {
            return(<FriendCard friend={friend} />);
        });
        return(cards);
    }

    return(
        <div>
            {generateFriendCards()}
        </div>
    );
}

export default Friends;