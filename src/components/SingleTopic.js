import React from 'react'
import { styled } from '@mui/material/styles'
import { Divider } from '@mui/material'
import { Photo } from '../components'
const SingleTopic = ({
  title,
  description,
  total_photos,
  preview_photos,
  cover_photo: {
    alt_description,
    urls: { small },
  },
}) => {
  return (
    <Wrapper>
      <Divider>{title}</Divider>
      <img src={small} alt={alt_description} />
      <div className='preview'>
        {preview_photos.slice(1, 4).map((img) => {
          const {
            id,
            urls: { thumb },
          } = img
          return <img src={thumb} alt={id} key={id} />
        })}
      </div>
      <p>{description}</p>
    </Wrapper>
  )
}

export default SingleTopic

const Wrapper = styled('article')(() => ({
  textAlign: 'center',
  padding: '2rem ',
  img: { padding: '1rem' },
  '.preview': {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
}))
