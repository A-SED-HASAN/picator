import React, { useState, useEffect, useRef } from 'react'

import { Input, InputAdornment, IconButton, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

import { SearchOutlinedIcon, GridViewOutlinedIcon } from '../assets/icon'
import { Photo, Select, Loading } from '../components'
import { useGlobalContext } from '../context/context'
import { saveLocal } from '../func/functions'

//links

const clientID = `?client_id=fLH7ZpYet2yD2sGeXCCD7djRR4_LuiD7GCcbCD3QD74`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function Home() {
  const { color, loading, setLoading, width } = useGlobalContext()
  // const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(saveLocal('page'))
  const [query, setQuery] = useState(saveLocal('query'))
  const [newImages, setNewImages] = useState(false)
  const [found, setFound] = useState({
    text: 'found',
    number: 0,
    show: false,
  })
  const mounted = useRef(false)

  const fetchImages = async () => {
    setLoading(true)
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    if (query) {
      if (color) {
        const urlColor = `&color=${color}`
        url = `${searchUrl}${clientID}${urlPage}${urlQuery}${urlColor}`
      } else {
        url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
      }
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    const response = await fetch(url)
    const data = await response.json()
    // const sortByLikes = (a, b) => {
    //   const valueA = a.likes
    //   const valueB = b.likes
    //   if (valueA > valueB) {
    //     return -1
    //   }
    //   if (valueA < valueB) {
    //     return 1
    //   }
    //   return 0
    // }
    // const sortedData = data.results.sort(sortByLikes)
    setPhotos((oldPhotos) => {
      if (query && page === 1) {
        setFound({ show: true, number: data.total, text: 'found' })
        return data.results
      } else if (query) {
        const ph = [...oldPhotos, ...data.results]
        setFound({
          show: true,
          number: data.total - ph.length,
          text: 'remain',
        })
        if (ph.length === data.total) {
          setNewImages(false)
          setLoading(false)
        }
        return ph
      } else {
        return [...oldPhotos, ...data]
      }
    })
    setNewImages(false)
    setLoading(false)
  }

  useEffect(() => {
    fetchImages()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    localStorage.setItem('query', JSON.stringify(query))
    localStorage.setItem('page', JSON.stringify(page))
  }, [query, page])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!newImages) return
    if (loading) return
    setPage((oldPage) => oldPage + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newImages])

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)

    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query) return
    if (page === 1) {
      fetchImages()
    }
    setPage(1)
  }

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
            <Select />
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

        {loading && <Loading />}
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
