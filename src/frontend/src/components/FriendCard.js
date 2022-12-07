import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function FriendCard({ friend }) {
    const [hoverObj, setHoverObj] = useState(null);

    return(
        <Card variant="outlined" style={{backgroundColor: "#34425A", width: "500px", cursor: "pointer"}} className="projectCard" onMouseEnter={e => setHoverObj(friend.id)} onMouseLeave={e => setHoverObj(null)}>
            <CardContent>
                <h2>{friend.name}</h2>
                <p>Birthday: {friend.birthday}</p>
                <p>Last Messaged: {friend.last_messaged}</p>
            </CardContent>
        </Card>
    )
}

export default FriendCard;