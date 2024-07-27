import { Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

export default function LongTextAnswerModal({ open, setOpen }) {
    return (
        <Modal classNames='w-full h-full' title="سوال با پاسخ بلند" open={open} onCancel={() => setOpen(false)}>

            <div className="col-span-3 flex flex-col  border h-full">
                <div className=" flex p-2">
                    <h3>سوال 1</h3>
                </div>
                <hr className="border" />
                <div className="flex-1 max-h-full flex flex-col gap-2 overflow-y-auto  pt-4 px-2">
                    <div className="flex flex-col gap-2">
                        <h3>سوال</h3>
                        <TextArea rows={4} placeholder="متن سوال" maxLength={6} />
                    </div>
                    <hr className="border" />
                    <div className="flex flex-col gap-2">
                        <h3>گزینه ها</h3>
                    </div>
                </div>
                <div className="h-16 bg-orange-400"></div>
            </div>

        </Modal>


    )
}
