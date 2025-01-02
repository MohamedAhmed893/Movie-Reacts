import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'



export default function MovieDetail() {

    let [movieDetail, setMovieDetail] = useState(null)
    let params = useParams()

    async function getDetail(id) {
        let { data } = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=cf6e1e93ce151ae9136d1dd00b931342`)
        setMovieDetail(data)

    }

    useEffect(() => {
        getDetail(params.id)
    }, [])
    return (
        <>
            {movieDetail?<div className="row py-5 g-4 px-4">
                <div className="col-lg-3 col-md-4 col-sm-12">
                 <div className="inner">
                 <img className='w-100' src={`https://image.tmdb.org/t/p/w500` + movieDetail.poster_path} alt="" />
                 </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                    <div>
                        <h2 className='py-2'>{movieDetail.title}</h2>
                        <p className='textColor pt-3'>{movieDetail.overview}</p>
                        <ul>
                            <li className='py-1'>Budget : {movieDetail.budget}</li>
                            <li className='py-1' >Popularity : {movieDetail.popularity}</li>
                            <li className='py-1'>Vote Count : {movieDetail.vote_count}</li>
                            <li className='py-1'>Vote Average : {movieDetail.vote_average}</li>
                        </ul>
                    {movieDetail.homepage?<Link to={movieDetail.homepage} target='_blank'><button className='btn btn-outline-info'>Show More</button></Link>:''}
                    </div>
                </div>
            </div>:<div className='vh-100 d-flex align-items-center justify-content-center'><i className='fas fa-spinner fa-spin fs-2 iconColor'></i></div>}
        </>
    )
}
