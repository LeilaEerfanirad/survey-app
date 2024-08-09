import { useSortable } from '@dnd-kit/sortable'
import React, { useRef, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
export default function QuestionItem({ q, index, id, data }) {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    console.log(data);

    const style = {

        transition,
        transform: CSS.Transform.toString(transform)

    }


    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners} className={`px-4 active:z-50 hover:shadow-lg bg-white text-sm py-4 border`}>
            {index + 1} - {q}
        </li>
    )
}
