import React, { useEffect, useState } from 'react'
import { getSingleSurveyApi } from '../../Apis/survey/getSingleSurvey'
import { useParams } from 'react-router-dom'
import { Button } from 'antd'

export default function SurveyPage() {
    const { surveyId } = useParams()

    const [survey, setSurvey] = useState()

    const [questions, setQuestions] = useState([])

    const [question, setQuestion] = useState()


    const handleNextQuestion = () => {



    }




    useEffect(() => {

        getSingleSurveyApi(surveyId)
            .then(res => {
                setSurvey(res)
                setQuestions(res.questions.map(item => (!item.type === 0) || (!item.type === 1)))
                setQuestion(res.questions[0])
            }).catch(e => {
                console.log(e);
            })

    }, [])


    return (
        <div className='flex border h-screen'>
            <QuestionView question={question} handleNextQuestion={handleNextQuestion} />
        </div>
    )
}

function QuestionView({ question, handleNextQuestion }) {

    switch (question?.type) {
        case 0:
            return (

                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <p>{question.title}</p>
                    <Button type='primary' onClick={handleNextQuestion}>{question.enter_text}</Button>
                </div>
            )

            break;

        default:
            break;
    }

}
