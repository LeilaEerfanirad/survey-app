import { Button, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'
import ModalsLayout from '../ModalLayout';
import { useFormik } from 'formik'
import { useParams, useSearchParams } from 'react-router-dom'
import { patchSurveyApi } from '../../../../../Apis/survey/patchSurvey';
import postQuestionApi from '../../../../../Apis/questions/postQuestionApi';
import patchQuestionApi from '../../../../../Apis/questions/patchQuestionApi';
export default function WellcomeModal({ open, setOpen, data }) {

    const { surveyId } = useParams()

    const [searchParams, setSearchParams] = useSearchParams()



    // console.log(data);


    const formik = useFormik({
        initialValues: {
            title: "",
            enter_text: "",
            type: 0,
            order: 0

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
                    }).catch(e => {
                        console.log(e);
                    })

            }


        }
    })

    useEffect(() => {

        if (!open) {
            setSearchParams({})
        }

    }, [open])

    useEffect(() => {



        formik.setValues({ ...formik.values, ...data })

    }, [data])
    return (

        <ModalsLayout open={open} title="صفحه خوش‌آمد گویی" setOpen={setOpen} onOk={formik.handleSubmit}>
            <div className='w-full grid grid-cols-12 h-full overflow-hidden'>

                <div className='col-span-4 border h-full flex overflow-y-auto flex-col gap-4 p-1'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold' htmlFor="">متن ورود</label>
                        <Input onChange={formik.handleChange} name='enter_text' value={formik.values.enter_text} placeholder="متن ورود" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold' htmlFor="">عنوان خوش‌آمد گویی</label>
                        <TextArea onChange={formik.handleChange} name='title' value={formik.values.title} rows={8} placeholder="عنوان خوش‌آمد گویی" />

                    </div>


                </div>
                <div className='col-span-8 border h-full flex items-center justify-center overflow-y-auto'>

                    <div className='flex flex-col gap-4 items-center'>
                        <p className='border max-w-sm'>{formik.values.title || "عنوان"}</p>
                        <Button className='max-w-32' type='primary' >
                            {formik.values.enter_text || "متن ورود"}
                        </Button>

                    </div>

                </div>
            </div>


        </ModalsLayout>

    )
}
