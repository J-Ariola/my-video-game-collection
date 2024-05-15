import { useEffect } from 'react';
import { GameDetails } from '../globals';
import './GameCardSmall.css';
import {
  Paper,
  Typography,
  Grid,
  Box,
  CardMedia,
  Container
} from "@mui/material";
import AddToCollectionsMenu from './AddToCollectionsMenu';

type Props = {
  title: string;
  imgURL?: string;
  guid: string;
}

const GameCardSmall = (props: Props):React.JSX.Element => {
  const {title, imgURL, guid} = props;
  return (
    <Grid item xs={4}>
      <Paper elevation={5}>
        <CardMedia component="img"
        image={imgURL}
        />
        <Box paddingX={1}>
        <Typography variant='h4'>{title}</Typography>
        <Container sx={{paddingBottom: "0.5em"}}>
          <AddToCollectionsMenu/>
        </Container>
        </Box>
      </Paper>
    </Grid>
  )
}

export default GameCardSmall;