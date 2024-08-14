import { Button, Input, Select } from 'antd'
import React from 'react'

export default function ConditionCard({ formik, conditionIndex, edgeIndex }) {


    const multiChoicesAnswers = [
        {
            value: 1,
            label: "هست"
        }, {
            value: 2,
            label: "نیست"
        }
    ]

    const boolean_operators = [
        {
            value: 1,
            label: "و"
        }, {
            value: 2,
            label: "یا"
        }
    ]


    return (
        <div className='flex items-center gap-4'>
            {
                conditionIndex === 0 ? (<span className='text-lg'>اگر</span>) : (
                    <Select value={1} style={{
                    }} options={boolean_operators} />
                )
            }

            <Select value={"0"} style={{
                width: "100%",
                flex: "1"
            }} options={[{ value: '0', label: <span>سوال ها</span>, disabled: true }, { value: 'sample', label: <span>sample</span> }]} />
            <Select value={"0"} style={{
                width: "100%",
                flex: "1"
            }} options={[{ value: '0', label: <span>پاسخ </span>, disabled: true }, ...multiChoicesAnswers]} />

            <AnswerInputType type={3} />

            <Button type='primary' onClick={() => {

                const newEdges = formik.values.edges.map((edge, index) => {
                    if (edgeIndex === index) {
                        const newConditions = [...edge.conditions,
                        {
                            boolean_operator: "",
                            logical_operator: "",
                            first_operand: "",
                            second_operand: ""
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


function AnswerInputType({ type }) {

    switch (type) {
        case 1:

            return <Input className='flex-1' />
        case 2:

            return <Input />
        case 3:

            return <Select value={"0"} style={{
                width: "100%",
                flex: "1"
            }} options={[{ value: '0', label: <span>پاسخ ها</span>, disabled: true }, { value: 'sample', label: <span>sample</span> }]} />


        default:
            break;
    }

}
