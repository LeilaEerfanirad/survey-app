import { Checkbox } from 'antd'
import React, { useState } from 'react'

export default function ChoiceItemCard({ name, index, checked }) {

    const [check, setCheck] = useState(checked)
    return (
        <button onClick={() => setCheck(prev => !prev)} className='border w-fit flex'>
            <div className='bg-purple-500 p-2 text-white'>
                {index + 1}
            </div>
            <p className='max-w-xs w-[150px] text-right'>{name}</p>
            <Checkbox checked={check} />
        </button>
    )
}
