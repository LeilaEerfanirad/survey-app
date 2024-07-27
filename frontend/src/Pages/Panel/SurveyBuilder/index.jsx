import React, { useState } from 'react'
import TextArea from "antd/es/input/TextArea";
import {
    DndContext, MouseSensor, closestCorners, TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import WellcomeModal from './QTypeModals/WellcomeModal';
import QuestionItem from './components/QuestionItem';
import ShortTextAnswerModal from './QTypeModals/MultiChoicesAnswerModal';
import MultiChoicesAnswerModal from './QTypeModals/MultiChoicesAnswerModal';
import QuestionTypeButton from './components/QuestionTypeButton';
import TheEndModal from './QTypeModals/TheEndModal';
import LongTextAnswerModal from './QTypeModals/LongTextAnswerModal';
import StartEndItem from './components/StartEndItem';



export default function SurveyBuilder() {

    const [parent, setParent] = useState(null);

    const [modal, setModal] = useState("")

    const [wellcomeModal, setWellcomeModal] = useState(false)
    const [shortAnswerModal, setShortAnswerModal] = useState(false)
    const [longAnswerModal, setLongAnswerModal] = useState(false)
    const [multiChoicesAnswerModal, setMultiChoicesAnswerModal] = useState(false)
    const [theEndModal, setTheEndModal] = useState(false)

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

    const handleModal = (id) => {


        switch (id) {
            case "well-come":
                setWellcomeModal(true)
                break;
            case "short-answer":
                setShortAnswerModal(true)
                break;
            case "long-answer":
                setLongAnswerModal(true)
                break;
            case "multi-choices":
                setMultiChoicesAnswerModal(true)
                break;
            case "the-end":
                setTheEndModal(true)
                break;
            default:
                break;
        }

    }

    return (
        <>
            <WellcomeModal open={wellcomeModal} setOpen={setWellcomeModal} />
            <ShortTextAnswerModal open={shortAnswerModal} setOpen={setShortAnswerModal} />
            <LongTextAnswerModal open={longAnswerModal} setOpen={setLongAnswerModal} />
            <MultiChoicesAnswerModal open={multiChoicesAnswerModal} setOpen={setMultiChoicesAnswerModal} />
            <TheEndModal open={theEndModal} setOpen={setTheEndModal} />
            <div className="w-full h-full flex relative overflow-hidden border-red-600 border">
                <div className=" flex bg-slate-100 flex-col gap-3 h-full px-8 py-4  border overflow-y-scroll">
                    <QuestionTypeButton title={"صفحه خوش آمد گویی"} id={"well-come"} handleModal={handleModal} />
                    <div className='grid grid-cols-2 gap-3'>
                        <QuestionTypeButton title={"پاسخ کوتاه"} id={"short-answer"} handleModal={handleModal} />
                        <QuestionTypeButton title={"چند گزیته ای "} id={"multi-choices"} handleModal={handleModal} />
                        <QuestionTypeButton title={"پاسخ بلند"} id={"long-answer"} handleModal={handleModal} />
                    </div>
                    <QuestionTypeButton title={"صفحه پایان"} id={"the-end"} handleModal={handleModal} />
                </div>
                <DndContext onDragEnd={handleDragEnd}>
                    <SortableContext items={questions} strategy={verticalListSortingStrategy}>


                        <div className="border flex-1 flex flex-col h-full p-4  overflow-y-scroll overflow-x-hidden">
                            <StartEndItem title={"صفحه خوش آمد گویی"} />
                            <ul className='flex flex-col p-2 flex-1 gap-2 mt-4 border'>
                                {
                                    questions.map((item, index) => (<QuestionItem id={item.id} key={item.id} q={item.q} index={index} />))
                                }
                            </ul>
                            <StartEndItem title={"صفحه پایان"} />
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </>


    )
}

