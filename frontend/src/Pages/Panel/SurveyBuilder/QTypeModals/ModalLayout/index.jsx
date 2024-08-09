import { Modal } from 'antd'
import React, { useEffect } from 'react'

export default function ModalsLayout({ open, setOpen, title, children, onOk }) {

  useEffect(() => {
    const element = document.querySelectorAll('div[tabindex="-1"]');
    element.forEach(item => {
      item.style.height = '100%';
      item.style.overflow = 'hidden';
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
             padding-top:20px;
             padding-bottom:20px;
            flex:1;
            height:100%;
            margin-bottom:20px;
            position:static;
            }
            .ant-modal-content {
            height:100%;
            display:flex;
            flex-direction:column;
            overflow:hidden;
            }
            .ant-modal-body{
            flex:1;
            overflow:hidden;
            }
            `}
      </style>
      <Modal title={title} open={open} onOk={onOk} onCancel={() => setOpen(false)}>
        {children}
      </Modal>

    </>
  )
}
