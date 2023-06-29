import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'

import moment from 'moment/moment'
import { Blurhash } from 'react-blurhash'

import { useGlobalContext } from '../context/context'
import { Loading, Photo, Photographer, Tags } from '../components'

import {
  RemoveRedEyeOutlinedIcon,
  FileDownloadOutlinedIcon,
  ThumbUpOutlinedIcon,
} from '../assets/icon'

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
    // color,
    // id: idP,
    created_at,
    downloads,
    likes,
    urls: { regular },
    links: { download },
    related_collections: { results, total },
    tags_preview,
    // topics,
    //add topics with little chip and routing to their pages
    views,
  } = photo

  console.log(results)
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

      <h3>details : {alt_description} </h3>
      <Button
        startIcon={<FileDownloadOutlinedIcon />}
        variant='outlined'
        href={download}>
        download
      </Button>
      <div className='row'>
        <h3> views : {views.toLocaleString()}</h3>
        <RemoveRedEyeOutlinedIcon />
      </div>
      <div className='row'>
        <h3> likes : {likes.toLocaleString()}</h3>
        <ThumbUpOutlinedIcon />
      </div>
      <div className='row'>
        <h3> downloads : {downloads.toLocaleString()}</h3>
        <FileDownloadOutlinedIcon />
      </div>
      <div className='row'>
        <h3>released in : {moment(`${created_at}`, 'YYYYMMDD').fromNow()}</h3>
      </div>
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
  button: {
    margin: '2rem 0',
  },
  a: {
    margin: '2rem 0',
  },
  '.row': {
    textAlign: 'start',
    width: width < 800 ? '100%' : '500px',
    padding: '2rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    h3: {
      paddingTop: '.8rem',
    },
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
