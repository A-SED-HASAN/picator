import React from 'react'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <h3>we haven't this photo here !</h3>
        <Link to=''>
          <Button variant='contained'>wanna back ?</Button>
        </Link>
      </div>
    </Wrapper>
  )
}

export default ErrorPage

const Wrapper = styled('div')(() => ({
  height: '100vh',
  display: 'grid',
  placeItems: 'center',
  div: {
    padding: '2rem',
    textAlign: 'center',
    h3: {
      marginTop: '1rem',
      marginBottom: '3rem ',
    },
  },
}))
