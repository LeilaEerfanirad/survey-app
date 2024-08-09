import { Button, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'
import ModalsLayout from '../ModalLayout';
import { useFormik } from 'formik'
import { useParams, useSearchParams } from 'react-router-dom'
import { patchSurveyApi } from '../../../../../Apis/survey/patchSurvey';
import getQuestionApi from '../../../../../Apis/questions/getQuestionApi';
import patchQuestionApi from '../../../../../Apis/questions/patchQuestionApi';
import postQuestionApi from '../../../../../Apis/questions/postQuestionApi';
export default function ShortTextAnswerModal({ questions, open, setOpen, data }) {

    const { surveyId } = useParams()


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
                    formik.setValues(res)

                }).catch(e => {
                    console.log(e);

                })

    }, [open])


    const formik = useFormik({
        initialValues: {
            title: "",
            type: 2,


        },
        onSubmit: (values) => {

            if (searchParams.get("questionId")) {

                patchQuestionApi(searchParams.get("questionId"), values)
                    .then(res => {
                        console.log(res);
                        setOpen(false)
                        formik.resetForm()

                    }).catch(e => {
                        console.log(e);

                    })


            } else {

                postQuestionApi({ ...values, surveyId })
                    .then(res => {
                        setOpen(false)
                        formik.resetForm()
                    }).catch(e => {
                        console.log(e);
                    })

            }



        }
    })

    // useEffect(() => {

    //     formik.setValues({ ...formik.values, ...data })

    // }, [data])
    return (

        <ModalsLayout open={open} title="سوال با پاسخ کوتاه" setOpen={setOpen} onOk={formik.handleSubmit}>
            <div className='w-full grid grid-cols-12 h-full'>

                <div className='col-span-4 border h-full flex flex-col gap-4 p-1'>
                    {/* <div className='flex flex-col gap-2'>
                        <label className='font-bold' htmlFor="">متن ورود</label>
                        <Input onChange={formik.handleChange} name='enter_text' value={formik.values.enter_text} placeholder="متن ورود" />
                    </div> */}
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold' htmlFor="">سوال</label>
                        <TextArea onChange={formik.handleChange} name='title' value={formik.values.title} rows={8} placeholder="متن سوال" />

                    </div>


                </div>
                <div className='col-span-8 px-4 border h-full flex items-center '>

                    <div className='flex flex-col gap-4 '>
                        <p className=' max-w-sm'> سوال: {formik.values.title}</p>
                        <Input />
                    </div>

                </div>
            </div>


        </ModalsLayout>

    )
}
