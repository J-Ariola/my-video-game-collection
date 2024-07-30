import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
// import { auth } from "./../config/firebaseConfig"
import useGameEntryStatus from '../custom_hooks/useGameEntryStatus';

const convertStatusToString = (status: number) : string => {
  switch(status){
    case 1: 
      return "Plan To Play";
    case 2: 
      return "Playing";
    case 3: 
      return "Completed";
    case 4: 
      return "Full Completion";
    case 5: 
      return "Dropped";
    default:
      return "Add To Collection";
  }
};

type Props = {
  guid: string;
  status: number;
};

export default function AddToCollectionsMenu(props: Props):React.JSX.Element {
  const { status } = props;
  const { state, 
    setStatusToPlanToPlay,
    setStatusToPlaying,
    setStatusToCompleted,
    setStatusToFullCompletion,
    setStatusToDropped,
   } = useGameEntryStatus({ status });
  // const [currentStatus, setCurrentStatus] = useState<number>(status);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    convertStatusToString(state.status)
  },[state.status])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  // const handleUpdateGameEntry = async (oldStatus: number, newStatus: number) => {
  //   try {
  //     if (!auth.currentUser) throw "no current user";
  //     const idToken: string = await auth.currentUser.getIdToken(true);

  //     if (oldStatus === -1) {
  //       console.log("Add entry to database", idToken);
  //     } else {
  //       console.log("Update entry to database", idToken);
  //     }
  //     setCurrentStatus(newStatus);
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setAnchorEl(null);
  //   }
  // }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        variant='contained'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {convertStatusToString(state.status)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem divider={true} onClick={setStatusToPlanToPlay}>Plan To Play</MenuItem>
        <MenuItem divider={true} onClick={setStatusToPlaying}>Playing</MenuItem>
        <MenuItem divider={true} onClick={setStatusToCompleted}>Completed</MenuItem>
        <MenuItem divider={true} onClick={setStatusToFullCompletion}>Full Completion</MenuItem>
        <MenuItem onClick={setStatusToDropped}>Dropped</MenuItem>
      </Menu>
    </Box>
  );
}