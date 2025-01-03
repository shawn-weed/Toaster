import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AssetMgmt from './apps/assetManagement/pages/AssetMgmt'
import Layout from './Layout'
import NotesHome from './apps/notes/pages/NotesHome'
import NotePage from './apps/notes/pages/NotePage'

function App() {
    
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout><Home /></Layout>} /> 
        <Route path='AssetMgmt' element={<Layout><AssetMgmt /></Layout>} />
        <Route path='Notes' element={<Layout><NotesHome /></Layout>} />
        <Route path='notes/:id' element={<Layout><NotePage /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
