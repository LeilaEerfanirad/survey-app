import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'

export default function WellcomeModal() {


    const [isModalOpen, setIsModalOpen] = useState(true);

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

        <Modal classNames='w-full h-full' title="صفحه خوش‌آمد گویی" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

            <TextArea rows={4} placeholder="متن خوش‌آمد گویی" maxLength={6} />




        </Modal>
    )
}
