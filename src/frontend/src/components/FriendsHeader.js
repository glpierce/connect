import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from "@mui/material/Button";


function FriendsHeader({ searchQuery, setSearchQuery, setAddToggle }) {
    return(
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
                    onClick={() => setAddToggle(true)}
                >
                    New Friend
                </Button>
            </div>
        </div>
    )
}

export default FriendsHeader;