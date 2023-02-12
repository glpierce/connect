import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


function FriendCard({ friend }) {
    const [hoverObj, setHoverObj] = useState(null);

    function getFormattedDate(date) {
        const year = date.getFullYear().toString();
        const month = (1 + date.getMonth()).toString();
        const day = date.getDate().toString();
        return(month + '/' + day + '/' + year);
      }

    function getFrequencyLabel(freq) {
        switch(freq) {
            case 365:
                return("Yearly");
            case 182:
                return("Biannually");
            case 91:
                return("Quarterly");
            case 30:
                return("Monthly");
            case 14:
                return("Bimonthly");
            case 7:
                return("Weekly");
            default:
                return(`Every ${freq} days`)
        }
    }

    return(
        <Card 
            variant="outlined" 
            style={{width: 225, height: 165, color: "white", backgroundColor: "#34425A", marginTop: 10, marginBottom: 10}} 
            onMouseEnter={e => setHoverObj(friend.id)} 
            onMouseLeave={e => setHoverObj(null)}
        >
            <h2 className="friendName">{friend.name}</h2>
            <div className="cardDivider"/>
            <CardContent style={{paddingTop: 6}}>
                <div className="friendDataContainer">
                    <div className="dataLabelsContainer">
                        <p>Birthday:</p>
                        <p>Last Contact:</p>
                        <p>Frequency:</p>
                    </div>
                    <div className="dataValuesContainer">
                        <p>{friend.birthdate}</p>
                        <p>{friend.last_messaged}</p>
                        <p>{getFrequencyLabel(friend.frequency)}</p>
                    </div>
                </div>
            </CardContent>
            <div className="cardButtonContainer">
                <Button variant="contained">Connected!</Button>
                <Button variant="contained">Edit</Button>
            </div>
        </Card>
    )
}

export default FriendCard;
