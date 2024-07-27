import { Modal } from 'antd'
import Input from 'antd/es/input/Input'
import React from 'react'
import { useFormik } from 'formik'
export default function AddSurveyModal({ open, setOpen }) {


    const formik = useFormik({
        initialValues: {
            name: ""
        },
        onSubmit: () => {

        }

    })



    return (
        <Modal classNames='w-full h-full' title="ایجاد پرسشنامه جدید" onOk={formik.handleSubmit} open={open} onCancel={() => setOpen(false)}>
            <label htmlFor="">نام پرسشنامه را وارد کنید</label>
            <Input name='name' onChange={formik.handleChange} value={formik.values.name} className='' />

        </Modal>


    )
}
