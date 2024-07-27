import { PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function AddNewButton({ handleAddSurvey }) {
    return (
        <button onClick={handleAddSurvey} className='border h-52 flex items-center justify-center rounded-md'>

            <PlusIcon width={40} />

        </button>
    )
}
