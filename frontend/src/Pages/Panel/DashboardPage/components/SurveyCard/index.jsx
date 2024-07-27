import React from 'react'
import { Link } from 'react-router-dom'

export default function SurveyCard() {
    return (
        <Link to={"../survey/1"} className='border rounded-md h-52 grid grid-cols-12'>
            <div className='col-span-7 border h-full flex items-center justify-center'>

                پرسشنامه 1

            </div>
            <div className='col-span-5 border h-full'></div>

        </Link >
    )
}
