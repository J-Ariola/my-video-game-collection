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
  const {title, imgURL} = props;
  return (
    <Grid item xs={4} sx={{height: "500px"}}>
      <Paper elevation={5} sx={{height: "100%"}}>
        <CardMedia component="img" sx={{height: "250px"}}
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