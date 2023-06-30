import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Blurhash } from 'react-blurhash'

import { useGlobalContext } from '../context/context'
import { Loading, Photo, Photographer, Tags, Main } from '../components'

const SinglePhoto = () => {
  const { id } = useParams()
  const {
    width,
    fetchPhoto,
    sPhotoLoading,
    photo,
    isImageLoaded,
    setIsImageLoaded,
  } = useGlobalContext()

  useEffect(() => {
    fetchPhoto(id)
    // eslint-disable-next-line
  }, [id])

  if (sPhotoLoading) {
    return <Loading fullPage />
  }

  const {
    alt_description,
    blur_hash,
    urls: { regular },
    related_collections: { results },
    tags_preview,
  } = photo

  return (
    <Wrapper width={width}>
      {!isImageLoaded && (
        <Blurhash
          hash={blur_hash || 'LbB}RHL}56-=NGayt8WBWBj[ofjt'}
          width={`100%`}
          height={width > 800 ? `90vh` : '50vh'}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      <img
        src={regular}
        alt={alt_description}
        style={{ display: isImageLoaded ? 'block' : 'none' }}
        onLoad={() => {
          setIsImageLoaded(true)
        }}
      />
      <Main />
      <div className='information'>
        <Photographer />
        <Tags array={tags_preview} />
        <div className='collections'>
          {/* must completed */}
          <Divider>related founded </Divider>
          <div className='collections-photos'>
            {results.map((item, index) => {
              const { cover_photo, tags, title } = item
              if (id !== cover_photo.id)
                return <Photo key={index} {...cover_photo} collection />

              return null
            })}
          </div>
        </div>
      </div>

      <Link to='/'>
        <Button variant='contained'>back</Button>
      </Link>
    </Wrapper>
  )
}

export default SinglePhoto

const Wrapper = styled('div')(({ width }) => ({
  display: 'grid',
  placeItems: 'center',
  margin: 'auto',
  padding: width > 800 ? '3rem' : '1rem',
  width: width > 800 ? '80vw' : '95vw',
  img: {
    maxHeight: '90vh',
    maxWidth: '100%',
    marginBottom: '3rem',
  },
  '.information': {
    padding: width > 800 ? '3rem' : '1rem',
    width: '100%',
    display: 'grid',
    gap: '3rem',
    gridTemplateColumns: width > 800 ? ' 1fr 1fr' : '1fr',

    h3: {
      textAlign: 'center',
    },

    '.collections': {
      gridColumn: width > 800 && '2 span',
      '.collections-photos': {
        display: 'flex',
        flexDirection: width > 800 ? 'row' : 'column',
        gap: '2rem',
        padding: '1rem 0',
      },
    },
  },
}))
