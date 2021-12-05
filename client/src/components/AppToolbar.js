
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import GroupIcon from '@mui/icons-material/Group';
import TextField from '@mui/material/TextField';
import { React, useContext, useState } from "react";

export default function AppToolbar(){
    const [highlighted, setHighlighted]=useState("");

    const homeClick=()=>{
        setHighlighted("userLists");
        console.log(highlighted);
    }
    const allClick=()=>{
        setHighlighted("allLists");
        console.log(highlighted);
    }
    const usersClick=()=>{
        setHighlighted("userLists");
        console.log(highlighted);

    }
    const communityClick=()=>{
        setHighlighted("communityLists");
        console.log(highlighted);

    }
    return(
        <Toolbar id="app-toolbar">
            <HomeIcon style = {{paddingRight:"1%", fontSize:"xx-large", color:"white",cursor: "pointer"}}
                onClick={homeClick}
            />
            <PersonIcon style= {{paddingRight:"1%", fontSize:"xx-large",color:"white",cursor: "pointer"}}
                onClick={allClick}
            />
            <GroupIcon style= {{paddingRight:"1%", fontSize:"xx-large",color:"white",cursor: "pointer"}}
                onClick={usersClick}
            />
            <AllInclusiveIcon style= {{paddingRight:"1%", fontSize:"xx-large",color:"white",cursor: "pointer"}}
                onClick={communityClick}
            />
            <TextField id="standard-basic" variant="standard" style={{fontSize:"xx-large",paddingBottom: ".6%",color:"white"}} 
            />
            <SortIcon style={{marginLeft: "auto",marginRight:"0",fontSize:"xx-large",color:"white",cursor: "pointer"}}
            />
        </Toolbar>
    );
}

