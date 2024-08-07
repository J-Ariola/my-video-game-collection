import { useState, useEffect } from 'react';
import './App.css';
import Header from '../components/Header';
import { auth } from "../config/firebaseConfig"
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import { GameDetails } from '../globals';
import GameCardSmall from '../components/GameCardSmall';

const BASE_URL: string | null = import.meta.env.VITE_BASE_URL;
const searchDelayTime: number = 1000;

function App():React.JSX.Element {
  const [gameDetails, setGameDetails] = useState<GameDetails[]> ([]);
  const [searchText, setSearchText] = useState<string>("");
  const [viewedUserGameEntries, setViewedUserGameEntries] = useState<number[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    handleIsLoggedIn();
  }, []);

  useEffect(() => {
    if (gameDetails && viewedUserGameEntries) handleDisplayCards();    
  }, [gameDetails, viewedUserGameEntries]);

  useEffect(() => {
    const delayDebounceId = setTimeout(() => {
      handleSearchGameDetails(searchText);
    }, searchDelayTime);

    return () => {
      clearTimeout(delayDebounceId);
    }
  },[searchText])

  const handleSetSearchText = (text: string): void => {
    setSearchText(text);
  }

  const handleIsLoggedIn = () : void => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return navigate("/login");
      }
      const userIdToken: string = await user.getIdToken(true);
      handleOnMount(userIdToken);
      await handleSearchGameDetails("");
    })
  }

  const handleOnMount = async (idToken: string): Promise<void> => {
    try {
      const response: Response  = await fetch(`${BASE_URL}`, {
          method: "GET",
          headers: {Authorization: 'Bearer ' + idToken}
        });
        await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  const handleViewedUserGameEntries = async (gameDetails: GameDetails[]) => {
    try{
      if (!auth.currentUser) throw "no current user";
        const { uid } = auth.currentUser;
        await Promise.all(gameDetails.map((gameDetail) => {
          return fetch(`${BASE_URL}/user-entries/${gameDetail.guid}?uid=${uid}`, {
            method: "GET",
          })
        }))
        .then((responses) => {
          return Promise.all(responses.map((res) => {
            if (res.status === 200) return res.json();
            else return null;
            }))
        })
        .then((e) => {
          return setViewedUserGameEntries(e.map( (entry) => {
            if (!entry) return -1;
            return (entry.status) ? entry.status : -1;
          }));
      });
      return;
    } catch (e) {
      console.error(e);
    }
  }

  const handleSearchGameDetails = async (searchText: string) => {
    try {
      if (!auth.currentUser) throw "no current user";
      const idToken: string = await auth.currentUser.getIdToken(true);
      const gameData = await fetch (`${BASE_URL}/game-details?title=${searchText}`, {
        method: "GET",
        headers: {Authorization: 'Bearer ' + idToken}
      });
      const convertedData:GameDetails[] = await gameData.json();
      await handleViewedUserGameEntries(convertedData);
      setGameDetails(convertedData);
    } catch (e) {
      console.error(e);
    }
  }

  const handleDisplayCards = (): React.JSX.Element => {
    return (
      <Container sx={{marginTop: "40px"}}>
        <Grid container spacing={5} columns={{sx: 4, md: 12}}>
          { (gameDetails) ? (gameDetails.map((game, index) => {
              return <GameCardSmall status={viewedUserGameEntries[index]} title={game.name} imgURL={game.imgURL} deck={game.deck} key={index} guid={game.guid} />
            })
           ) : (<></>)
          }
        </Grid>
      </Container>
    )
  }

  return (
    <Box>
      <Header searchBarOnChange = {handleSetSearchText}/>
      {handleDisplayCards()}
    </Box>
  )
}

export default App
