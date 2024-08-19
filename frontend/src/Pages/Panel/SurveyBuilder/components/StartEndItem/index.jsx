import React from 'react'

export default function StartEndItem({ title, data, onClick }) {
    return (
        <button onClick={() => onClick()} className={`py-4 border px-4 rounded-md ${data ? 'text-right bg-slate-300' : 'text-center '}  border-dashed`}>{data?.title || title}</button>

    )
}
