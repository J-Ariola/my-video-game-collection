import { useEffect } from 'react';
import { GameDetails } from '../globals';
import './GameCardSmall.css';
import { Paper,
  Typography,
  Grid,
  Box,
  CardMedia
} from "@mui/material";

type Props = {
  title: string;
  imgURL?: string;
}

const GameCardSmall = (props: Props):React.JSX.Element => {
  const {title, imgURL} = props;
  useEffect(() => {
    console.log(imgURL);
  }, [imgURL])
  return (
    <Grid item xs={4}>
      <Paper elevation={5}>
        <CardMedia component="img"
        image={imgURL}
        />
        <Box paddingX={1}>
        <Typography variant='h4'>{title}</Typography>
        </Box>
      </Paper>
    </Grid>
  )
}

export default GameCardSmall;