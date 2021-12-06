import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom'
import { Typography } from '@mui/material';

export default function WelcomeScreen() {
    const history = useHistory();
    const loginClick=()=>{
        history.push('/login');
    }
    const registerClick=()=>{
        history.push('/register');
    }
    const guestClick=()=>{
        history.push('./')
    }
    return (
        <div id="welcome-screen">
            Top 5 Lister
            <div id="welcome-button-container">
                <br></br>
                    <div id="welcome-button"><AssignmentIndIcon fontSize="17%" onClick={loginClick}></AssignmentIndIcon>    Sign In</div>
                    <div id="welcome-button"><PersonAddIcon fontSize="17%" onClick={registerClick}></PersonAddIcon>    Create an account</div>
                    <div id="welcome-button"><AccessTimeIcon fontSize="17%"onClick={guestClick}></AccessTimeIcon>  Continue as guest</div>
                    <Typography style={{paddingTop: "22%"}}>
                        Developed by Anthony Pizzulli.
                    </Typography>
            </div>
        </div>
    )
}


