import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import ModalsLayout from '../ModalLayout';

export default function TheEndModal({ open, setOpen }) {

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (

        <ModalsLayout title="صفحه پایان" open={open} onOk={handleOk} setOpen={setOpen}>

            <TextArea rows={4} placeholder="متن خوش‌آمد گویی" maxLength={6} />




        </ModalsLayout>
    )
}
