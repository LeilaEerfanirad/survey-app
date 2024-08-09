import React, { useEffect, useState } from 'react'
import TextArea from "antd/es/input/TextArea";
import {
    DndContext, MouseSensor, closestCorners, TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import WellcomeModal from './QTypeModals/WellcomeModal';
import QuestionItem from './components/QuestionItem';
import ShortTextAnswerModal from './QTypeModals/ShortTextAnswerModal';
import MultiChoicesAnswerModal from './QTypeModals/MultiChoicesAnswerModal';
import QuestionTypeButton from './components/QuestionTypeButton';
import TheEndModal from './QTypeModals/TheEndModal';
import LongTextAnswerModal from './QTypeModals/LongTextAnswerModal';
import StartEndItem from './components/StartEndItem';
import { getSingleSurveyApi } from '../../../Apis/survey/getSingleSurvey';
import { useParams } from 'react-router-dom';
import patchQuestionApi from '../../../Apis/questions/patchQuestionApi';



export default function SurveyBuilder() {

    const { surveyId } = useParams()


    const [survey, setSurvey] = useState(null)
    const [questions, setQuestions] = useState([
        {
            title: "sdsd",
            order: 0
        },
        {
            title: "sdsd",
            order: 1
        },
        {
            title: "sdsd",
            order: 2
        },
    ])


    const [parent, setParent] = useState(null);

    const [modal, setModal] = useState("")

    const [wellcomeModal, setWellcomeModal] = useState(false)
    const [shortAnswerModal, setShortAnswerModal] = useState(false)
    const [longAnswerModal, setLongAnswerModal] = useState(false)
    const [multiChoicesAnswerModal, setMultiChoicesAnswerModal] = useState(false)
    const [theEndModal, setTheEndModal] = useState(false)



    const getQPosition = id => questions.findIndex(q => q.id === id)

    function handleDragEnd({ over, active }) {

        // setParent(over ? over.id : null);

        // if (over) {
        //     console.log(active);
        // }

        console.log(over, active);

        if (active.id == over.id) return;

        const { id } = over

        if (typeof (active.id) === "number") {

            const originalPos = getQPosition(active.id)
            const newPos = getQPosition(over.id)
            const newArr = arrayMove(questions, originalPos, newPos)
            setQuestions(newArr)
            patchQuestionApi(surveyId, {
                questionId: survey.questions[originalPos]._id,
                prior_questionId: survey.questions[newPos]._id
            })
                .then(res => {

                    console.log(res);


                }).catch(e => {
                    console.log(e);

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
    useEffect(() => {

        getSingleSurveyApi(surveyId)
            .then(res => {

                setSurvey(res)

                const myquestions = res.questions.filter(item => (item.type !== 0 && item.type !== 1))

                // myquestions.sort((a, b) => a.order - b.order);

                setQuestions(myquestions.map(item => ({ q: item.title, id: item.order })))

                // setQuestions(res.questions.filter(item => (item.type !== 0 && item.type !== 1)))
            }).catch(e => {
                console.log(e);
            })
    }, [wellcomeModal,
        shortAnswerModal,
        longAnswerModal,
        multiChoicesAnswerModal,
        theEndModal])



    return (
        <>
            <WellcomeModal data={survey?.questions.find(item => item.type === 0)} open={wellcomeModal} setOpen={setWellcomeModal} />
            <ShortTextAnswerModal questions={questions} open={shortAnswerModal} setOpen={setShortAnswerModal} />
            <MultiChoicesAnswerModal questions={questions} open={multiChoicesAnswerModal} setOpen={setMultiChoicesAnswerModal} />
            <LongTextAnswerModal open={longAnswerModal} setOpen={setLongAnswerModal} />
            <TheEndModal open={theEndModal} setOpen={setTheEndModal} />
            <div className="w-full h-full flex relative overflow-hidden border-red-600 border">
                <div className=" flex bg-slate-100 flex-col gap-3 h-full px-8 py-4  border overflow-y-scroll">

                    < QuestionTypeButton title={"صفحه خوش آمد گویی"} id={"well-come"} handleModal={handleModal} />
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
                            <StartEndItem onClick={() => handleModal("well-come")} data={survey?.questions.find(item => item.type === 0)
                            } title={"صفحه خوش آمد گویی"} />
                            <ul className='flex flex-col p-2 flex-1 gap-2 my-4 border'>
                                {
                                    questions.map((item, index) => (<QuestionItem data={{ ...item }} id={item.id} key={item.id} q={item.q} index={index} />))
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

