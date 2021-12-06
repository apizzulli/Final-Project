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
    let name;
    let id;
    let author;
    let likes;
    let dislikes;
    const { store } = useContext(GlobalStoreContext);

   useEffect(() => {
        store.loadIdNamePairs();
    }, []);

   /* useEffect(() => {
        store.loadLists();
    }, []);*/

    function handleCreateNewList() {
        store.createNewList();
    }
    /*function setList(){
        let lists=store.lists;
    }*/
    let listCard = "";
    if (store) {
        store.lists.map((list) => (
            name=list.name,
            id=list._id
        ))
        let i = 0;
        for(i=0;i<store.lists.length;i++){
            if(store.lists[i]._id==id){
                author=store.lists[i].owner;
                likes=store.lists[i].likes;
                dislikes=store.lists[i].dislikes;
            }

        }
        listCard=
            <div id="listcard-container" style={{width:'100%',height:'80%'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        id={id}
                        name={name}
                        author={author}
                        likes={likes}
                        dislikes={dislikes}
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
    }
    return (
            <div id="lists-screen">
                {
                    listCard
                }
            </div>
            
        )
}

export default ListsScreen;