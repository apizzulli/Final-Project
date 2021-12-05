import { useContext, useState } from 'react'
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
    const { idNamePair, selected } = props;

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
        console.log("addLike in ListCard");
        event.stopPropagation();
        let _id=event.target.id;
        store.addLike(_id);
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
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ p: 1, boxShadow: 1,borderRadius: 1, color:'white',fontSize:'48pt'}}
            button
            style={{
                fontSize: '48pt', width:'100%'
            }}>
            <Box sx={{ paddingTop: '2%', paddingLeft: '1%',pp: 1, color:'white', display: 'inline-block'}}>
                {idNamePair.name}</Box>
            <Box style={{float: 'right', marginRight: '20px'}}>
                <ThumbUpIcon onClick={addLike} style={{fontSize: '40pt', color:'white', display: 'in-line block'}}></ThumbUpIcon>
                <ThumbDownIcon style={{fontSize: '40pt', color: 'white',marginRight:'100px'}}></ThumbDownIcon>
                <IconButton style={{color:'white'}}onClick={(event) => {
                    handleDeleteList(event, idNamePair._id)
                }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'35pt', color: 'white'}} />
                </IconButton>
                <ExpandMoreIcon onClick={(event) => {handleLoadList(event, idNamePair._id)}}style={{fontSize:'30pt',color:'white'}}></ExpandMoreIcon>
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