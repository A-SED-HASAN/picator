import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { useParams } from 'react-router-dom'
import moment from 'moment/moment'

import { Blurhash } from 'react-blurhash'
import { Link } from 'react-router-dom'

import { useGlobalContext } from '../context/context'
import { Loading } from '../components'
import { Button, Divider } from '@mui/material'

import {
  RemoveRedEyeOutlinedIcon,
  ThumbUpOutlinedIcon,
  FileDownloadOutlinedIcon,
  InsertLinkOutlinedIcon,
  LocationOnOutlinedIcon,
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
  if (!loading) {
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
        portfolio_url,
        profile_image: { medium, small },
        instagram_username,
        location,
        total_collections,
        total_likes,
        total_photos,
      },
      links: { download, download_location, html, self },
      related_collections,

      tags,
      topics,

      views,
    } = photo
    console.log(photo)

    return (
      <Wrapper width={width}>
        {!isImageLoaded && (
          <Blurhash
            hash={blur_hash || 'LbB}RHL}56-=NGayt8WBWBj[ofjt'}
            width={`100%`}
            height={`90vh`}
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

        <h3>description : {alt_description} </h3>
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

        <div className='photographer-information'>
          <div className='item-1'>
            <h3> photographer</h3>
            <div className='flex'>
              <h4>name : {name}</h4>
              <img src={medium} alt={name} />
            </div>
            {instagram_username && (
              <p>
                <InsertLinkOutlinedIcon /> {instagram_username}
              </p>
            )}
            {location && (
              <p>
                <LocationOnOutlinedIcon />
                {location}
              </p>
            )}
          </div>
          <div className='item-2'>tags</div>
        </div>

        <Link to='/'>
          <Button variant='contained'>back</Button>
        </Link>
      </Wrapper>
    )
  }
}
export default SinglePhoto

const Wrapper = styled('div')(({ width }) => ({
  display: 'grid',
  placeItems: 'center',
  margin: 'auto',
  padding: '3rem',
  width: '80vw',
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
  '.photographer-information': {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: width > 800 ? '1fr 1fr' : '1fr',
    h3: {
      textAlign: 'center',
    },
    'div.flex': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      img: {
        borderRadius: '50%',
        marginTop: '2rem',
      },
    },
    p: { display: 'flex', alignItems: 'center' },
    '.item-1': {
      padding: '4rem',
    },
    '.item-2': {
      padding: '4rem',
    },
  },
}))
