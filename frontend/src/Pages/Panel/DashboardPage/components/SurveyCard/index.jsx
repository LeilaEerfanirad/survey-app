import React from 'react'
import { Link } from 'react-router-dom'

export default function SurveyCard({ name, _id }) {
    return (
        <Link to={`../survey/${_id}`} className='border w-56 h-40 rounded-md grid grid-cols-12'>
            <div className='col-span-7 border h-full flex items-center justify-center'>

                {name}
            </div>
            <div className='col-span-5 border h-full'></div>

        </Link >
    )
}
