
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import NotFound from './NotFound';
import Register from './Register';
import Login from './Login';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Movies from './Movies';
import MovieDetail from './MovieDetail';
import Tv from './Tv';
import People from './People';
import About from './About';
import Contacts from './Contacts';
import TvDetails from './TvDetails';
import PeopleDetail from './PeopleDetail';




export default function App() {
  const [dataOfUser, setData] = useState(null)
  let navigate = useNavigate()


  function decodeData() {
    let encodedData = dataOfUser
    encodedData = localStorage.getItem('encodedToken')
    let decodedData = jwtDecode(encodedData)
    setData(decodedData)
  }

  function ProtectedRoutes(props) {
    if (localStorage.getItem('encodedToken') === null) {
      return <Navigate to="/login" />
    } else {
      return props.children
    }
  }

  function logout() {
    setData(null)
    localStorage.removeItem('encodedToken')
    navigate('/login')

  }

  useEffect(() => {
    if (localStorage.getItem('encodedToken')) {
      decodeData()
    }
  }, [])

  return (
    <div>
      <Navbar logout={logout} Data={dataOfUser} />

      <div className='container'>
        <Routes>
          <Route path='/' element={<ProtectedRoutes> <Home /></ProtectedRoutes>} />
          <Route path='home' element={<ProtectedRoutes> <Home /></ProtectedRoutes>} />
          <Route path='movies' element={<ProtectedRoutes> <Movies /></ProtectedRoutes>} />
          <Route path='movieDetails' element={<ProtectedRoutes> <MovieDetail /></ProtectedRoutes>}>
            <Route path=':id' element={<ProtectedRoutes> <MovieDetail /></ProtectedRoutes>} />
          </Route>
          <Route path='people' element={<ProtectedRoutes> <People /></ProtectedRoutes>} />
          <Route path='tv' element={<ProtectedRoutes> <Tv /></ProtectedRoutes>} />
          <Route path='tvdetails' element={<ProtectedRoutes> <TvDetails /></ProtectedRoutes>}>
            <Route path=':id' element={<ProtectedRoutes> <TvDetails /></ProtectedRoutes>} />
          </Route>
          <Route path='peopledetail' element={<ProtectedRoutes> <PeopleDetail /></ProtectedRoutes>} >
            <Route path=':id' element={<ProtectedRoutes> <PeopleDetail /></ProtectedRoutes>} />

          </Route>
          <Route path='about' element={<ProtectedRoutes> <About /></ProtectedRoutes>} />
          <Route path='contacts' element={<ProtectedRoutes> <Contacts /></ProtectedRoutes>} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login Data={decodeData} />} />


          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

    </div>
  )
}