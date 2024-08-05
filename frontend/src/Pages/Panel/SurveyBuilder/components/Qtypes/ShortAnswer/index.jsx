
import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function ShortAnswerQBtn() {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: "short-answer",
    });

    const [drag, setDrag] = useState(false)
    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),

    };

    useEffect(() => {

        console.log(drag);

    }, [drag])

    return (
        <>
            {
                drag && (

                    <button className='pointer-events-none text-sm text-center opacity-30 font-extrabold w-[168px] h-[40px] px-8 border bg-white  flex items-center justify-center rounded-md py-3 hover:shadow-md'>
                        متنی با پاسخ کوتاه
                    </button>
                )
            }

            <button onMouseUpCapture={() => setDrag(false)} onMouseDown={() => setDrag(true)} className={`${drag ? 'fixed' : 'static'} w-[168px] text-sm h-[40px] text-center justify-center px-8 border bg-white  flex items-center rounded-md py-3 hover:shadow-md`} ref={setNodeRef} style={{ ...style }} {...listeners} {...attributes}>
                متنی با پاسخ کوتاه
            </button>

        </>
    );
}

export default ShortAnswerQBtn
