import { Modal, Select } from 'antd';
import React from 'react';
import { buildings, scops } from '../../../../baseData';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import postScopApi from '../../../Apis/survey/postScop';
import { toast } from 'react-toastify';

export default function MyScopModal({ open, handleModla }) {

    const { surveyId } = useParams()

    const formik = useFormik({
        initialValues: {
            buildingId: '',
            scopId: ''  // Single choice for scop
        },
        onSubmit: (values) => {
            postScopApi(surveyId, values)
                .then(res => {
                    handleModla()

                    toast.success("شما میتوانید به این نظرسنجی پاسخ دهید.")

                }).catch(e => {
                    console.log(e);

                    toast.error("شما اجازه پاسخ به این نظرسنجی را ندارید!")

                })
        }
    });

    // Handle building change
    const handleChangeBuilding = (value) => {
        formik.setFieldValue('buildingId', value);
        formik.setFieldValue('scopId', ''); // Reset scop when building changes

    };

    // Handle scop change
    const handleChangeScop = (value) => {
        formik.setFieldValue('scopId', value);
    };

    return (
        <Modal open={open} title={"لطفا نقش خود را انتخاب کنید"} onOk={formik.handleSubmit}>
            <div className='flex-1 flex flex-col gap-2'>
                <Select
                    onChange={handleChangeBuilding}
                    style={{ flex: 1 }}
                    value={formik.values.buildingId || "0"} // Set the selected building
                    options={[
                        { value: '0', label: 'انتخاب ساختمان', disabled: true },
                        ...buildings
                    ]}
                />
                <Select
                    onChange={handleChangeScop}
                    style={{ flex: 1 }}
                    value={formik.values.scopId} // Set the selected scop
                    placeholder="انتخاب مجموعه"
                    options={scops[buildings.find(building => building.value === formik.values.buildingId)?.scop] || []} // Get scops based on selected building
                />
            </div>
        </Modal>
    );
}
