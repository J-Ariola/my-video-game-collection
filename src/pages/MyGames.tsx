import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Box, Container, Grid } from '@mui/material';
import { GameDetails, GameEntry } from '../globals';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import GameCardSmall from '../components/GameCardSmall';

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

  useEffect (() => {
    if (!userGameDetails) return;

    console.log(userGameDetails);
  }, [userGameDetails]);

  async function handleUserEntries() {
    try {
      if (!auth.currentUser)throw "No logged in user";
      const { uid } = auth.currentUser;

      const response = await fetch(`${BASE_URL}/user-entries?uid=${uid}`, {
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
      await Promise.all( userEntries.map( entry => {
        return fetch(`${BASE_URL}/game-details/${entry.guid}`, {
          method: "GET"
        });
      }))
      .then( responses => {
        return Promise.all(responses.map( res => res.json() as unknown as GameDetails));
      })
      .then( gameData => {
        return setUserGameDetails(gameData.sort( (a, b) => {
          const gameNameA = a.name.toUpperCase();
          const gameNameB = b.name.toUpperCase();
          if (gameNameA < gameNameB) return -1;
          if (gameNameA > gameNameB) return 1;
          return 0;
        }));
      })
    } catch(e) {
      console.error(e);
    }
  }

  function GetGameStatus(guid: string, userEntries: Array<GameEntry>):number {
    const index = userEntries.findIndex( entry => entry.guid === guid);
    return userEntries[index].status | 0;
  }

  function handleDisplayCards(): React.JSX.Element {
    return (
      <Container sx={{marginTop: "40px"}}>
        <Grid container spacing={5}>
          { (userGameDetails) ? (userGameDetails.map((game, index) => {
              return <GameCardSmall status={GetGameStatus(game.guid, userEntries)} title={game.name} imgURL={game.imgURL} deck={game.deck} key={index} guid={game.guid} />
            })
           ) : (<></>)
          }
        </Grid>
      </Container>
    )
  }


  return (
    <Box>
      <Header searchBarOnChange = {() => console.log("Edit Search Bar")}/>
      {handleDisplayCards()}
    </Box>
  )
}

export default MyGames;