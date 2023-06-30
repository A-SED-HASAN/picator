import React from 'react'
import {
  RemoveRedEyeOutlinedIcon,
  FileDownloadOutlinedIcon,
  ThumbUpOutlinedIcon,
  TripOriginOutlinedIcon,
  LocationOnOutlinedIcon,
  CalendarMonthOutlinedIcon,
  CameraAltOutlinedIcon,
} from '../../assets/icon'
import { styled } from '@mui/material/styles'
import moment from 'moment/moment'
import { useGlobalContext } from '../../context/context'
import { Button, Divider } from '@mui/material'
import { Loading } from '../'

const Main = () => {
  const { width, sPhotoLoading, photo } = useGlobalContext()

  if (sPhotoLoading) {
    return <Loading fullPage />
  }

  const {
    alt_description,
    color,
    created_at,
    downloads,
    likes,
    views,
    location: { name },
    exif: { exposure_time, focal_length, iso, name: cameraName },
    links: { download },
  } = photo

  return (
    <Wrapper width={width}>
      <Divider> {alt_description} </Divider>
      <Button
        startIcon={<FileDownloadOutlinedIcon />}
        variant='outlined'
        href={download}>
        download
      </Button>
      <div className='row'>
        <RemoveRedEyeOutlinedIcon />
        <h3> views : {views.toLocaleString()}</h3>
      </div>
      <div className='row'>
        <ThumbUpOutlinedIcon />
        <h3> likes : {likes.toLocaleString()}</h3>
      </div>
      <div className='row'>
        <FileDownloadOutlinedIcon />
        <h3> downloads : {downloads.toLocaleString()}</h3>
      </div>
      <div className='row'>
        <CalendarMonthOutlinedIcon />
        <h3>
          published on : {moment(`${created_at}`).format('MMMM D , YYYY')}
        </h3>
      </div>
      <div className='row'>
        <TripOriginOutlinedIcon sx={{ color: color }} />
        <h3>
          main color : <span style={{ color: color }}>{color}</span>
        </h3>
      </div>
      {name && (
        <div className='row'>
          <LocationOnOutlinedIcon />
          <h3>location : {name}</h3>
        </div>
      )}

      {cameraName && (
        <div className='row camera'>
          <CameraAltOutlinedIcon />
          <h3> {cameraName}</h3>
          <div className='detail'>
            <p>
              <span>camera</span>
            </p>
            <p>{cameraName}</p>
            <br />

            {(focal_length || exposure_time || iso) && (
              <p>
                <span>lens</span>
              </p>
            )}

            {focal_length && <p> {focal_length}</p>}
            {exposure_time && <p> {exposure_time} s</p>}
            {iso && <p>Iso {iso}</p>}
          </div>
        </div>
      )}
    </Wrapper>
  )
}

export default Main

const Wrapper = styled('div')(({ width }) => ({
  textAlign: 'center',
  margin: 'auto',
  a: {
    margin: '2rem 0',
  },
  '.row': {
    textAlign: 'start',
    width: width < 800 ? '100%' : '500px',
    padding: '1rem',
    display: 'grid',
    gridTemplateColumns: '.1fr 1fr',
    alignItems: 'center',
    h3: {
      paddingTop: '.8rem',
    },
  },
  '.camera': {
    position: 'relative',
    '.detail': {
      position: 'absolute',
      top: '80%',
      left: '50%',
      transform: 'translate(-50%,0%)',
      background: 'var(--clr-black)',
      padding: '1rem',
      zIndex: '10',
      display: 'none',
      transition: 'var( --transition)',
      borderRadius: 'var(--radius)',
      p: {
        color: 'var(--primary-50)',
        lineHeight: '0',
        span: { color: 'var( --secondary-600)' },
      },
    },
    ':hover .detail': {
      display: 'block',
    },
  },
}))
