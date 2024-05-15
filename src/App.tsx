import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { auth } from "./config/firebaseConfig"
import { onAuthStateChanged } from 'firebase/auth';
import { getCurrentUserIdToken } from './utils/firebaseUtils';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
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

  const navigate = useNavigate();

  useEffect(() => {
    handleIsLoggedIn();
  }, []);

  const handleIsLoggedIn = () : void => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsLoggedIn(false);
        return navigate("/login");
      }
      const userIdToken: string = await user.getIdToken(true);
      setIsLoggedIn(true);
      handleOnMount(userIdToken);
    })
  }

  const handleOnMount = async (idToken: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}`, {
          method: "GET",
          headers: {Authorization: 'Bearer ' + idToken}
        });
        const data = await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box>
      <Header/>
      <ClickCountButton title={"Click button: " + count} onClick={() => setCount(count + 1)}/>
      <Container>
        <Grid container spacing={5}>
          <GameCardSmall title="Pokemon Ruby/Sapphire" 
          imgURLs={{medium_url: "https://www.giantbomb.com/a/uploads/scale_medium/1/17172/1255532-pkmnrubysapphire.png"}}/>
          <GameCardSmall title="Pokemon Ruby/Sapphire" 
          imgURLs={{medium_url: "https://www.giantbomb.com/a/uploads/scale_medium/1/17172/1255532-pkmnrubysapphire.png"}}/>
          <GameCardSmall title="Pokemon Ruby/Sapphire" 
          imgURLs={{medium_url: "https://www.giantbomb.com/a/uploads/scale_medium/1/17172/1255532-pkmnrubysapphire.png"}}/>
          <GameCardSmall title="Pokemon Ruby/Sapphire" 
          imgURLs={{medium_url: "https://www.giantbomb.com/a/uploads/scale_medium/1/17172/1255532-pkmnrubysapphire.png"}}/>
        </Grid>
      </Container>
    </Box>
  )
}

export default App
