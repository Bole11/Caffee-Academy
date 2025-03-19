import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Register } from './components/Register'
import { Prijava } from './components/Prijava'
import { Homepage } from './components/Homepage'
import { ZaboravljenaLozinka } from './components/ZaboravljenaLozinka'
import { Profile } from './components/Profile'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          {/* Set Homepage as the default route */}
          <Route path='/' element={<Homepage/>} />
          {/* Other routes */}
          <Route path='/prijava' element={<Prijava/>} />
          <Route path='/registracija' element={<Register/>} />
          <Route path='/zaboravljenaLozinka' element={<ZaboravljenaLozinka />} />
          <Route path='/profil' element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App