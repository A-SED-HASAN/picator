import React from 'react'
import { Divider } from '@mui/material'
import {
  ThumbUpOutlinedIcon,
  InsertLinkOutlinedIcon,
  LocationOnOutlinedIcon,
  CollectionsOutlinedIcon,
  PhotoSizeSelectActualOutlinedIcon,
} from '../../assets/icon'
import { styled } from '@mui/material/styles'
import { useGlobalContext } from '../../context/context'
import Loading from '../Loading'
const Photographer = () => {
  const { width, photo, sPhotoLoading } = useGlobalContext()

  if (sPhotoLoading) {
    return <Loading fullPage />
  }

  const {
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
  return (
    <Wrapper width={width}>
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
    </Wrapper>
  )
}

export default Photographer

const Wrapper = styled('div')(({ width }) => ({
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
}))
