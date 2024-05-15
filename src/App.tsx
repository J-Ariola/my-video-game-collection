import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { auth } from "./config/firebaseConfig"
import { onAuthStateChanged } from 'firebase/auth';
import { getCurrentUserIdToken } from './utils/firebaseUtils';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import { GameDetails } from './globals';
import GameCardSmall from './components/GameCardSmall';

const BASE_URL: string | null = import.meta.env.VITE_BASE_URL;

type Props = {
  title:string;
  onClick():void;
}

const ClickCountButton = ({ title, onClick }: Props): React.JSX.Element => {
  return (
    <button onClick={onClick}>
    {title}
    </button>
  )
}

function App():React.JSX.Element {
  const [count, setCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [gameDetails, setGameDetails] = useState<GameDetails[]> ([]);
  const [searchText, setSearchText] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    handleIsLoggedIn();
  }, []);

  useEffect(() => {
    handleDisplayCards();
  }, [gameDetails]);

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
      await handleSearchGameDetails();
    })
  }

  const handleOnMount = async (idToken: string): Promise<void> => {
    try {
      const response: Response  = await fetch(`${BASE_URL}`, {
          method: "GET",
          headers: {Authorization: 'Bearer ' + idToken}
        });
        const data = await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  const handleSearchGameDetails = async () => {
    const searchedTitle = "nier"
    const gameData = await fetch (`${BASE_URL}/game-details?title=${searchedTitle}`, {
      method: "GET",
    });
    const convertedData:GameDetails[] = await gameData.json();
    setGameDetails(convertedData);
  }

  const handleDisplayCards = (): React.JSX.Element => {
    console.table(gameDetails);
    return (
      <Container>
        <Grid container spacing={5}>
          {
            gameDetails.map((game, index) => {
              return <GameCardSmall title={game.name} imgURL={game.imgURL} key={index} />
            })
          }
        </Grid>
      </Container>
    )
  }

  return (
    <Box>
      <Header searchBarOnChange = {handleSetSearchText}/>
      <ClickCountButton title={"Click button: " + count} onClick={() => setCount(count + 1)}/>
      {handleDisplayCards()}
    </Box>
  )
}

export default App
