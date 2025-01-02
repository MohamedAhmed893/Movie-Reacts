import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import avatar from './Images/iEaScdyz6POUjtRaO5hTODYjsuV.jpg'


export default function PeopleDetail() {
    let [PeopleDetail,setPeopleDetail]=useState(null)
    let params =useParams()
async function getPeopleDetail(id) {
    const {data} =await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=cf6e1e93ce151ae9136d1dd00b931342`)
    setPeopleDetail(data)
}
useEffect(()=>{
    getPeopleDetail(params.id)
},[])
  return (
    <>
        {PeopleDetail?<div className="row py-5 px-4">
            <div className='col-lg-3 col-md-4 col-sm-12 '>
                <div>
                    {PeopleDetail.profile_path ? <img className='w-100' src={`https://image.tmdb.org/t/p/w500`+PeopleDetail.profile_path} alt="" />:
                     <img className='w-100' src={avatar} alt="" /> }
                   
                </div>
            </div>
            <div className='col-lg-9 col-md-8 col-sm-12'>
                <div>
                    <h2 className='text-white pt-3'>{PeopleDetail.name}</h2>
                    <p className='textColor py-2'>Place of birth : {PeopleDetail.place_of_birth}</p>
                    <p className='textColor py-2'>Popularity : {PeopleDetail.popularity}</p>
                    {PeopleDetail.homepage?<Link to={PeopleDetail.homepage} target='_blank'><button className='btn btn-outline-info'>Show More</button></Link>:''}
                    
                </div>
            </div>
        </div>:<div className='vh-100 d-flex align-items-center justify-content-center'><i className='fas fa-spinner fa-spin fs-2 iconColor'></i></div>}
    </>
  )
}
