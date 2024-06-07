
import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function WellcomeQBtn() {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: "wellcome",
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

                    <button className='text-sm text-center opacity-30 font-extrabold w-[352px] h-[48px] px-8 border bg-white  flex items-center justify-center rounded-md py-3 hover:shadow-md'>
                        صفحه خوش‌آمد گویی
                    </button>
                )
            }

            <button onMouseUpCapture={() => setDrag(false)} onMouseDown={() => setDrag(true)} className={`${drag ? 'fixed' : 'static'} w-[352px] text-sm h-[48px] text-center justify-center px-8 border bg-white  flex items-center rounded-md py-3 hover:shadow-md`} ref={setNodeRef} style={style} {...listeners} {...attributes}>
                صفحه خوش‌آمد گویی
            </button>






        </>
    );
}

export default WellcomeQBtn
