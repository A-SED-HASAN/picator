import React, { useEffect, useState } from 'react'
import { Loading } from '../components'
import { useGlobalContext } from '../context/context'

const Topics = () => {
  const { loading } = useGlobalContext()
  const [topics, setTopics] = useState()

  const gets = async () => {
    const response = await fetch(
      'https://api.unsplash.com/topics/?client_id=fLH7ZpYet2yD2sGeXCCD7djRR4_LuiD7GCcbCD3QD74'
    )
    const data = await response.json()
    setTopics(data)
  }
  useEffect(() => {
    gets()
  }, [])
  console.log(topics)
  return (
    <section className='section'>
      {loading && <Loading />}
      {!loading &&
        topics.map((item) => {
          const {
            id,
            title,
            description,
            total_photos,
            cover_photo,
            preview_photos,
          } = item
          return (
            <div key={id}>
              {/* <h2>{title}</h2>
              <p>{description}</p>
              <em>{total_photos}</em>
              <img src={cover_photo.urls.small} alt={title} /> */}
              <div className='square'>
                {preview_photos.map((item) => {
                  const { id, urls } = item
                  return <img key={id} src={urls.small} alt={id} />
                })}
              </div>
            </div>
          )
        })}
    </section>
  )
}

export default Topics
