import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react'
import ModalsLayout from '../ModalLayout';

export default function WellcomeModal({ open, setOpen }) {



    return (

        <ModalsLayout open={open} title="صفحه خوش‌آمد گویی" setOpen={setOpen}>

            <TextArea rows={4} placeholder="متن خوش‌آمد گویی" maxLength={6} />

        </ModalsLayout>

    )
}
