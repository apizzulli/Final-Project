import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const ListsScreen = () => {
    let list;
    let name;
    let id;
    let author;
    let likes;
    let dislikes;
    let date;
    const { store } = useContext(GlobalStoreContext);

   /*useEffect(() => {
        store.loadIdNamePairs();
    }, []);*/

   useEffect(() => {
        store.loadLists();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if(store.lists){
        console.log("line 49, listsScreen: "+store.lists.size);
        console.log(store.lists.size);
       // console.log(store.lists[1].name);
    }
        listCard=
        <div id="listcard-container" style={{width:'100%',height:'80%'}}>
            {
               /* store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))*/
                store.lists.map((list) => (
                    <ListCard
                        list={list}
                        id={list._id}
                        name={list.name}
                        author={list.authorx}
                        likes={list.likes}
                        dislikes={list.dislikes}
                        date={list.date}
                        selected={false}
                    />
                ))  
            }
            <div id="add-list-footer" style={{display:'block',marginLeft:'auto',marginRight:'auto',marginTop:'395px'}}>
                <Fab 
                    color="#3885a3" 
                    aria-label="add"
                    id="add-list-button"
                    style={{marginRight:'10px'}}
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                    <Typography style={{color:'white',fontSize:'35pt',leftMargin:'5px'}}variant="h2">Your Lists</Typography>
            </div>
        </div>;
    
        
    return (
            <div id="lists-screen">
                {
                    listCard
                }
            </div>
        )
}

export default ListsScreen;