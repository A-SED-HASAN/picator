import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Home, SinglePhoto, ErrorPage, Topics } from './routes'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/photo/:id' element={<SinglePhoto />} />
      <Route path='/topics' element={<Topics />} />
      <Route path='/*' element={<ErrorPage />} />
    </Routes>
  )
}
export default App
