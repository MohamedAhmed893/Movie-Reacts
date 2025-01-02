import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Movies() {
  let [TrandingMovie, setTrandingMovie] = useState([])
  let nums =new Array(7).fill(1).map((ele ,i)=>i+1)

  async function getTrandingMovie(number) {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=cf6e1e93ce151ae9136d1dd00b931342&&page=${number}`)
    setTrandingMovie(data.results)
  }

  useEffect(() => {
    getTrandingMovie(1)
  }, [])
  return (
    <>
      {TrandingMovie.length>0?<div className='container-fluid py-5'>
        <div className='py-5'>
          <h2 className='h3 text-center'>Tranding <br /> Movies<br /> </h2>
          <p className='textColor text-center'>Top Tranding Movies By Week</p>
          <div className='line mt-4 w-75 m-auto'></div>
        </div>
        <div className="row py-3 gy-4 justify-content-center px-4">
          {TrandingMovie.map((movie, i) => <div key={i} className='col-lg-2 col-md-3 col-sm-6'>
            <Link to={`/movieDetails/${movie.id}`}>
         <div>
         <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="" />
         <h3 className='h6 py-3'>{movie.title}</h3>
         </div>
            </Link>
          </div>)}
        </div>
      </div>:<div className='vh-100 d-flex align-items-center justify-content-center'><i className='fas fa-spinner fa-spin fs-1 iconColor'></i></div>}
      <nav aria-label="Page navigation example">
  <ul className="pagination d-flex justify-content-center pb-4">
    {nums.map((ele ,i)=>  <li key={i} onClick={()=>getTrandingMovie(ele)} className="page-item"><a className="page-link bg-transparent">{ele}</a></li>)}
  </ul>
</nav>
    </>
  )
}
