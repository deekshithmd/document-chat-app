import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)

  return (
    <div className='w-full p-0 m-0'>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>

  )
}

export default App
