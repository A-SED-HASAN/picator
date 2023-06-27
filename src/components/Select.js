import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { TripOriginOutlinedIcon } from '../assets/icon'
import { useGlobalContext } from '../context/context'
const SelectC = () => {
  const { color, setColor } = useGlobalContext()

  return (
    <FormControl variant='standard' className='select'>
      <InputLabel id='color-change'>Color</InputLabel>
      <Select
        labelId='color-change'
       
        value={color}
        onChange={(e) => setColor(e.target.value)}
        label='Color'>
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        <MenuItem value='black_and_white'>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{ paddingRight: '5px', color: 'grey' }}
          />
          black and white
        </MenuItem>
        <MenuItem value='black'>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{ paddingRight: '5px', color: 'black' }}
          />
          black
        </MenuItem>
        <MenuItem value='white'>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{
              paddingRight: '5px',
              color: '#eee',
            }}
          />
          white
        </MenuItem>
        <MenuItem value='yellow'>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{ paddingRight: '5px', color: 'yellow' }}
          />
          yellow
        </MenuItem>
        <MenuItem value='orange'>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{ paddingRight: '5px', color: 'orange' }}
          />
          orange
        </MenuItem>
        <MenuItem value='red'>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{ paddingRight: '5px', color: 'red' }}
          />
          red
        </MenuItem>
        <MenuItem value='purple'>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{ paddingRight: '5px', color: 'purple' }}
          />
          purple
        </MenuItem>
        <MenuItem value='magenta'>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{ paddingRight: '5px', color: 'magenta' }}
          />
          magenta
        </MenuItem>
        <MenuItem value='green'>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{ paddingRight: '5px', color: 'green' }}
          />
          green
        </MenuItem>
        <MenuItem>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{ paddingRight: '5px', color: 'teal' }}
          />
          teal
        </MenuItem>
        <MenuItem value='blue'>
          <TripOriginOutlinedIcon
            fontSize='small'
            style={{ paddingRight: '5px', color: 'blue' }}
          />
          blue
        </MenuItem>
      </Select>
    </FormControl>
  )
}
export default SelectC
