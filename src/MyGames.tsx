import { useEffect, useState } from 'react';
import Header from './components/Header';
import {Box} from '@mui/material'
import { GameDetails, GameEntry } from './globals';
import { auth } from './config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const BASE_URL: string | null = import.meta.env.VITE_BASE_URL;

function MyGames():React.JSX.Element {
  const [userEntries, setUserEntries] = useState<Array<GameEntry>> ([]);
  const [userGameDetails, setUserGameDetails] = useState<Array<GameDetails>>([]);

  useEffect (() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        await handleUserEntries();
      }
    })
  },[]);
  
  useEffect (() => {
    if (!userEntries) return;

    handleUserGameDetails();
  },[userEntries]);

  async function handleUserEntries() {
    try {
      if (!auth.currentUser)throw "No logged in user";
      const { uid } = auth.currentUser;

      const response = await fetch(`${BASE_URL}/my-games?uid=${uid}`, {
        method: "GET",
      });

      if (response.status !== 200) {
        const errorData = await response.json() as {error: string};
        throw errorData.error;
      }

      const data = await response.json() as Array<GameEntry>;
      setUserEntries(data);
    } catch (e) {
      console.log(e)
    }
  }

  async function handleUserGameDetails() {
    try{
      //TODO: Get game details and merge status
    } catch(e) {
      console.error(e);
    }
  }


  return (
    <Box>
      <Header searchBarOnChange = {() => console.log("Edit Search Bar")}/>
    </Box>
  )
}

export default MyGames;