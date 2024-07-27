import { Modal } from 'antd'
import Input from 'antd/es/input/Input'
import React from 'react'
import { useFormik } from 'formik'
import { createSurveyApi } from '../../../../../Apis/survey/create'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function AddSurveyModal({ open, setOpen }) {

    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            name: ""
        },
        onSubmit: (values) => {

            createSurveyApi(values)
                .then(res => {

                    if (res.status == "success") {

                        const { surveyId } = res

                        navigate(`../survey/${surveyId}`)



                    } else {

                    }

                }).catch(e => {

                    toast.error("مشکلی وجود دارد.")

                })

        }

    })



    return (
        <Modal classNames='w-full h-full' title="ایجاد پرسشنامه جدید" onOk={formik.handleSubmit} open={open} onCancel={() => setOpen(false)}>
            <label htmlFor="">نام پرسشنامه را وارد کنید</label>
            <Input name='name' onChange={formik.handleChange} value={formik.values.name} className='' />

        </Modal>


    )
}
