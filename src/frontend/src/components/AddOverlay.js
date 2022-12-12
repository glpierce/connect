import React, { useState } from "react";
import Overlay from "react-overlay-component";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from "@mui/material";
import { textFieldTheme } from "../themes/theme";

function AddOverlay({ addToggle, setAddToggle }) {
    const [name, setName] = useState("")

    return(
        <Overlay configs={{animate: true}} isOpen={addToggle} closeOverlay={() => setAddToggle(false)}>
            <div className="overlayContainer">
                <h2 className="friendName">New Friend</h2>
                <div className="overlayDivider"/>
                <ThemeProvider theme={textFieldTheme}>
                    <TextField
                        required
                        id="name" 
                        label="Name" 
                        variant="standard"
                        value={name}
                        style={{width: 300, marginRight: 30, marginLeft: 30}}
                        color="primary"
                        onChange={e => setName(e.target.value)} 
                    />
                </ThemeProvider>
            </div>
        </Overlay>
    )
}

export default AddOverlay