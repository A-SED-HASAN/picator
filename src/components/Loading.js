import React from 'react'
import { styled } from '@mui/material/styles'
import { CircularProgress } from '@mui/material'
const Loading = ({ fullPage }) => {
  return (
    <Wrapper fullPage={fullPage}>
      <CircularProgress size={fullPage ? '4rem' : '3.2rem'} thickness={4} />
    </Wrapper>
  )
}

export default Loading

const Wrapper = styled('div')(({ fullPage }) => ({
  display: 'grid',
  placeItems: 'center',
  height: fullPage && '100vh',
  padding: !fullPage && '3rem',
}))
