import React from 'react'
import { Divider, Chip } from '@mui/material'
import { styled } from '@mui/material/styles'

const Tags = ({ array }) => {
  return (
    <div className='tags'>
      <Divider>tags</Divider>
      {array.map((item) => {
        const { title } = item
        return (
          <ChipM
            label={title}
            key={title}
            variant='contained'
            onClick={() => {
              console.log(true)
            }}
          />
        )
      })}
    </div>
  )
}

export default Tags

const ChipM = styled(Chip)(() => ({
  margin: '1rem .5rem',
}))
