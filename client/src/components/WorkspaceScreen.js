import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Statusbar from './Statusbar.js';
import EditIcon from '@mui/icons-material/Edit';


/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);

    const saveList=()=>{
        store.updateCurrentList();
    }
    const publishList=()=>{
        store.deleteList(store.currentList);//Delete the top5list and publish it as a community list
        store.publishCommunityList();
        store.loadLists();
    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-workspace">
            <Statusbar></Statusbar>
            <div id="workspace-edit">
                <div id="edit-numbering">
                    <div className="item-number"><Typography variant="h3">1.</Typography></div>
                    <div className="item-number"><Typography variant="h3">2.</Typography></div>
                    <div className="item-number"><Typography variant="h3">3.</Typography></div>
                    <div className="item-number"><Typography variant="h3">4.</Typography></div>
                    <div className="item-number"><Typography variant="h3">5.</Typography></div>
                </div>
                {editItems}
            </div>
            <div id="save-and-publish-buttons">
                <Button style={{fontSize:'30pt',backgroundColor:'#a0b4bba8', width:'50%', height:'100%'}}onClick={saveList}variant="contained">Save</Button>
                <Button style={{fontSize:'30pt',backgroundColor:'#a0b4bba8', width:'50%', height:'100%'}}onClick={(id)=>publishList(id)}variant="contained">Publish</Button>
            </div>
        </div>
    )
}

export default WorkspaceScreen;