import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './routes/Home'
import SinglePhoto from './routes/SinglePhoto'
import ErrorPage from './routes/ErrorPage'
import Topics from './routes/Topics'
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
