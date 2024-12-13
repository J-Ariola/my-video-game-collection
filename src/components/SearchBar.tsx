import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(){
  return (<Box
    >

    <TextField
      placeholder="Search"
      size="small"
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(96 165 250)', 
          },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon/>
          </InputAdornment>
        )
      }}
      />

  </Box>)
}