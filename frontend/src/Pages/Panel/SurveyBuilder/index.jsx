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
import { Link, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import changeQuestionsOrdersApi from '../../../Apis/survey/changeQuestionOrdersApi';
import QuestionItemV2 from './components/QuestionItemV2';
import deleteQuestionApi from '../../../Apis/questions/deleteQuestion';
import ConditionsModal from './ConditionsModal';
import { EyeIcon, UserIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Button, Select, Switch } from 'antd';

import { buildings, scops } from '../../../../baseData'
import { useFormik } from 'formik';
import EditSurveyNameModal from './EditSurveyNameModal';


export default function SurveyBuilder() {

    const { surveyId } = useParams()

    const [searchParams, setSearchParams] = useSearchParams()

    const [editSurveyModal, setEditSurveyModal] = useState(false)


    const [survey, setSurvey] = useState(null)
    const [questions, setQuestions] = useState([])

    const [wellcomeModal, setWellcomeModal] = useState(false)
    const [shortAnswerModal, setShortAnswerModal] = useState(false)
    const [longAnswerModal, setLongAnswerModal] = useState(false)
    const [multiChoicesAnswerModal, setMultiChoicesAnswerModal] = useState(false)
    const [theEndModal, setTheEndModal] = useState(false)
    const [conditionModal, setConditionModal] = useState(false)


    const [selectedBuilding, setSelectedBuilding] = useState()

    const [selectedScops, setSelectedScops] = useState()



    const getQPosition = id => questions.findIndex(q => q._id === id)

    function handleDragEnd({ over, active }) {
        if (active.id == over.id) return;
        const originalPos = getQPosition(active.id)
        const newPos = getQPosition(over.id)
        const newArr = arrayMove(questions, originalPos, newPos)
        setQuestions(newArr)
        changeQuestionsOrdersApi(surveyId, {
            questionId: survey.questions[originalPos]._id,
            prior_questionId: survey.questions[newPos]._id
        })
            .then(res => {
                getSingleSurveyApi(surveyId)
                    .then(res => {
                        setSurvey(res)
                        setQuestions(res.questions.map(item => ({ ...item, id: item._id })))
                    }).catch(e => {
                        console.log(e);
                    })
            }).catch(e => {
                console.log(e);

            })

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
                setQuestions(res.questions.map(item => ({ ...item, id: item._id })))
            }).catch(e => {
                console.log(e);
            })

    }, [wellcomeModal,
        shortAnswerModal,
        longAnswerModal,
        multiChoicesAnswerModal,
        theEndModal])

    const handleDeleteQuestion = (questionId) => {
        deleteQuestionApi(questionId, surveyId)
            .then(res => {

                setQuestions(prev => prev.filter(item => item._id !== questionId))

            }).catch(e => {

            })
    }


    const surveyFormik = useFormik({
        initialValues: {
            scops: []

        },
        onSubmit: (values) => {

            console.log(values);


        }
    })


    const handleChangeBuilding = (value, index) => {
        const updatedScops = [...surveyFormik.values.scops];
        updatedScops[index].buildingId = value;
        updatedScops[index].scopIds = []; // Reset scopIds when building changes
        surveyFormik.setFieldValue("scops", updatedScops);
    };

    const handleChangeScops = (value, index) => {
        const updatedScops = [...surveyFormik.values.scops];
        updatedScops[index].scopIds = value;
        surveyFormik.setFieldValue("scops", updatedScops);
    };

    const handleRemoveScop = (index) => {
        const updatedScops = [...surveyFormik.values.scops];
        updatedScops.splice(index, 1);
        surveyFormik.setFieldValue("scops", updatedScops);
    };

    return (
        <>
            <EditSurveyNameModal open={editSurveyModal} setOpen={setEditSurveyModal} />
            <ConditionsModal questions={questions} open={conditionModal} setOpen={setConditionModal} />
            <WellcomeModal data={survey?.questions.find(item => item.type === 0)} open={wellcomeModal} setOpen={setWellcomeModal} />
            <ShortTextAnswerModal questions={questions} open={shortAnswerModal} setOpen={setShortAnswerModal} />
            <MultiChoicesAnswerModal questions={questions} open={multiChoicesAnswerModal} setOpen={setMultiChoicesAnswerModal} />
            <LongTextAnswerModal open={longAnswerModal} setOpen={setLongAnswerModal} />
            <TheEndModal data={survey?.questions.find(item => item.type === 1)} open={theEndModal} setOpen={setTheEndModal} />
            <div className="w-full h-full flex relative overflow-hidden">

                <div className=" flex bg-slate-100 flex-col gap-3 h-full px-2 py-4  border overflow-y-scroll">

                    < QuestionTypeButton title={"صفحه خوش آمد گویی"} id={"well-come"} handleModal={handleModal} />
                    <div className='grid grid-cols-2 gap-3'>
                        <QuestionTypeButton title={"پاسخ کوتاه"} id={"short-answer"} handleModal={handleModal} />
                        <QuestionTypeButton title={"چند گزیته ای "} id={"multi-choices"} handleModal={handleModal} />
                        <QuestionTypeButton title={"پاسخ بلند"} id={"long-answer"} handleModal={handleModal} />
                    </div>
                    <QuestionTypeButton title={"صفحه پایان"} id={"the-end"} handleModal={handleModal} />
                    <div className='flex items-center justify-between'>
                        <h2 className='text-center mt-2'>جامعه هدف</h2>
                        <Button onClick={() => {
                            const newScop = { buildingId: '', scopIds: [] };
                            surveyFormik.setFieldValue("scops", [...surveyFormik.values.scops, newScop]);
                        }}>
                            +
                        </Button>
                    </div>
                    {surveyFormik.values.scops.map((scop, index) => (
                        <div key={index} className='flex items-center gap-1'>
                            <div className='flex-1 flex flex-col gap-2'>
                                <Select
                                    onChange={(value) => handleChangeBuilding(value, index)}
                                    style={{ flex: 1 }}
                                    value={scop.buildingId || "0"} // Set the selected building
                                    options={[
                                        { value: '0', label: 'انتخاب ساختمان', disabled: true },
                                        ...buildings
                                    ]}
                                />
                                <Select
                                    className='w-full max-w-xs'
                                    mode="multiple"
                                    onChange={(value) => handleChangeScops(value, index)}
                                    value={scop.scopIds || []}
                                    placeholder="مجموعه ها"
                                    style={{ flex: 1 }}
                                    options={scops[buildings.find(item => item.value === scop.buildingId)?.scop] || []}
                                />
                            </div>
                            <Button onClick={() => handleRemoveScop(index)}>-</Button>
                            <hr className='border' />
                        </div>
                    ))}
                </div>
                <DndContext onDragEnd={handleDragEnd}>

                    <SortableContext items={questions} strategy={verticalListSortingStrategy}>

                        <div className='w-full flex-1 flex flex-col h-full overflow-hidden'>
                            <div className="flex items-center justify-between gap-2 border p-2">
                                <div className='flex items-center gap-1'>
                                    <PencilIcon onClick={() => setEditSurveyModal(true)} width={18} />
                                    <p>عنوان نظرسنجی :</p>
                                    <p>{survey?.name}</p>
                                </div>
                                <div className='flex  gap-2'>
                                    <div className='flex items-center gap-2'>
                                        <p>وضعیت:</p>
                                        <Switch />
                                    </div>
                                    <Link to={"/survey/" + surveyId} target='_blank'>
                                        <Button type="primary">
                                            <EyeIcon width={24} />
                                            مشاهده
                                        </Button>
                                    </Link>
                                    <Button onClick={() => {
                                        surveyFormik.handleSubmit()
                                    }} type="primary">
                                        ذخیره
                                    </Button>
                                    {/* <UserIcon width={24} /> */}

                                </div>
                            </div>
                            <div className="border flex-1 flex flex-col w-full p-4  overflow-y-scroll overflow-x-hidden">
                                <StartEndItem onClick={() => {
                                    handleModal("well-come")
                                    const wellcomeQuestion = survey?.questions.find(item => item.type === 0)
                                    setSearchParams({ questionId: wellcomeQuestion._id })
                                }} data={survey?.questions.find(item => item.type === 0)
                                } title={"صفحه خوش آمد گویی"} />
                                <ul className='flex flex-col p-2 flex-1 gap-2 my-4 border'>
                                    {
                                        questions.map((item, index) => {

                                            const qType = item.type == 0 || item.type == 1
                                            if (!qType) {
                                                return (
                                                    <QuestionItem handleDelete={handleDeleteQuestion} conditionModla={() => setConditionModal(true)} onClick={(modalType) => handleModal(modalType)
                                                    } id={item._id} key={item._id} index={index} data={item} />
                                                )
                                            }

                                        })
                                    }
                                </ul>
                                <StartEndItem title={"صفحه پایان"} onClick={() => {
                                    handleModal("the-end")
                                    const wellcomeQuestion = survey?.questions.find(item => item.type === 1)
                                    setSearchParams({ questionId: wellcomeQuestion._id })
                                }} data={survey?.questions.find(item => item.type === 1)
                                } />
                            </div>
                        </div>

                    </SortableContext>
                </DndContext>
            </div>
        </>


    )
}

