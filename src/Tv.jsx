import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Tv() {
  let [TvData ,setTvData]=useState([])
  let nums =new Array(7).fill(1).map((ele,i)=>i+1)

  async function getTvData(page) {
    const {data} =await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=cf6e1e93ce151ae9136d1dd00b931342&&page=${page}`)
    setTvData(data.results)
  }
useEffect(()=>{
  getTvData(1)
},[])

  return (
    <>
    {TvData.length>0 ?  <div className="row py-5 px-4 gy-4 d-flex  justify-content-center">
      <div className='py-5'>
          <h2 className='h3 text-center'>Tranding <br /> Tv<br /> </h2>
          <p className='textColor text-center'>Top Tranding Tv By Week</p>
          <div className='line mt-4 w-75 m-auto'></div>
        </div>
        {TvData.map((tv,i)=><div key={i} className='col-lg-2 col-md-3 col-sm-6'>
             <Link to={`/peopledetail/${tv.id}`}>
             <div>
             <img className='w-100' src={`https://image.tmdb.org/t/p/w500`+tv.poster_path} alt="" />
             
                <h6 className='py-2'>{tv.name}</h6>
              </div>
             </Link>
        </div>)}
      </div>:<div className='vh-100 d-flex align-items-center justify-content-center'><i className='fas fa-spinner fa-spin fs-2 iconColor'></i></div>}

      <nav aria-label="Page navigation example">
  <ul className="pagination d-flex  justify-content-center py-3">
    {nums.map((ele,i)=> <li key={i} onClick={()=>getTvData(ele)} className="page-item"><a className="page-link  bg-transparent" >{ele}</a></li>)}
  </ul>
</nav>
    </>
  )
}
