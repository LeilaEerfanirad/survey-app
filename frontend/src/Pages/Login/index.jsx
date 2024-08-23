import { Button, Input } from 'antd'
import React from 'react'
import { loginApi } from '../../Apis/auth/login'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function SignupPage() {

    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: (values) => {
            loginApi(values)
                .then(res => {

                    if (res.status === "success") {

                        localStorage.setItem("token", res.token)

                        navigate("/panel/dashboard")

                    } else {
                        toast.error(res.msg)
                    }
                }).catch(e => {
                    console.log(e);
                })
        }
    })



    return (
        <div className='flex-1 flex items-center justify-center py-4'>
            <div className='border rounded-md p-4 flex flex-col gap-4 max-w-md min-w-96 m-auto'>
                <h1 className='text-center'>ورود</h1>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm' htmlFor="">نام کاربری</label>
                    <Input name='username' onChange={formik.handleChange} value={formik.values.username} placeholder="" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm' htmlFor="">رمز عبور</label>
                    <Input.Password name='password' onChange={formik.handleChange} value={formik.values.password} placeholder="" />
                </div>

                <Button onClick={formik.handleSubmit} className='' type="primary">ورود</Button>
                <Button onClick={() => navigate("/signup")} className='' type="primary">
                    ثبت‌نام
                </Button>



            </div>
        </div>
    )
}
