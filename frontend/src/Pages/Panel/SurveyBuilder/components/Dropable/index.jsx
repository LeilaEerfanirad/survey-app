
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        opacity: isOver ? 1 : 0.5,
    };

    return (
        <div className='border w-full h-full' ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}
