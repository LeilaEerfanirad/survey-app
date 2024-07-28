import React from 'react'
import ModalsLayout from '../ModalLayout'
import { Input } from 'antd'

export default function ShortTextAnswerModal({ open, setOpen }) {
    return (
        <ModalsLayout open={open} setOpen={setOpen} title={"سوال با پاسخ کوتاه"}>
            <Input />

        </ModalsLayout>
    )
}
