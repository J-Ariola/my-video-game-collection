import { Box, Grid, Typography } from "@mui/material";
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
      <Grid container>
        <Typography variant="h3">{gameDetails.name}</Typography> 
          <Box sx={{display: "flex"}}>
            <Box sx={{display: "flex", width: "14rem", overflow: "hidden"}}>
              <img style={{width: "100%"}} src={gameDetails.imgURL ? gameDetails.imgURL : ""}/>
            </Box>
            <Typography variant="body1" noWrap={false}>{gameDetails.deck}</Typography>
            <Typography variant="body2">{new Date(gameDetails.original_release_date as unknown as string).toISOString().split("T")[0]}</Typography>
          </Box>
      </Grid>:
      <></>}
    </Box>
  );
    
}

export default Games;