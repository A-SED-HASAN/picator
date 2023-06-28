import React, { useContext, useEffect, useState } from 'react'

// const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [color, setColor] = React.useState('')
  const [loading, setLoading] = useState(false)

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const resize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }
  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [width, height])

  return (
    <AppContext.Provider
      value={{ color, setColor, loading, setLoading, width, height }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
