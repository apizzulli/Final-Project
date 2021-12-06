import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Typography } from '@mui/material';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { name,id,author,likes,dislikes,selected} = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);
            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function addLike(event){
       // event.stopPropagation();
        let id=event.currentTarget.id;
        console.log("addLike in ListCard to list with id "+id);
        store.addLike(id);
    }
    function addDislike(event){
        let id = event.currentTarget.id;
        store.addDislike(id);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    
    
    let cardElement =
        <div
            id={id}
            key={id}
            sx={{ p: 1, boxShadow: 1, color:'white',fontSize:'48pt', width:'100%'}}
            button
            style={{
                borderRadius: '10px',margin: '0 auto',left:'2.5%',
                right:'2.5%',width:'95%', height:'150px', backgroundColor:'#a0b4bb94', marginBottom:'15px'
            }}>
            <Box sx={{ float:'left',paddingTop: '2%', paddingLeft: '1%',pp: 1, color:'white', display: 'inline-block', fontSize:'25pt'}}>
                {name}
                <Typography style={{marginTop:'20px'}}>
                    Author: {author}
                </Typography>
            </Box>
            <Box style={{paddingTop:'2%',float:'right'}}>
                <Box style={{float:'left',marginRight:'550px',color:'white'}}>
                    <div style={{display:'inline-block',marginRight:'20px'}}>
                        <ThumbUpIcon id = {id} style={{fontSize:'40pt',display:'inline-block'}}onClick={addLike} ></ThumbUpIcon>
                        {likes}
                    </div>
                    <div style={{display:'inline-block'}}>
                        <ThumbDownIcon id={id}style={{fontSize:'40pt',display:'inline-block'}}onClick={addDislike}></ThumbDownIcon>
                        {dislikes}
                    </div>
                </Box>
                <IconButton onClick={(event) => {handleDeleteList(event, id)}} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'40pt', color: 'white'}} />
                </IconButton>
                <ExpandMoreIcon onClick={(event) => {handleLoadList(event, id)}}style={{float:'right',fontSize:'40pt',color:'white'}}></ExpandMoreIcon>
            </Box>
        </div>

   /* if (editActive) {
        cardElement =
            <div
                margin="normal"
                style={{color: 'white'}}
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }*/
    return (
        cardElement
    );
}

export default ListCard;