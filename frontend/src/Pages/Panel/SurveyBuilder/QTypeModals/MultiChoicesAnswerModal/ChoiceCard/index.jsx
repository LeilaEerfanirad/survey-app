import { Button, Input } from 'antd'
import React from 'react'

export default function ChoiceCard({ index, handleDelete, handleChangeChoice, value }) {
    return (
        <div className='flex items-center gap-2'>

            <div className='border flex items-center flex-1'>
                <div className='bg-slate-200 p-1'>{index + 1}</div>
                <Input value={value} onChange={(e) => handleChangeChoice(e.target.value, index)} />


            </div>
            <Button onClick={() => handleDelete(index)} danger type='primary'>-</Button>

        </div>
    )
}
