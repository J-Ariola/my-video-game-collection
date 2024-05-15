import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function AddToCollectionsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant='contained'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Add To Collections
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
        <MenuItem divider={true} onClick={handleClose}>Plan To Play</MenuItem>
        <MenuItem divider={true} onClick={handleClose}>Playing</MenuItem>
        <MenuItem divider={true} onClick={handleClose}>Completed</MenuItem>
        <MenuItem divider={true} onClick={handleClose}>Full Completion</MenuItem>
        <MenuItem onClick={handleClose}>Dropped</MenuItem>
      </Menu>
    </div>
  );
}