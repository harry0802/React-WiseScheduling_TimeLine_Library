import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import classes from './index.module.scss'
import { useUpdateValuesMutation } from 'api/housesApi';
import React, { useState, useEffect   } from 'react';


export default function SelectSmall(props) {

  // console.log('fanValues777777777',props.fanValues)
  // console.log('1231231231321',props.fanValues.value)
  const numSeep = props.fanValues[0].value*1
  // const stringSeep = Math.round(numSeep).toString(); // Round to the nearest integer
  const [speed, setSpeed] = useState(numSeep);
  const [updateValues, { isSuccess: isUpdateSuccess }] = useUpdateValuesMutation();

  const handleChange = (event) => {
    setSpeed(event.target.value);
    updateValues({
      id: props.fanValues[0].id,
      value: + event.target.value// Ensure it's a string
    });


  };

  return (
    <FormControl sx={{ minWidth: 110 ,color:'#fff' }} size="small">
      <InputLabel id="demo-select-small-label" sx={{color:'#fff'}}>轉速 % 數</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={speed}
        label="Speed"
        onChange={handleChange}
        sx={{color:'#fff'}}
      >
        <MenuItem sx={{color:'#fff'}} value={10}>10</MenuItem>
        <MenuItem sx={{color:'#fff'}} value={20}>20</MenuItem>
        <MenuItem sx={{color:'#fff'}} value={30}>30</MenuItem>
        <MenuItem sx={{color:'#fff'}} value={40}>40</MenuItem>
        <MenuItem sx={{color:'#fff'}} value={50}>50</MenuItem>
        <MenuItem sx={{color:'#fff'}} value={60}>60</MenuItem>
        <MenuItem sx={{color:'#fff'}} value={70}>70</MenuItem>
        <MenuItem sx={{color:'#fff'}} value={80}>80</MenuItem>
        <MenuItem sx={{color:'#fff'}} value={90}>90</MenuItem>
        <MenuItem sx={{color:'#fff'}} value={100}>100</MenuItem>
      </Select>
    </FormControl>
  );
}