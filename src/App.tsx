import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { auth } from "./../config/firebaseConfig"
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

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
    handleOnMount();
    handleIsLoggedIn();
  }, []);

  const handleIsLoggedIn = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        return navigate("/login");
      }
    })
  }
  async function handleOnMount(): Promise<void> {
    const response = await fetch(`${BASE_URL}`, {
      method: "GET",
    });
    const data = await response.json();
    // console.log(data);
  }

  return (
    <Box>
      <Header/>
      <ClickCountButton title={"Click button: " + count} onClick={() => setCount(count + 1)}/>
    </Box>
  )
}

export default App
