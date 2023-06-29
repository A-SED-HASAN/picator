import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from 'react'
import { saveLocal } from '../utils/func'
import { searchUrl, clientID, baseUrl } from '../utils/constant'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [color, setColor] = useState(saveLocal('color'))

  // =========== for responsivity ===========
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

  // =========== Home images functionality ===========
  const [homeLoading, setHomeLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(saveLocal('page'))
  const [query, setQuery] = useState(saveLocal('query'))
  const [newImages, setNewImages] = useState(false)
  const [found, setFound] = useState({
    text: 'found',
    number: 0,
    show: false,
  })

  const mounted = useRef(false)

  const fetchImages = async () => {
    setHomeLoading(true)
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`
    if (query) {
      if (color) {
        const urlColor = `&color=${color}`
        url = `${searchUrl}${clientID}${urlPage}${urlQuery}${urlColor}`
      } else {
        url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
      }
    } else {
      url = `${baseUrl}photos/${clientID}${urlPage}`
    }
    const response = await fetch(url)
    const data = await response.json()

    setPhotos((oldPhotos) => {
      if (query && page === 1) {
        setFound({ show: true, number: data.total, text: 'found' })
        return data.results
      } else if (query) {
        const ph = [...oldPhotos, ...data.results]
        setFound({
          show: true,
          number: data.total - ph.length,
          text: 'remain',
        })
        if (ph.length === data.total) {
          setNewImages(false)
          setHomeLoading(false)
        }
        return ph
      } else {
        return [...oldPhotos, ...data]
      }
    })
    setNewImages(false)
    setHomeLoading(false)
  }

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    localStorage.setItem('query', JSON.stringify(query))
    localStorage.setItem('page', JSON.stringify(page))
    localStorage.setItem('color', JSON.stringify(color))
  }, [query, page, color])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!newImages) return
    if (homeLoading) return
    setPage((oldPage) => oldPage + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newImages])

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query) return
    if (page === 1) {
      fetchImages()
    }
    setPage(1)
  }

  // =========== topics  functionality ===========

  const [topicsLoading, setTopicsLoading] = useState(true)
  const [topics, setTopics] = useState()

  const getTopics = async () => {
    setTopicsLoading(true)
    const response = await fetch(`${baseUrl}topics/${clientID}`)
    const data = await response.json()
    setTopics(data)
    setTopicsLoading(false)
  }

  useEffect(() => {
    getTopics()
  }, [])

  // =========== singlePhoto  functionality ===========
  const [sPhotoLoading, setSPhotoLoading] = useState(true)
  const [photo, setPhoto] = useState({})
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const fetchPhoto = async (imgId) => {
    const url = `${baseUrl}photos/${imgId}${clientID}`
    setSPhotoLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    if (data) {
      setPhoto(data)
      setSPhotoLoading(false)
    }
  }
  return (
    <AppContext.Provider
      value={{
        color,
        setColor,
        homeLoading,
        setHomeLoading,
        width,
        height,
        query,
        setQuery,
        handleSubmit,
        found,
        photos,
        topicsLoading,
        setTopicsLoading,
        topics,
        setTopics,
        fetchPhoto,
        sPhotoLoading,
        photo,
        isImageLoaded,
        setIsImageLoaded,
      }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
