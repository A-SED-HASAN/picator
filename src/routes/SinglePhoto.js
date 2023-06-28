import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button, Divider, Chip } from '@mui/material'
import { styled } from '@mui/material/styles'

import moment from 'moment/moment'
import { Blurhash } from 'react-blurhash'

import { useGlobalContext } from '../context/context'
import { Loading, Photo } from '../components'

import {
  RemoveRedEyeOutlinedIcon,
  ThumbUpOutlinedIcon,
  FileDownloadOutlinedIcon,
  InsertLinkOutlinedIcon,
  LocationOnOutlinedIcon,
  CollectionsOutlinedIcon,
  PhotoSizeSelectActualOutlinedIcon,
} from '../assets/icon'

const SinglePhoto = () => {
  const { id } = useParams()
  const { width } = useGlobalContext()
  const [photo, setPhoto] = useState({})
  const [loading, setLoading] = useState(true)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const url = `https://api.unsplash.com/photos/${id}?client_id=fLH7ZpYet2yD2sGeXCCD7djRR4_LuiD7GCcbCD3QD74`
  const fetchPhoto = async () => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    if (data) {
      setPhoto(data)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPhoto()
  }, [id, url])

  if (loading) {
    return <Loading fullPage />
  }

  const {
    alt_description,
    blur_hash,
    color,
    id: idP,
    created_at,
    downloads,
    likes,
    urls: { regular },
    user: {
      name,
      // links: { followers, following, likes: liekedPhoto, photos, portfolio },
      profile_image: { small },
      instagram_username,
      location,
      total_collections,
      total_likes,
      total_photos,
    },
    links: { download, download_location, html, self },
    related_collections: { results, total },
    tags_preview,
    topics,
    //add topics with little chip and routing to their pages
    views,
  } = photo
  const photographerDetails = [
    {
      id: 1,
      title: 'instagram',
      value: instagram_username,
      icon: <InsertLinkOutlinedIcon />,
    },
    {
      id: 2,
      title: 'location',
      value: location,
      icon: <LocationOnOutlinedIcon />,
    },
    {
      id: 3,
      title: 'collections',
      value: total_collections,
      icon: <CollectionsOutlinedIcon />,
    },
    {
      id: 4,
      title: 'likes',
      value: total_likes,
      icon: <ThumbUpOutlinedIcon />,
    },
    {
      id: 5,
      title: 'No. photos',
      value: total_photos,
      icon: <PhotoSizeSelectActualOutlinedIcon />,
    },
  ]
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
        <div className='photographer-information'>
          <Divider>photographer</Divider>
          <div className='flex'>
            <h4>name : {name}</h4>
            <img src={small} alt={name} />
          </div>
          <div className='grid-6'>
            {photographerDetails.map((item) => {
              const { id, title, value, icon } = item
              return (
                value !== 0 &&
                value && (
                  <p className='photographer-detail' key={id}>
                    <span> {icon}</span>
                    {title} : {value}
                  </p>
                )
              )
            })}
          </div>
        </div>
        <div className='tags'>
          <Divider>tags</Divider>
          {tags_preview.map((item) => {
            const { title } = item
            return (
              <Chip
                sx={{ margin: '1rem .5rem' }}
                label={title}
                key={title}
                variant='contained'
                onClick={() => {
                  //link or navigate
                  console.log(true)
                }}
              />
            )
          })}
        </div>
        <div className='collections'>
          {/* must completed */}
          <Divider>related collections founded : {total}</Divider>
          <div className='collections-photos'>
            {results.map((item, index) => {
              const { cover_photo } = item
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
    gridTemplateColumns: width > 800 ? '1fr 1fr' : '1fr',

    h3: {
      textAlign: 'center',
    },

    '.flex': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      img: {
        borderRadius: '50%',
        marginTop: '2rem',
      },
    },
    '.grid-6': {
      display: 'grid',
      gridTemplateColumns: width > 800 ? '1fr 1fr' : '1fr',
      gap: '1rem',
      '.photographer-detail': {
        display: 'flex',
        alignItems: 'center',
        span: {
          padding: '1rem',
          marginTop: '.5rem',
        },
      },
    },
    '.collections': {
      gridColumn: '2 span',
      '.collections-photos': {
        background: 'red',
        display: 'flex',
      },
    },
  },
}))
