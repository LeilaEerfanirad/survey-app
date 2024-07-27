import { Button, Input } from 'antd'
import React from 'react'

export default function SignupPage() {



    return (
        <div className='flex-1 flex items-center justify-center py-4'>
            <div className='border rounded-md p-4 flex flex-col gap-4 max-w-md min-w-96 m-auto'>
                <h1 className='text-center'>ثبت نام</h1>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm' htmlFor="">نام کاربری</label>
                    <Input placeholder="" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm' htmlFor="">رمز عبور</label>
                    <Input.Password placeholder="" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-sm' htmlFor="">تکرار رمز عبور</label>
                    <Input.Password placeholder="" />
                </div>

                <Button className='' type="primary">ثبت نام</Button>




            </div>
        </div>
    )
}
