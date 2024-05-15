import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { auth } from "./config/firebaseConfig"
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import { GameDetails } from './globals';
import GameCardSmall from './components/GameCardSmall';

const BASE_URL: string | null = import.meta.env.VITE_BASE_URL;

function App():React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [gameDetails, setGameDetails] = useState<GameDetails[]> ([]);
  const [searchText, setSearchText] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    handleIsLoggedIn();
  }, []);

  useEffect(() => {
    if (gameDetails) handleDisplayCards();
  }, [gameDetails]);

  useEffect(() => {
    if (searchText) handleSearchGameDetails(searchText);
  },[searchText])

  const handleSetSearchText = (text: string): void => {
    setSearchText(text);
  }

  const handleIsLoggedIn = () : void => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsLoggedIn(false);
        return navigate("/login");
      }
      const userIdToken: string = await user.getIdToken(true);
      setIsLoggedIn(true);
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

  const handleSearchGameDetails = async (searchText: string) => {
    // const searchedTitle = "nier"
    console.log("isLogged", isLoggedIn )
    try {
      if (!auth.currentUser) throw "no current user";
      const idToken: string = await auth.currentUser.getIdToken(true);
      const gameData = await fetch (`${BASE_URL}/game-details?title=${searchText}`, {
        method: "GET",
        headers: {Authorization: 'Bearer ' + idToken}
      });
      const convertedData:GameDetails[] = await gameData.json();
      setGameDetails(convertedData);
    } catch (e) {
      console.error(e);
    }
  }

  const handleDisplayCards = (): React.JSX.Element => {
    return (
      <Container sx={{marginTop: "40px"}}>
        <Grid container spacing={5}>
          { (gameDetails) ? (gameDetails.map((game, index) => {
              return <GameCardSmall title={game.name} imgURL={game.imgURL} key={index} guid={game.guid} />
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
