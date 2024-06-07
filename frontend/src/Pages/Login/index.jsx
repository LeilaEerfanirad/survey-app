import React from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { toggleCompactDrawer } from '../../redux/features/settingsSlice'
export default function LoginPage() {

    const layout = useSelector((state) => state.settings)

    const dispatch = useDispatch()

    console.log(layout);
    return (
        <div>
            <Button type='primary' onClick={() => dispatch(toggleCompactDrawer("salam"))}>سلام</Button>
        </div>
    )
}
