import Header from './components/Header';
import {Box} from '@mui/material'

function MyGames():React.JSX.Element {
  return (
    <Box>
      <Header searchBarOnChange = {() => console.log("Edit Search Bar")}/>
    </Box>
  )
}

export default MyGames;