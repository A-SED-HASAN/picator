import React from 'react'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <h3>we haven't this photo here !</h3>
        <Button
          onClick={() => {
            navigate('/')
          }}
          variant='contained'>
          wanna back ?
        </Button>
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
