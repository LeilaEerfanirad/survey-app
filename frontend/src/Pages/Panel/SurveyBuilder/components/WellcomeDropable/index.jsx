
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function WellcomeDropable() {
    const { isOver, setNodeRef } = useDroppable({
        id: "wellcome",
    });

    return (
        <div className={`${isOver ? 'bg-slate-200 text-gray-400' : ''} border-dashed rounded-md text-center border w-full py-4`} ref={setNodeRef}>
            صفحه خوش‌آمد گویی
        </div>
    );
}
