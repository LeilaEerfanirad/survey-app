import TextArea from 'antd/es/input/TextArea'
import React, { useEffect } from 'react'
import ModalsLayout from '../ModalLayout'
import { useFormik } from 'formik'
import { patchSurveyApi } from '../../../../../Apis/survey/patchSurvey'
import { Button, Input } from 'antd'
import ChoiceCard from './ChoiceCard'
import ChoiceItemCard from '../../../../../Components/ChoiceItemCard'
import { useParams } from 'react-router-dom'
import getQuestionApi from '../../../../../Apis/questions/getQuestionApi'
import { useSearchParams } from 'react-router-dom'
import patchQuestionApi from '../../../../../Apis/questions/patchQuestionApi'
import postQuestionApi from '../../../../../Apis/questions/postQuestionApi'
export default function MultiChoicesAnswerModal({ open, setOpen, data, questions }) {

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
                    formik.setValues(res)

                }).catch(e => {
                    console.log(e);

                })

    }, [open])



    const formik = useFormik({
        initialValues: {
            title: "",
            type: 3,
            order: questions.length + 2,
            choices: []
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

    const handleChangeChoice = (value, index) => {

        console.log(value, index);

        const newChoices = formik.values.choices.map((item, i) => {
            if (index === i) {
                item.name = value
                return item
            } else {
                return item
            }
        })

        formik.setFieldValue("choices", newChoices)


    }




    return (
        <ModalsLayout title="سوال چند گزینه ای" onOk={formik.handleSubmit} open={open} setOpen={setOpen}>
            <div className="grid grid-cols-12 border h-full overflow-hidden">
                <div className='col-span-3 overflow-y-auto border h-full p-1'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-bold' htmlFor="">سوال</label>
                        <TextArea onChange={formik.handleChange} name='title' value={formik.values.title} rows={8} placeholder="متن سوال" />

                    </div>
                    <div className='flex flex-col gap-2 mt-4 w-full'>
                        <div className='flex justify-between'>
                            <label className='font-bold' htmlFor="">گزینه ها</label>
                            <Button onClick={() => formik.setFieldValue("choices", [...formik.values.choices, {
                                name: ""
                            }])} type='primary'>+</Button>
                        </div>
                        <div className='flex flex-col gap-1'>
                            {
                                formik.values.choices.map((item, index) => <ChoiceCard value={item.name} handleChangeChoice={handleChangeChoice} index={index} handleDelete={(index) => {
                                    formik.values.choices.splice(index, 1)
                                    formik.setFieldValue("choices", formik.values.choices)
                                }} />)
                            }

                        </div>


                    </div>
                </div>
                <div className='col-span-9 border h-full'>
                    <div className='h-full gap-4 flex flex-col justify-center px-4'>
                        <p className=' max-w-sm'> سوال: {formik.values.title}</p>
                        <div className='flex flex-col gap-2'>
                            {
                                formik.values.choices.map((item, index) => item.name && <ChoiceItemCard checked={index % 2 === 0} index={index} name={item.name} />)
                            }


                        </div>
                    </div>
                </div>

            </div>
        </ModalsLayout>


    )
}
