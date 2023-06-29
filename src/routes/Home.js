import React from 'react'
import { Input, InputAdornment, IconButton, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

import { SearchOutlinedIcon, GridViewOutlinedIcon } from '../assets/icon'
import { Photo, SelectColor, Loading } from '../components'
import { useGlobalContext } from '../context/context'

//links

function Home() {
  const { homeLoading, width, query, setQuery, handleSubmit, found, photos } =
    useGlobalContext()

  return (
    <main>
      <SearchWrapper>
        <h2>photo finder</h2>
        <form>
          <Input
            className='form-input'
            id='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton type='submit' onClick={handleSubmit}>
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <div className='flex'>
            <SelectColor />
            <Link to='/topics'>
              <Button variant='outlined' endIcon={<GridViewOutlinedIcon />}>
                topics
              </Button>
            </Link>
          </div>
        </form>
      </SearchWrapper>

      <PhotosWrapper width={width}>
        {found.show && (
          <span className='found'>
            result {found.number.toLocaleString()} {found.text}
          </span>
        )}
        <div className='photos-center'>
          <div className='col'>
            {photos.map((image, index) => {
              return index % 2 === 0 && <Photo key={index} {...image} />
            })}
          </div>
          {width > 800 && (
            <div className='col'>
              {photos.map((image, index) => {
                return index % 2 !== 0 && <Photo key={index} {...image} />
              })}
            </div>
          )}
        </div>

        {homeLoading && <Loading />}
      </PhotosWrapper>
    </main>
  )
}

export default Home

const SearchWrapper = styled('div')(() => ({
  padding: '5rem 0 0 0',
  width: '90vw',
  maxWidth: 'var(--max-width)',
  margin: '0 auto',
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    '.select': {
      marginTop: ' 1rem',
      width: '150px !important',
    },
  },
  '.form-input': {
    width: '100%',
    maxWidth: '500px',
    marginTop: '1rem',
    padding: '0.5rem 0rem',
    letterSpacing: 'var(--spacing) !important',
    fontSize: ' 1.5rem !important',
    color: 'var(--clr-grey-5)',
    backgroundColor: 'transparent',
  },
  '.flex': {
    // background: 'red',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
  },
}))

const PhotosWrapper = styled('div')(({ width }) => ({
  padding: '5rem 0',
  '.found': {
    background: 'rgba(255, 255, 255, 0.5)',
    position: 'fixed',
    top: '0',
    padding: ' 0.3rem 0.5rem',
    textTransform: 'capitalize',
    zIndex: '10',
  },
  '.photos-center': {
    width: '90vw',
    maxWidth: 'var(--max-width)',
    margin: ' 0 auto',
    display: 'grid',
    gridTemplateColumns: width > 800 ? '1fr 1fr' : '1fr',
    gap: '2rem',
    'div.col': {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
  },
}))
