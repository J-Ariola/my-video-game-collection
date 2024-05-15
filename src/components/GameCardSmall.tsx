import './GameCardSmall.css';
import { Paper,
  Typography,
  Grid,
  Box
} from "@mui/material";

// interface imageURLs {
//   'medium_url'?: string,
// }

type Props = {
  title: string,
  imgURLs?: {medium_url?: string},
  deck?: string,
  platforms?: Object[],
}

const GameCardSmall = (props: Props):React.JSX.Element => {
  const { title, imgURLs, deck, platforms } = props;
  const imageSrc: string | undefined = (imgURLs) ? imgURLs.medium_url : "";

  return (
    <Grid item xs={4}>
      <Paper elevation={5}>
        <img className="cardImage" src={imageSrc}/>
        <Box paddingX={1}>
        <Typography variant='h4'>{title}</Typography>
        </Box>
      </Paper>
    </Grid>
  )
}

export default GameCardSmall;