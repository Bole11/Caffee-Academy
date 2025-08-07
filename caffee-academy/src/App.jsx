import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Register } from './pages/Register'
import { Prijava } from './pages/Prijava'
import { Homepage } from './pages/Homepage'
import { ZaboravljenaLozinka } from './pages/ZaboravljenaLozinka'
import { Profile } from './pages/Profile'
import { Admin } from './pages/Admin'
import { Status } from './pages/Status'

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
          <Route path='/admin' element={<Admin />} />
          <Route path='/status' element={<Status />} />
        </Routes>
      </Router>
    </>
  )
}

export default App