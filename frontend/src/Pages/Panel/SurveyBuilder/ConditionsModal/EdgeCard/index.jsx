import { Button, Select } from 'antd'
import React, { useState } from 'react'
import ConditionCard from './ConditionCard'

export default function EdgeCard({ formik, edgeIndex, beforQuestions, questions }) {

  const [question, setQ] = useState("0")
  const conditions = new Array(1).fill(1)


  return (
    <>

      <div className='border p-2'>
        <div className='mb-4  flex flex-col gap-2'>

          {
            formik.values.edges[edgeIndex].conditions.map((condition, conditionIndex) => <ConditionCard beforQuestions={beforQuestions} formik={formik} edgeIndex={edgeIndex} conditionIndex={conditionIndex} />)
          }


        </div>
        <div className='flex w-1/2 items-center gap-4' >
          <span className=' text-lg whitespace-nowrap'>برو به</span>
          <Select value={formik.values.edges[edgeIndex].destination || "0"} onChange={(questionId) => {
            formik.values.edges[edgeIndex].destination = questionId
            formik.setFieldValue('edges', formik.values.edges)

          }} style={{
            width: "100%"
          }} options={[
            { value: '0', label: <span>سوال ها</span>, disabled: true },
            ...questions
              .filter((item) => item.type !== 0 && item.type !== 1)
              .map((item) => ({
                value: item._id,
                label: <span>{item.title}</span>,
              })),
          ]} />
        </div>
        <div className='flex items-center gap-4 mt-2'>
          <Button onClick={() => {
            formik.setFieldValue("edges", [...formik.values.edges, {
              destination: "",
              conditions: [
                {
                  boolean_operator: 1,
                  logical_operator: formik.values.type === 2 ? 4 : 1,
                  first_operand: formik.values.type === 3 ? formik.values.choices[0]._id : "",
                  second_operand: formik.values._id
                }
              ]
            }])
          }} type='primary'>افزودن شرط جدید</Button>
          <Button onClick={() => {
            formik.values.edges.splice(edgeIndex, 1)
            formik.setFieldValue("edges", formik.values.edges)
          }} danger>حذف این شرط</Button>
        </div>
      </div>
      <hr />
    </>
  )
}
