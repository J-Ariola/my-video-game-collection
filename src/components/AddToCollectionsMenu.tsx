import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { auth } from "./../config/firebaseConfig"

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

const BASE_URL: string | null = import.meta.env.VITE_BASE_URL;

type Props = {
  guid: string;
  status: number;
};

export default function AddToCollectionsMenu(props: Props):React.JSX.Element {
  const { guid, status } = props;
  const [currentStatus, setCurrentStatus] = useState<number>(status);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  useEffect(() => {
    convertStatusToString(currentStatus)
  },[currentStatus])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUpdateGameEntry = async (oldStatus: number, newStatus: number) => {
    try {
      if (oldStatus === newStatus) return;
      
      if (!auth.currentUser) throw "no current user";
      const uid = auth.currentUser.uid;

      if (oldStatus === -1) {
        const body = { guid, status: newStatus } as {guid: string, status: number};
        const res = await fetch(`${BASE_URL}/user-entries/?uid=${uid}`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body),
        });
        if (res.status !== 201) throw "Did not create user entry successfully";
      } else {
        const body = { guid, status: newStatus } as {guid: string, status: number};
        const res = await fetch(`${BASE_URL}/user-entries/status/?uid=${uid}`, {
          method: "PATCH",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body),
        });
        if (res.status !== 200) throw "Did not patch user entry status successfully";
      }
      setCurrentStatus(newStatus);
    } catch (e) {
      console.error(e);
    } finally {
      setAnchorEl(null);
    }
  }

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
        {convertStatusToString(currentStatus)}
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
        <MenuItem divider={true} onClick={() => handleUpdateGameEntry(currentStatus, 1)}>Plan To Play</MenuItem>
        <MenuItem divider={true} onClick={() => handleUpdateGameEntry(currentStatus, 2)}>Playing</MenuItem>
        <MenuItem divider={true} onClick={() => handleUpdateGameEntry(currentStatus, 3)}>Completed</MenuItem>
        <MenuItem divider={true} onClick={() => handleUpdateGameEntry(currentStatus, 4)}>Full Completion</MenuItem>
        <MenuItem onClick={() => handleUpdateGameEntry(currentStatus, 5)}>Dropped</MenuItem>
      </Menu>
    </Box>
  );
}