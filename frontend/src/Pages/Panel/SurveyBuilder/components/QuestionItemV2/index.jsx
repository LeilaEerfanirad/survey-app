import { useSortable } from '@dnd-kit/sortable';
import React from 'react'

export default function QuestionItemV2({ id, index, data }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    };
    return (
        <div ref={setNodeRef}
            style={style}
            {...attributes} {...listeners} className='py-3 border'>
            {index}-{data.title}

        </div>
    )
}
