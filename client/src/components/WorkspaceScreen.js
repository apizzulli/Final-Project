import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Statusbar from './Statusbar.js';

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
        store.publishCommunityList();
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
                <div id="save-and-publish-buttons">
                    <Box>
                        <Button style={{backgroundColor:'#5f9cb4'}}onClick={saveList}variant="contained">Save</Button>
                        <Button style={{backgroundColor:'#5f9cb4'}}onClick={publishList}variant="contained">Publish</Button>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceScreen;