import axios from 'axios'
import React, { useEffect, useState } from 'react'
import avatar from '../src/./Images/iEaScdyz6POUjtRaO5hTODYjsuV.jpg'
import { Link } from 'react-router-dom'


export default function Home() {
  let [TrandingMovie, setTrandingMovie] = useState([])
  let [TrandingTv, setTrandingTv] = useState([])
  let [TrandingPeople, setTrandingPeople] = useState([])

  async function getTrandingData(trend, callBack) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${trend}/week?api_key=cf6e1e93ce151ae9136d1dd00b931342`)
    callBack(data.results.slice(0, 10))
  }

  useEffect(() => {
    getTrandingData('movie', setTrandingMovie)
    getTrandingData('tv', setTrandingTv)
    getTrandingData('person', setTrandingPeople)
  }, [])
  return (
    <>
      {(TrandingMovie.length <= 0 || TrandingPeople.length <= 0 || TrandingTv.length <= 0) ?
        <div className='vh-100 d-flex align-items-center justify-content-center'><i className='fas fa-spinner fa-spin fs-1 iconColor'></i></div> :
        <div className='container-fluid'>
          <div className="row py-5 gy-4 px-4">
            <div className='col-lg-4 col-md-6 d-flex align-items-center '>
              <div className=' w-100'>
                <div className='line mb-4 w-25'></div>
                <h2 className='h3'>Tranding <br /> Movies<br /> </h2>
                <p className='textColor'>Top Tranding Movies By Week</p>
                <div className='line mt-4'></div>
              </div>
            </div>
            {TrandingMovie.map((movie, i) => <div key={i} className='col-lg-2 col-md-3 col-sm-6'>
              <Link to={`/movieDetails/${movie.id}`}>
                <div>
                <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="" />
                <h3 className='h6 py-3'>{movie.title}</h3>
                </div>
              </Link>
            </div>)}
          </div>

          <div className="row py-5 gy-4 px-4">
            <div className='col-lg-4 col-md-6 d-flex align-items-center '>
              <div className=' w-100'>
                <div className='line mb-4 w-25'></div>
                <h2 className='h3'>Tranding <br /> Tvs<br /> </h2>
                <p className='textColor'>Top Tranding Tv By Week</p>
                <div className='line mt-4'></div>
              </div>
            </div>
            {TrandingTv.map((tv, i) => <div key={i} className='col-lg-2 col-md-3 col-sm-6'>
              <Link to={`/tvdetails/${tv.id}`}><div>
              <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + tv.poster_path} alt="" />
              <h3 className='h6 py-3'>{tv.name}</h3>
                </div></Link>
            </div>)}
          </div>

          <div className="row py-5 gy-4 px-4">
            <div className='col-lg-4 col-md-6 d-flex align-items-center '>
              <div className=' w-100'>
                <div className='line mb-4 w-25'></div>
                <h2 className='h3'>Tranding <br /> People<br /> </h2>
                <p className='textColor'>Top Tranding People By Week</p>
                <div className='line mt-4'></div>
              </div>
            </div>
            {TrandingPeople.map((person, i) => <div key={i} className='col-lg-2 col-md-3 col-sm-6'>
                 <Link to={`/peopledetail/${person.id}`}>
                 <div>
                  {person.profile_path ? <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + person.profile_path} alt="" /> :
                <img className='w-100 custom' src={avatar} alt="" />}

              <h3 className='h6 py-3'>{person.name}</h3>
                  </div></Link>
            </div>)}
          </div>
        </div>}
    </>
  )
}
