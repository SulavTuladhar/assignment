import React from 'react'

function Button({ isSubmitting, Submittinglabel, label,func }) {
    const content = isSubmitting
        ? <button
        disabled
            className='border-2 border-[#7161EF] bg-[#7161EF] rounded-md p-2 text-white font-bold hover:bg-white hover:text-[#7161EF] duration-500'
        >
            {Submittinglabel}
        </button>
        : <button
            onClick={(e) => func(e)}
            className='border-2 border-[#7161EF] bg-[#7161EF] rounded-md p-2 text-white font-bold hover:bg-white hover:text-[#7161EF] duration-500'
        >
            {label}
        </button>
    return (
        <>
            {content}
        </>
    )
}

export default Button
