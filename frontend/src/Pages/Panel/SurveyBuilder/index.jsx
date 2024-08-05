import React, { useState } from 'react'
import TextArea from "antd/es/input/TextArea";
import Draggable from './components/Dragable';
import Droppable from './components/Dropable';
import {
    DndContext, MouseSensor, closestCorners, TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import WellcomeQBtn from './components/Qtypes/Welcome';
import WellcomeDropable from './components/WellcomeDropable';
import WellcomeModal from './QTypeModals/WellcomeModal';
import QuestionItem from './components/QuestionItem';
import ShortAnswerQBtn from './components/Qtypes/ShortAnswer';
import TheEndQBtn from './components/Qtypes/TheEndSurvey';
import TheEndDropable from './components/TheEndDropable';



export default function SurveyBuilder() {

    const [parent, setParent] = useState(null);

    const [modal, setModal] = useState("")

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
        {
            q: "آیا از مدیریت پارکینگ راضی بودید؟ ",
            id: 5
        },
        {
            q: "آیا از مدیریت پارکینگ راضی بودید؟ ",
            id: 6
        },
        {
            q: "آیا از مدیریت پارکینگ راضی بودید؟ ",
            id: 7
        },
        {
            q: "آیا از مدیریت پارکینگ راضی بودید؟ ",
            id: 8
        },
    ])
    const draggable = (
        <Draggable id="draggable">
            Go ahead, drag me.
        </Draggable>
    );

    const getQPosition = id => questions.findIndex(q => q.id === id)

    function handleDragEnd({ over, active }) {

        // setParent(over ? over.id : null);

        // if (over) {
        //     console.log(active);
        // }

        console.log(active, "=======active");
        console.log(over, "=======over");

        if (active.id == over.id) return;

        const { id } = over

        if (typeof (active.id) === "number") {

            setQuestions((orev) => {

                const originalPos = getQPosition(active.id)

                const newPos = getQPosition(over.id)

                const newArr = arrayMove(questions, originalPos, newPos)

                return newArr

                // return [...newArr, {
                //     q: "new" + (questions.length + 1),
                //     id: questions.length + 1
                // }]

            })

        } else {
            console.log("s bood");
        }




    }





    return (


        <DndContext onDragEnd={handleDragEnd}>
            {getModal({
                id: "",
                data: {}
            })}
            <div className="w-full h-full flex relative overflow-hidden border-red-600 border">
                <div className=" flex bg-slate-100 flex-col gap-3 h-full px-8 py-4  border overflow-y-scroll">


                    <WellcomeQBtn handleAdd={(type) => setModal(type)} />


                    <div className='grid grid-cols-2 gap-x-3'>
                        <ShortAnswerQBtn />
                    </div>
                    <TheEndQBtn />
                </div>
                <SortableContext items={questions} strategy={verticalListSortingStrategy}>

                    <div className="border flex-1 flex flex-col h-full p-4  overflow-y-scroll overflow-x-hidden">


                        <WellcomeDropable />



                        <ul className='flex flex-col p-2 flex-1 gap-2 mt-4 border'>
                            {
                                questions.map((item, index) => (<QuestionItem id={item.id} key={item.id} q={item.q} index={index} />))
                            }
                        </ul>

                        <TheEndDropable />

                        {/* {!parent ? draggable : null}
                    <Droppable id="wellcome">
                        {parent === "wellcome" ? draggable : 'Drop here'}
                    </Droppable> */}
                    </div>
                </SortableContext>




            </div>
        </DndContext>
    )
}

function getModal(data) {


    switch (data.id) {
        case "wellcome":

            return <WellcomeModal />

        default:
            break;
    }

}
