
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

  function ProtecedRoutes(props) {
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
          <Route path='/' element={<ProtecedRoutes> <Home /></ProtecedRoutes>} />
          <Route path='home' element={<ProtecedRoutes> <Home /></ProtecedRoutes>} />
          <Route path='movies' element={<ProtecedRoutes> <Movies /></ProtecedRoutes>} />
          <Route path='movieDetails' element={<ProtecedRoutes> <MovieDetail /></ProtecedRoutes>}>
            <Route path=':id' element={<ProtecedRoutes> <MovieDetail /></ProtecedRoutes>} />
          </Route>
          <Route path='people' element={<ProtecedRoutes> <People /></ProtecedRoutes>} />
          <Route path='tv' element={<ProtecedRoutes> <Tv /></ProtecedRoutes>} />
          <Route path='tvdetails' element={<ProtecedRoutes> <TvDetails /></ProtecedRoutes>}>
            <Route path=':id' element={<ProtecedRoutes> <TvDetails /></ProtecedRoutes>} />
          </Route>
          <Route path='peopledetail' element={<ProtecedRoutes> <PeopleDetail /></ProtecedRoutes>} >
            <Route path=':id' element={<ProtecedRoutes> <PeopleDetail /></ProtecedRoutes>} />

          </Route>
          <Route path='about' element={<ProtecedRoutes> <About /></ProtecedRoutes>} />
          <Route path='contacts' element={<ProtecedRoutes> <Contacts /></ProtecedRoutes>} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login Data={decodeData} />} />


          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

    </div>
  )
}