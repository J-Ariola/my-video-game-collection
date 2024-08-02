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
  deck?: string;
  guid: string;
  status: number;
}

const GameCardSmall = (props: Props):React.JSX.Element => {
  const {title, imgURL, status, guid} = props;
  return (
    <Grid item xs={4} sx={{height: "450px"}}>
      <Paper elevation={5} sx={{height: "100%"}}>
        <CardMedia component="img" sx={{height: "250px"}}
        image={imgURL}
        />
        <Box paddingX={1}>
          <Typography variant='h4' sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical"
          }}>{title}</Typography>
          {/* <Typography variant='subtitle1' sx={{overflow: "hidden", textOverflow: "ellipsis", lineClamp: "2"}}>{deck}</Typography> */}
          <Container sx={{paddingBottom: "0.5em"}}>
            <AddToCollectionsMenu guid={guid} status={status}/>
          </Container>
        </Box>
      </Paper>
    </Grid>
  )
}

export default GameCardSmall;