
import React, { useEffect, useState } from 'react';
function QuestionTypeButton({ id, handleModal, title }) {



    return (


        <button onClick={() => handleModal(id)} className={` text-sm text-center justify-center px-8 border bg-white  flex items-center rounded-md py-3 hover:shadow-md`}>
            {title}
        </button>

    );
}

export default QuestionTypeButton
