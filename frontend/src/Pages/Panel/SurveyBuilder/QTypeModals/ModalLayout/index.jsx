import { Modal } from 'antd'
import React, { useEffect } from 'react'

export default function ModalsLayout({ open, setOpen, title, children, onOk }) {

  useEffect(() => {
    const element = document.querySelectorAll('div[tabindex="-1"]');
    element.forEach(item => {
      item.style.height = '100%';
    })
  }, [open]);
  return (
    <>
      <style>
        {`
              
                .ant-modal-wrap{
                display:flex;
                flex-direction:column;
                }
            .ant-modal {
            padding-bottom:0px;
            width:100% !IMPORTANT;
            margin-top:20px;
            flex:1;
            height:100%;
            margin-bottom:20px;
            position:static;
            }
            .ant-modal-content {
            height:100%;
            }
            `}
      </style>
      <Modal title={title} open={open} onOk={onOk} onCancel={() => setOpen(false)}>
        {children}
      </Modal>

    </>
  )
}
