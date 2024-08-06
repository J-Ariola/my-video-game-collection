import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameDetails } from "../globals";
const BASE_URL: string | null = import.meta.env.VITE_BASE_URL;

function Games():React.JSX.Element {
  const { guid } = useParams();
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  console.log(guid);
  
  useEffect(() => {
    if (guid) handleDisplayGameDetails(guid);
  }, [guid]);

  async function handleDisplayGameDetails(guid: string) {
    const response = await fetch(`${BASE_URL}/game-details/${guid}`);
    const data = (await response.json()) as GameDetails;
    setGameDetails(data);
  }
  return (
    <Box>
      {gameDetails ? 
      <Container>
        <Typography variant="h3">{gameDetails.name}</Typography> 
        <img src={gameDetails.imgURL ? gameDetails.imgURL : ""}/>
        <Typography variant="body1">{gameDetails.deck}</Typography>
        <Typography variant="body2">{new Date(gameDetails.original_release_date as unknown as string).toISOString().split("T")[0]}</Typography>
      </Container>:
      <></>}
    </Box>
  );
    
}

export default Games;