import { useContext } from 'react'
import ListsScreen from './ListsScreen'
import WelcomeScreen from './WelcomeScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn)
        return <ListsScreen />
    else
        return <WelcomeScreen />
}