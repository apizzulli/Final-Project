import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useHistory } from 'react-router-dom'
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
    const [isExpanded, setExpanded] = useState(false);
    const [text, setText] = useState("");
    const { list, name,id,author,likes,dislikes,date,selected} = props;
    const history = useHistory();
    
    function handleExpandList(event, id) {
        setExpanded(!isExpanded);
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

    function handleHover(event){
        event.target.style.background='#768b9456';
    }
    function hoverReset(event){
        event.target.style.background='none';
    }
    function editList(listId){
        store.setCurrentList(listId);
    }
    let likesBox;
    let expandButton;
    let commentsBox;
    if(isExpanded){
        expandButton=
            <ExpandLessIcon onClick={(event) => {handleExpandList(event, id)}}style={{float:'right',fontSize:'40pt',color:'white'}}>
            </ExpandLessIcon>;
    }
    else{
        expandButton=<ExpandMoreIcon onClick={(event) => {handleExpandList(event, id)}}style={{float:'right',fontSize:'40pt',color:'white'}}>
        </ExpandMoreIcon>;
    }
    if(!(list.likes===undefined)){//If the list is published, it will have a 'likes' attribute, so show the buttons.
        likesBox=<Box style={{paddingTop:'2%',float:'right'}}>
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
                    {expandButton}
                </Box>;
        commentsBox=<div style={{width:'40%',float:'right',height:'320px',marginTop:'1%'}}>
                        COMMENTS
                    </div>;
    }
    else{//Otherwise, the list is not published, so it does not have likes/dislikes or comments.
        likesBox=<Box style={{paddingTop:'2%',float:'right'}}>
                    <IconButton onClick={(event) => {handleDeleteList(event, id)}} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'40pt', color: 'white'}} />
                    </IconButton>
                    {expandButton}
                </Box>;
        commentsBox="";
    }
    let listCard;
    if(isExpanded){
        listCard= 
            <div
                id={list._id}
                key={id}
                sx={{ p: 1, boxShadow: 1, color:'white',fontSize:'48pt', width:'100%'}}
                button
                style={{
                    borderRadius: '10px',margin: '0 auto',left:'2.5%',
                    right:'2.5%',width:'95%', height:'550px', backgroundColor:'#a0b4bb94', marginBottom:'15px'
                }}>
                <Box sx={{ float:'left',paddingTop: '2%', paddingLeft: '1%',pp: 1, color:'white', display: 'inline-block', fontSize:'25pt'}}>
                    {name}
                    <Typography style={{marginTop:'20px'}}>
                        Author: {list.owner}
                    </Typography>
                    <Typography>
                        Published: {new Date(date).toLocaleDateString()}
                    </Typography>
                </Box>
                {likesBox}
                <br></br>
                <div style={{borderRadius: '10px',clear:'both',float:'left', width: '50%', height:'320px',marginTop:'1%',paddingTop:'1%',paddingBottom:'1%',marginLeft:'1%', backgroundColor:'#5f9cb4'}}>
                    <EditIcon onClick={(event)=>{editList(list._id)}}onMouseOver={handleHover}onMouseLeave={hoverReset}style={{color:'white', float:'right',marginRight:'2%', fontSize:'50px'}}></EditIcon>
                    <div style={{paddingLeft:'1%',height:'20%',color:'white', fontSize:'50px'}}>1. {list.items[0]}</div>
                    <div style={{paddingLeft:'1%',height:'20%',color:'white', fontSize:'50px'}}>2. {list.items[1]}</div>
                    <div style={{paddingLeft:'1%',height:'20%',color:'white', fontSize:'50px'}}>3. {list.items[2]}</div>
                    <div style={{paddingLeft:'1%',height:'20%',color:'white', fontSize:'50px'}}>4. {list.items[3]}</div>
                    <div style={{paddingLeft:'1%',height:'20%',color:'white', fontSize:'50px'}}>5. {list.items[4]}</div>
                </div>
            </div>
    }
    else{
       listCard= <div
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
                        Author: {list.owner}
                    </Typography>
                    <Typography>
                    Published: {new Date(date).toLocaleDateString()}
                    </Typography>
                </Box>
                {likesBox}
            </div>
    }
        return (
            listCard
        )
}

export default ListCard;