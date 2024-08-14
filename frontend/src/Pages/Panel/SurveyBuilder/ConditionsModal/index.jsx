import React, { useEffect } from 'react'
import ModalsLayout from '../QTypeModals/ModalLayout'
import { useSearchParams } from 'react-router-dom'
import getQuestionApi from '../../../../Apis/questions/getQuestionApi'
import { useFormik } from 'formik'
import EdgeCard from './EdgeCard'

export default function ConditionsModal({ open, setOpen }) {

    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {

        if (!open) {
            setSearchParams({})
        }

        console.log(searchParams.get("questionId"));


        if (searchParams.get("questionId"))
            getQuestionApi(searchParams.get("questionId"))
                .then(res => {
                    console.log(res);
                    formik.setValues({
                        ...res, edges: res.edges.length ? res.edges : [
                            {
                                destination: "",
                                conditions: [
                                    {
                                        boolean_operator: "",
                                        logical_operator: "",
                                        first_operand: "",
                                        second_operand: ""
                                    }
                                ]
                            }
                        ]
                    })

                }).catch(e => {
                    console.log(e);

                })

    }, [open])

    const formik = useFormik({
        initialValues: {
            edges: []

        },
        onSubmit: () => {

        }

    })




    return (
        <ModalsLayout open={open} title="افزودن شرط به سوال" setOpen={setOpen}>
            <div className='w-full h-full flex flex-col'>

                <div>سوال :{formik.values.title}</div>

                {/*edgs*/}
                <div className=' border mt-8 flex-1 overflow-auto flex flex-col gap-4'>


                    {
                        formik.values.edges.map((item, edgeIndex) => <EdgeCard formik={formik} edgeIndex={edgeIndex} />)
                    }
                </div>
            </div>
        </ModalsLayout>
    )
}
