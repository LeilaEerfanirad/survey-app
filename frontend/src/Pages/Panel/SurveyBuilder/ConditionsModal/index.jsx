import React, { useEffect, useState } from 'react'
import ModalsLayout from '../QTypeModals/ModalLayout'
import { useSearchParams } from 'react-router-dom'
import getQuestionApi from '../../../../Apis/questions/getQuestionApi'
import { useFormik } from 'formik'
import EdgeCard from './EdgeCard'
import { Button } from 'antd'
import postEdgesApi from '../../../../Apis/edge/postEdges'

export default function ConditionsModal({ open, setOpen, questions }) {

    const [searchParams, setSearchParams] = useSearchParams()

    const [beforQuestions, setbeforQuestions] = useState([])


    useEffect(() => {

        if (!open) {
            setSearchParams({})
        }

        console.log(searchParams.get("questionId"));


        if (searchParams.get("questionId"))
            getQuestionApi(searchParams.get("questionId"))
                .then(res => {
                    formik.setValues(res)

                }).catch(e => {
                    console.log(e);

                })

    }, [open])

    const formik = useFormik({
        initialValues: {
            choices: [],
            _id: "",
            edges: [],
            title: "",

        },
        onSubmit: (values) => {

            postEdgesApi(values)
                .then(res => {
                    console.log(res);

                }).catch(e => {
                    console.log(e);

                })

            console.log(values.edges);


        }

    })

    useEffect(() => {
        const targetIndex = questions.findIndex(item => item._id === searchParams.get("questionId"))
        const myarray = questions.slice(1, targetIndex + 1)

        setbeforQuestions(myarray)
    }, [questions, open])




    return (
        <ModalsLayout open={open} title="افزودن شرط به سوال" setOpen={setOpen} onOk={formik.handleSubmit}>
            <div className='w-full h-full flex flex-col'>

                <div>سوال :{formik.values.title}</div>

                {/*edgs*/}
                <div className=' border mt-8 flex-1 overflow-auto flex flex-col gap-4'>


                    {
                        formik.values.edges.map((item, edgeIndex) => <EdgeCard questions={questions} beforQuestions={beforQuestions} formik={formik} edgeIndex={edgeIndex} />)
                    }
                    {!formik.values.edges.length && <Button onClick={() => {
                        formik.setFieldValue("edges", [...formik.values.edges, {
                            destination: "",
                            conditions: [
                                {
                                    boolean_operator: 1,
                                    logical_operator: 1,
                                    first_operand: formik.values.type === 3 ? formik.values.choices[0]._id : "",
                                    second_operand: formik.values._id
                                }
                            ]
                        }])
                    }} type='primary' className='w-fit'>افزودن شرط به سوال</Button>}
                </div>
            </div>
        </ModalsLayout>
    )
}
