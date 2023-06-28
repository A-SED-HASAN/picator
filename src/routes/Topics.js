import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { SingleTopic, Loading } from '../components'
// import { useGlobalContext } from '../context/context'

const Topics = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [topics, setTopics] = useState()

  const getTopics = async () => {
    setIsLoading(true)
    const response = await fetch(
      'https://api.unsplash.com/topics/?client_id=fLH7ZpYet2yD2sGeXCCD7djRR4_LuiD7GCcbCD3QD74'
    )
    const data = await response.json()
    setTopics(data)
    setIsLoading(false)
  }

  console.log(topics)
  useEffect(() => {
    getTopics()
  }, [])

  if (isLoading) {
    return <Loading fullPage />
  }
  return (
    <Wrapper>
      {topics.map((item) => {
        return <SingleTopic key={item.id} {...item} />
      })}
    </Wrapper>
  )
}

export default Topics

const Wrapper = styled('div')(() => ({}))
