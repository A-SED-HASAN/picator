import React from 'react'
import { styled } from '@mui/material/styles'
import { SingleTopic, Loading } from '../components'
import { useGlobalContext } from '../context/context'

const Topics = () => {
  const { topics, topicsLoading } = useGlobalContext()

  if (topicsLoading) {
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
