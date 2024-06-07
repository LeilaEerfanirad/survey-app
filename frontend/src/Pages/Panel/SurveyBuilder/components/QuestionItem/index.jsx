import { useSortable } from '@dnd-kit/sortable'
import React from 'react'
import { CSS } from '@dnd-kit/utilities'
export default function QuestionItem({ q, index, id }) {


    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })


    const style = {

        transition,
        transform: CSS.Transform.toString(transform)

    }


    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners} className='px-4 text-sm py-10 border'>
            {index + 1}- {q}
        </li>
    )
}
