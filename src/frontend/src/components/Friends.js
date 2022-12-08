import React from "react";
import FriendCard from "./FriendCard";

function Friends({ user, friends }) {

    function generateFriendCards() {
        const cards = friends.map(friend => {
            return(<FriendCard key={friend.id} friend={friend} />);
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