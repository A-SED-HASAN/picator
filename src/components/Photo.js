import React, { useState } from 'react'
import { Blurhash } from 'react-blurhash'
import { Link } from 'react-router-dom'
import { FavoriteBorderOutlinedIcon } from '../assets/icon'
import { styled } from '@mui/material/styles'

import moment from 'moment'
const Photo = ({
  alt_description,
  id,
  created_at,
  blur_hash,
  urls: { regular },
  likes,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  return (
    <SinglePhotoWrapper>
      <Link to={`photo/${id}`}>
        <article>
          {!isImageLoaded && (
            <Blurhash
              hash={blur_hash || 'LbB}RHL}56-=NGayt8WBWBj[ofjt'}
              width={`100%`}
              height={`450px`}
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
          <div className='photo-info'>
            <div>
              <FavoriteBorderOutlinedIcon
                fontSize='small'
                className='heart-icon'
              />
              <span>{likes}</span>
            </div>
            {moment(`${created_at}`, 'YYYYMMDD').fromNow()}
          </div>
        </article>
      </Link>
    </SinglePhotoWrapper>
  )
}

export default Photo

const SinglePhotoWrapper = styled('div')(() => ({
  position: 'relative',
  overflow: 'hidden',

  img: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    transition: 'var(--transition)',
    ':hover': {
      transform: 'scale(1.1)',
    },
  },
  h4: {
    marginBottom: '0.5rem',
  },
  p: {
    marginBottom: '0',
  },

  '.user-img': {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
  },
  '.photo-info': {
    position: 'absolute',
    width: '100%',
    padding: ' 0.2rem',
    bottom: '0',
    left: '0',
    background: ' rgba(0, 0, 0, 0.5)',
    color: 'white',
    transform: 'translateY(100%)',
    transition: 'var(--transition)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    span: {
      padding: '0 0.4rem',
    },
    '>div': {
      display: 'flex',
    },
    '.heart-icon': {
      color: 'red',
    },
  },
  ':hover .photo-info': {
    transform: 'translateY(0)',
  },
}))
