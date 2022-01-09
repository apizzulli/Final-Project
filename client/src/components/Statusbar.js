import { useContext } from 'react'
import {useState} from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive]=useState(false);
    const [text,setText]=useState("");
    
    function toggleEdit(event){
        setEditActive(!editActive);
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.changeListName(store.currentList._id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event){
        setText(event.target.value);
    }
    let titleText;
    if (store.currentList){
        titleText=store.currentList.name;
    }
    let title;
    if(editActive){
        title=
        <TextField
                margin="normal"
                required
                autoComplete="Top 5 List Title"
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={titleText}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />;
    }
    else{
        title=
        <div id="top5-statusbar">
            <EditIcon onClick={toggleEdit} style={{fontSize:'30pt', color:'white'}}  />
            <Typography variant="h4">{titleText}</Typography>
        </div>;
    }
    return (
        title
    );
}

export default Statusbar;