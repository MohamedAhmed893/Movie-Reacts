import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function TvDetails() {
  let [TvDetails,setTvDetails]=useState(null)
  let params =useParams()

  async function getData (id){
    
    let {data} =await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=cf6e1e93ce151ae9136d1dd00b931342`)
    setTvDetails(data)
  }

  useEffect(()=>{
    getData(params.id)
  },[])
  return (
   <>
   {TvDetails?<div className="row py-5">
    <div className="col-lg-3 col-md-4 col-sm-12 px-4">
      <div className="inner">
      <img className='w-100' src={`https://image.tmdb.org/t/p/w500`+TvDetails.poster_path} alt="" />
      </div>
    </div>
     <div className="col-lg-9 col-md-8 col-sm-12">
                        <div>
                            <h2 className='pt-3'>{TvDetails.name}</h2>
                            <p className='textColor py-2'>{TvDetails.overview}</p>
                            <ul>
                                <li className='py-1'>Budget : {TvDetails.budget}</li>
                                <li className='py-1' >Popularity : {TvDetails.popularity}</li>
                                <li className='py-1'>Vote Count : {TvDetails.vote_count}</li>
                                <li className='py-1'>Vote Average : {TvDetails.vote_average}</li>
                            </ul>
                        {TvDetails.homepage?<Link to={TvDetails.homepage} target='_blank'><button className='btn btn-outline-info'>Show More</button></Link>:''}
                        </div>
                    </div>
   </div>:<div className='vh-100 d-flex align-items-center justify-content-center'><i className='fas fa-spinner fa-spin fs-2 iconColor'></i></div>}
   </>
  )
}
