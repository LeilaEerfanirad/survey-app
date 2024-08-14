import { Button, Select } from 'antd'
import React, { useState } from 'react'
import ConditionCard from './ConditionCard'

export default function EdgeCard({ formik, edgeIndex }) {

  const [question, setQ] = useState("0")
  const conditions = new Array(1).fill(1)

  const handleSelect = (value, type) => {

  }
  return (
    <>

      <div className=' border'>
        <div className='mb-4 border border-red-500 flex flex-col gap-2'>

          {
            formik.values.edges[edgeIndex].conditions.map((condition, conditionIndex) => <ConditionCard formik={formik} edgeIndex={edgeIndex} conditionIndex={conditionIndex} />)
          }


        </div>
        <div className='flex w-1/2 items-center gap-4' >
          <span className=' text-lg whitespace-nowrap'>برو به</span>
          <Select value={"0"} style={{
            width: "100%"
          }} options={[{ value: '0', label: <span>سوال ها</span>, disabled: true }, { value: 'sample', label: <span>sample</span> }]} />
        </div>
        <div className='flex items-center gap-4 mt-2'>
          <Button onClick={() => {
            formik.setFieldValue("edges", [...formik.values.edges, {
              destination: "",
              conditions: [
                {
                  boolean_operator: "",
                  logical_operator: "",
                  first_operand: "",
                  second_operand: ""
                }
              ]
            }])
          }} type='primary'>افزودن شرط جدید</Button>
          <Button onClick={() => {

            if (edgeIndex !== 0) {
              formik.values.edges.splice(edgeIndex, 1)
              formik.setFieldValue("edges", formik.values.edges)
            }
          }} danger>حذف این شرط</Button>
        </div>
      </div>
      <hr />
    </>
  )
}
