import React, { useEffect, useState } from 'react'
import { getSingleSurveyApi } from '../../Apis/survey/getSingleSurvey'
import { useParams } from 'react-router-dom'
import { Button, Input } from 'antd'
import { useFormik } from 'formik'
import ChoiceItemCard from '../../Components/ChoiceItemCard'
import MyScopModal from './MyScopModal'
import postAnswers from '../../Apis/answers/postAnswers'
import { toast, ToastContainer } from 'react-toastify'

export default function SurveyPage() {
    const { surveyId } = useParams()

    const [questionIndex, setQuestionIndex] = useState(0)

    const [survey, setSurvey] = useState()

    const [lastQuestionIndex, setLastQuestionIndex] = useState([0])

    const [questions, setQuestions] = useState([])

    const [question, setQuestion] = useState()

    const [accessModal, setAccessModal] = useState(true)


    const handleStartSurvey = () => {

        setQuestionIndex(1)
    }

    const answersFormik = useFormik({
        initialValues: {
            answers: {}
        },
        onSubmit: (values) => {
            postAnswers(surveyId, values)
                .then(res => {
                    console.log(res);

                    toast.success("پاسخ شما ثبت شد")

                }).catch(e => {
                    console.log(e);

                })

        }
    })

    const handleNextQuestion = () => {

        // Example usage:
        const currentQuestionId = question._id;
        const nextQuestionId = getNextQuestion(currentQuestionId, questions, answersFormik.values.answers);

        const nextIndex = questions.findIndex(item => item._id === nextQuestionId)

        if (nextIndex > -1) {
            // setLastQuestionIndex(prev => [...prev, nextIndex])
            setQuestionIndex(nextIndex)
            console.log(`Next question ID: ${nextIndex}`);

        } else {

            setQuestionIndex(questions.length - 1)
        }
    }

    const handlePrevQustion = () => {
        // setLastQuestionIndex(prev => prev.splice(lastQuestionIndex.length - 1, 1))
        setQuestionIndex(lastQuestionIndex[lastQuestionIndex.length - 1])

    }

    useEffect(() => {

        getSingleSurveyApi(surveyId)
            .then(res => {
                setSurvey(res)
                setQuestions(res.questions)
                setQuestion(res.questions[0])
            }).catch(e => {
                console.log(e);
            })

    }, [])


    useEffect(() => {


        setQuestion(questions[questionIndex])

        console.log(questions);


    }, [questionIndex])


    return (
        <>
            <ToastContainer bodyStyle={{
                direction: "rtl"
            }} style={{
                fontSize: "14px",
                direction: "rtl",
                textAlign: "right"
            }} />
            <div className='flex border h-screen flex-col py-4'>
                <MyScopModal open={accessModal} handleModla={() => setAccessModal(false)} />
                <QuestionView answersFormik={answersFormik} questionIndex={questionIndex} question={question} handleStartSurvey={handleStartSurvey} handleSubmit={answersFormik.handleSubmit} />
                {questionIndex > 0 && <div className='flex items-center gap-2 justify-center'>
                    {/* <Button onClick={handlePrevQustion} type='primary'>قبلی</Button> */}
                    <Button onClick={handleNextQuestion} type='primary'>بعدی</Button>
                </div>}
            </div>
        </>
    )
}

function QuestionView({ question, answersFormik, handleStartSurvey, questionIndex, handleSubmit }) {

    switch (question?.type) {
        case 0:
            return (

                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <p>{question.title}</p>
                    <Button type='primary' onClick={handleStartSurvey}>{question.enter_text}</Button>
                </div>
            )
        case 1:
            return (

                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <p>{question.title}</p>
                    <Button type='primary' onClick={handleSubmit}>ارسال پاسخ ها</Button>

                </div>
            )
        case 2:
            return (

                <div className='w-full max-w-sm h-full gap-3 flex flex-col  justify-center'>
                    <p>{questionIndex}-{question.title}</p>
                    <Input value={answersFormik.values.answers[question._id]} onChange={(e) => {
                        answersFormik.values.answers[question._id] = [e.target.value]
                    }} />
                </div>
            )

        case 3:
            return (
                <div className='w-full max-w-sm h-full gap-3 flex flex-col  justify-center'>
                    <p>{questionIndex}-{question.title}</p>
                    {

                        question.choices.map((item, index) => <ChoiceItemCard onClick={() => {
                            if (!answersFormik.values.answers[question._id]?.includes(item._id)) {
                                answersFormik.values.answers[question._id] = answersFormik.values.answers[question._id]?.length ? [...answersFormik.values.answers[question._id], item._id] : [item._id]
                                answersFormik.setFieldValue("answers", answersFormik.values.answers)
                            } else {
                                const newAnswers = answersFormik.values.answers[question._id]?.filter(item2 => item2 != item._id)
                                answersFormik.values.answers[question._id] = newAnswers
                                answersFormik.setFieldValue("answers", answersFormik.values.answers)
                            }

                        }} index={index} name={item.name} checked={answersFormik.values.answers[question._id]?.includes(item._id)} />)
                    }
                </div>
            )
        default:
            break
    }

}


function checkCondition(first_operand, second_operand, answers, logical_operator) {
    let userAnswers = answers[second_operand];

    switch (logical_operator) {
        case 1:
            return userAnswers.includes(first_operand);

        case 2:
            return !userAnswers.includes(first_operand);

        case 4:
            console.log(userAnswers, first_operand);
            return userAnswers[0] === first_operand;

        case 5:
            {
                const strToArray = userAnswers[0].split(' ')
                return strToArray.includes(first_operand)
            }
        case 6: {

            const strToArray = userAnswers[0].split(' ')
            return !strToArray.includes(first_operand)
        }
        default:
            break;
    }

    if (userAnswers) {

        return userAnswers.includes(first_operand);
    } else {
        return false
    }


}

function checkEdges(edges, answers) {
    for (const edge of edges) {
        const { destination, conditions } = edge;
        let isTrueEdge = (conditions.length > 0) ? (conditions[0].boolean_operator === 1 ? true : false) : true;

        for (const condition of conditions) {
            const { boolean_operator, logical_operator, first_operand, second_operand } = condition;
            const isConditionMet = checkCondition(first_operand, second_operand, answers, logical_operator)

            if (boolean_operator === 1) { // 'and' operator
                isTrueEdge = isTrueEdge && isConditionMet;
            } else if (boolean_operator === 2) { // 'or' operator
                isTrueEdge = isTrueEdge || isConditionMet;
            }
        }

        if (isTrueEdge) {
            return { isTrueEdge, destination };
        }
    }

    return { isTrueEdge: false };
}

function getNextQuestion(currentQuestionId, qs, answers) {
    const currentQuestion = qs.find(q => q._id === currentQuestionId);
    if (!currentQuestion) {
        throw new Error(`Question with id ${currentQuestionId} not found`);
    }

    const { edges, final_destination } = currentQuestion;
    const edgeResult = checkEdges(edges, answers);

    if (edgeResult.isTrueEdge) {
        return edgeResult.destination;
    } else {
        return final_destination;
    }
}
