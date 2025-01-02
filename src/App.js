
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
          <Route path='/' element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='movies' element={<Movies />} />
          <Route path='movieDetails' element={<MovieDetail />}>
            <Route path=':id' element={<MovieDetail />} />
          </Route>
          <Route path='people' element={<People />} />
          <Route path='tv' element={<Tv />} />
          <Route path='tvdetails' element={<TvDetails />}>
            <Route path=':id' element={<TvDetails />} />
          </Route>
          <Route path='peopledetail' element={<PeopleDetail />} >
            <Route path=':id' element={<PeopleDetail />} />

          </Route>
          <Route path='about' element={<About />} />
          <Route path='contacts' element={<Contacts />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login Data={decodeData} />} />


          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>

    </div>
  )
}