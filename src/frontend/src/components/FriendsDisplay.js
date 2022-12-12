import React from "react";
import FriendCard from "./FriendCard";

function FriendsDisplay({ user, windowDimensions, friends, display }) {

    function generateFriendDisplay() {
        const cardsPerRow =  Math.floor(windowDimensions.innerWidth / 241);
        const numRows = Math.ceil(friends.length / cardsPerRow);
        const cards = friends.map(friend => {
            return(<FriendCard key={friend.id} friend={friend} />);
        });
        const display = Array.apply(null, Array(numRows)).map(row => {
            if (numRows > 1) {
                return(
                    <div className="friendsRow">
                        {cards.length > cardsPerRow ? cards.splice(0, cardsPerRow) : lastRow(cards, cardsPerRow)}
                    </div>
                )
            } else {
                return(
                    <div className="friendsRow">
                        {cards}
                    </div>
                )
            }
            
        })
        return(display);
    }

    function lastRow(cards, cardsPerRow) {
        const remaining = cards.length;
        for (let i = 0; i < cardsPerRow - remaining; i++) {
            cards.push(<div style={{width: 227, height: 180, margin: 8}}/>)
        }
        return(cards);
    }

    return(
        <div className="rowContainer">
            {generateFriendDisplay()}
        </div>
    );
}

export default FriendsDisplay;