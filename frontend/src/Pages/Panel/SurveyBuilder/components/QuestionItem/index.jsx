import { useSortable } from '@dnd-kit/sortable'
import React, { useRef, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { Button } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import deleteQuestionApi from '../../../../../Apis/questions/deleteQuestion'
export default function QuestionItem({ id, index, data, onClick, handleDelete, conditionModla }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id
    });
    const [searchParams, setSearchParams] = useSearchParams()

    const navigate = useNavigate()

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    };


    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`px-4 active:z-50 hover:shadow-lg bg-white text-sm py-4 border flex items-center justify-between`}
        >
            {/* Drag handle: Apply listeners only to this part */}
            <div {...listeners} className="cursor-move flex-1">
                {index} - {data.title}
            </div>
            <div className='flex gap-2'>
                <Button onClick={() => {
                    navigate("../report/" + data._id)


                }}>گزارش</Button>
                <Button onClick={() => {
                    setSearchParams({ questionId: data._id })
                    conditionModla()

                }}>افزودن شرط</Button>

                <Button onClick={() => {
                    const modalType = data.type === 2 ? "short-answer" : data.type === 3 ? "multi-choices" : ""
                    setSearchParams({ questionId: data._id })
                    onClick(modalType)
                }}>ویرایش</Button>
                <Button danger onClick={() => {
                    handleDelete(data._id)
                }}>حذف</Button>

            </div>
        </li>
    )
}
