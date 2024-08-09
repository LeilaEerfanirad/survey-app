import { Button, Input } from 'antd'
import React from 'react'
import { useFormik } from 'formik'
import { signupApi } from '../../Apis/auth/signup'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SignupPage() {

    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            repeatPass: "",
        },
        onSubmit: (values) => {
            signupApi(values)
                .then(res => {

                    if (res.status === "success") {

                        localStorage.setItem("token", res.token)

                        navigate("/panel/dashboard")

                    } else {

                        toast.error(res.msg)



                    }

                    console.log(res);

                }).catch(e => {
                    console.log(e);
                })
        }
    })



    return (
        <div className='flex-1 flex items-center justify-center py-4'>
            <div className='border rounded-md p-4 flex flex-col gap-4 max-w-md min-w-96 m-auto'>
                <h1 className='text-center'>ثبت نام</h1>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm' htmlFor="">نام کاربری</label>
                    <Input name='username' onChange={formik.handleChange} value={formik.values.username} placeholder="" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm' htmlFor="">رمز عبور</label>
                    <Input.Password name='password' onChange={formik.handleChange} value={formik.values.password} placeholder="" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm' htmlFor="">تکرار رمز عبور</label>
                    <Input.Password name='repeatPass' onChange={formik.handleChange} value={formik.values.repeatPass} placeholder="" />
                </div>

                <Button onClick={formik.handleSubmit} className='' type="primary">ثبت نام</Button>




            </div>
        </div>
    )
}
