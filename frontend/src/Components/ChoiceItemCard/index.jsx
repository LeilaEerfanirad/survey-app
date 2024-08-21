import { Checkbox } from 'antd'
import React, { useState } from 'react'

export default function ChoiceItemCard({ name, index, checked, onClick }) {

    return (
        <button onClick={onClick} className='border w-fit flex'>
            <div className='bg-purple-500 p-2 text-white'>
                {index + 1}
            </div>
            <p className='max-w-xs w-[150px] text-right'>{name}</p>
            <Checkbox checked={checked} />
        </button>
    )
}
