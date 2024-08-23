import { Button, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'

export default function ConditionCard({ formik, conditionIndex, edgeIndex, beforQuestions }) {

    const [selelectedQuestion, setSelectedQuestion] = useState()




    const boolean_operators = [
        {
            value: 1,
            label: "و"
        }, {
            value: 2,
            label: "یا"
        }
    ]

    // useEffect(() => {

    //     const t = beforQuestions.finde(item=>item._id === formik.values._id)

    //     // setSelectedQuestion(() => beforQuestions?.finde(item => item._id === firstQ._id))
    //     formik.values.edges[edgeIndex].conditions[conditionIndex].second_operand = firstQ._id
    //     formik.setFieldValue("edges", formik.values.edges)

    // }, [])


    return (
        <div className='flex items-center gap-4'>
            {
                conditionIndex === 0 ? (<span className='text-lg'>اگر</span>) : (
                    <Select value={formik.values.edges[edgeIndex].conditions[conditionIndex].boolean_operator || 1}
                        onChange={(boolean_operator) => {
                            formik.values.edges[edgeIndex].conditions[conditionIndex].boolean_operator = boolean_operator
                            formik.setFieldValue("edges", formik.values.edges)

                        }}
                        style={{
                        }} options={boolean_operators} />
                )
            }
            <Select value={formik.values.edges[edgeIndex].conditions[conditionIndex].second_operand || "0"} style={{
                width: "100%",
                flex: "1"
            }} onChange={(questionId) => {

                const selectedQ = beforQuestions.find(item => item._id === questionId)
                setSelectedQuestion(selectedQ)
                formik.values.edges[edgeIndex].conditions[conditionIndex].second_operand = questionId
                formik.values.edges[edgeIndex].conditions[conditionIndex].first_operand = selectedQ.type === 3 ? selectedQ.choices[0]._id : ""
                formik.setFieldValue("edges", formik.values.edges)
            }} options={[{ value: '0', label: <span>سوال ها</span>, disabled: true }, ...beforQuestions.map((item, index) => ({ value: item._id, label: <span>{item.title}</span> }))]} />

            <AnswerInputType selelectedQuestion={selelectedQuestion || formik.values} formik={formik} conditionIndex={conditionIndex}
                edgeIndex={edgeIndex} />
            <Button type='primary' onClick={() => {

                const newEdges = formik.values.edges.map((edge, index) => {
                    if (edgeIndex === index) {
                        const newConditions = [...edge.conditions,
                        {
                            boolean_operator: 1,
                            logical_operator: formik.values.type === 2 ? 4 : 1,
                            first_operand: formik.values.type === 3 ? formik.values.choices[0]._id : "",
                            second_operand: formik.values._id
                        }
                        ]
                        edge.conditions = newConditions
                        return edge
                    }
                    return edge
                })

                formik.setFieldValue("edges", newEdges)

            }}>+</Button>
            {conditionIndex !== 0 && <Button type='primary' danger onClick={() => {

                const newEdges = formik.values.edges.map((edge, index) => {
                    if (edgeIndex === index) {
                        edge.conditions.splice(conditionIndex, 1)
                        return edge
                    }
                    return edge
                })

                formik.setFieldValue("edges", newEdges)

            }}>-</Button>}

        </div>
    )
}


function AnswerInputType({ selelectedQuestion, formik, conditionIndex,
    edgeIndex }) {

    const multiChoicesAnswersTypes = [
        {
            value: 1,
            label: "هست"
        }, {
            value: 2,
            label: "نیست"
        }
    ]
    const shortAnswerTypes = [
        {
            value: 4,
            label: "معادل است با"
        },
        {
            value: 5,
            label: "شامل میشود"
        }, {
            value: 6,
            label: "شامل نمیشود"
        }
    ]

    switch (selelectedQuestion.type) {
        case 2:

            return (
                <div className='flex items-center flex-1 gap-2'>
                    <Select value={formik.values.edges[edgeIndex].conditions[conditionIndex].logical_operator || "3"} style={{
                        width: "100%",
                        flex: "1"
                    }} onChange={(logical_operator) => {
                        formik.values.edges[edgeIndex].conditions[conditionIndex].logical_operator = logical_operator
                        formik.setFieldValue("edges", formik.values.edges)

                    }} options={[{ value: '3', label: <span>پاسخ </span>, disabled: true }, ...shortAnswerTypes]} />
                    <Input value={formik.values.edges[edgeIndex].conditions[conditionIndex].first_operand || ""} onChange={(e) => {
                        formik.values.edges[edgeIndex].conditions[conditionIndex].first_operand = e.target.value
                        formik.setFieldValue("edges", formik.values.edges)
                    }} className='flex-1' />
                </div>
            )

        case 3:

            return (
                <div className='flex items-center flex-1 gap-2'>
                    <Select value={formik.values.edges[edgeIndex].conditions[conditionIndex].logical_operator || "0"} style={{
                        width: "100%",
                        flex: "1"
                    }}

                        onChange={(logical_operator) => {
                            formik.values.edges[edgeIndex].conditions[conditionIndex].logical_operator = logical_operator
                            formik.setFieldValue("edges", formik.values.edges)

                        }}
                        options={[{ value: '0', label: <span>پاسخ </span>, disabled: true }, ...multiChoicesAnswersTypes]} />


                    <Select value={formik.values.edges[edgeIndex].conditions[conditionIndex].first_operand || "0"}
                        onChange={(first_operand) => {
                            formik.values.edges[edgeIndex].conditions[conditionIndex].first_operand = first_operand
                            formik.setFieldValue("edges", formik.values.edges)

                        }}
                        style={{
                            width: "100%",
                            flex: "1"
                        }} options={[{ value: '0', label: <span>پاسخ ها</span>, disabled: true }, ...selelectedQuestion?.choices.map(item => ({ value: item._id, label: item.name }))]} />
                </div>
            )
        case 4:

            return (
                <div className='flex items-center flex-1 gap-2'>
                    <Select value={"0"} style={{
                        width: "100%",
                        flex: "1"
                    }} options={[{ value: '0', label: <span>پاسخ </span>, disabled: true }, ...shortAnswerTypes]} />
                    <Input className='flex-1' />
                </div>
            )



        default:
            break;
    }

}
