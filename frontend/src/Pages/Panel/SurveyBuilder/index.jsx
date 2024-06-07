import React, { useState } from 'react'
import TextArea from "antd/es/input/TextArea";
import Draggable from './components/Dragable';
import Droppable from './components/Dropable';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import WellcomeQBtn from './components/Qtypes/Welcome';
import WellcomeDropable from './components/WellcomeDropable';
import WellcomeModal from './QTypeModals/WellcomeModal';
import QuestionItem from './components/QuestionItem';



export default function SurveyBuilder() {

    const [parent, setParent] = useState(null);

    const [whichModal, setWhichModal] = useState(null)
    const draggable = (
        <Draggable id="draggable">
            Go ahead, drag me.
        </Draggable>
    );

    function handleDragEnd({ over, active }) {



        // setParent(over ? over.id : null);

        if (over) {
            console.log(active);
        }

    }


    const [questions, setQuestions] = useState([
        {
            q: "نام و نام خانوادگی",
            id: 1
        },
        {
            q: "آیا از پارکینگ مجموعه استفاده کرده اید؟",
            id: 2
        },
        {
            q: "آیا برای دفعات بعدی از مجموعه ما استفاده میکنید؟",
            id: 3
        },
        {
            q: "آیا از مدیریت پارکینگ راضی بودید؟ ",
            id: 4
        },
    ])


    return (


        <DndContext onDragEnd={handleDragEnd}>
            <WellcomeModal />
            <div className="w-full h-full flex relative overflow-hidden border-red-600 border">
                <div className=" flex bg-slate-100 flex-col h-full px-8 py-4  border overflow-y-scroll">


                    <WellcomeQBtn />

                </div>
                <div className="border flex-1 flex flex-col h-full p-4  overflow-y-scroll overflow-x-hidden">


                    <WellcomeDropable />


                    <ul className='flex flex-col flex-1 gap-2 mt-4 border'>
                        <SortableContext items={questions} strategy={verticalListSortingStrategy}>
                            {
                                questions.map((item, index) => (<QuestionItem id={item.id} key={index} q={item.q} index={index} />))
                            }

                        </SortableContext>



                    </ul>

                    {/* {!parent ? draggable : null}
                    <Droppable id="wellcome">
                        {parent === "wellcome" ? draggable : 'Drop here'}
                    </Droppable> */}
                </div>

            </div>
        </DndContext>
    )
}
