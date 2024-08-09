import { Button, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'
import ModalsLayout from '../ModalLayout';
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { patchSurveyApi } from '../../../../../Apis/survey/patchSurvey';
export default function ShortTextAnswerModal({ questions, open, setOpen, data }) {

    const { surveyId } = useParams()


    console.log(questions.length);


    const formik = useFormik({
        initialValues: {
            title: "",
            type: 2,
            order: 0

        },
        onSubmit: (values) => {


            patchSurveyApi(surveyId, { ...values, questionId: data?._id, order: data ? data.order : questions.length + 1 })
                .then(res => {
                    setOpen(false)
                    formik.resetForm()
                }).catch(e => {
                    console.log(e);
                })

        }
    })

    useEffect(() => {

        formik.setValues({ ...formik.values, ...data })

    }, [data])
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
