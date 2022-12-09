import React from "react";
import FriendCard from "./FriendCard";

function PastDue({ user, pdFriends }) {
    function generateFriendCards() {
        const cards = pdFriends.map(friend => {
            return(<FriendCard key={friend.id} friend={friend} />);
        });
        return(cards);
    }
    return( 
        <div>
            <h2>Past Due</h2>
            {generateFriendCards()}
        </div>
    );
}

export default PastDue;