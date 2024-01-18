import React, { useState } from 'react'
import NoteFormComponent from '../../Components/NoteForm/NoteForm.Component'
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { httpClient } from '../../utils/http';
import { notify } from '../../utils/toaster';

function AddNotePage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const uploadNote = async (e, title, content) => {
        try {
            e.preventDefault();
            setIsSubmitting(true)
            const res = await httpClient.POST('/note', {
                title,
                content
            }, true)
            notify.showSuccess("Note Added Successfully")
            setIsSubmitting(false)
        } catch (err) {
            setIsSubmitting(false)
            notify.showError(err.response.data.message)

        }
    }
    return (
        <section className='h-[90vh] flex items-center justify-center relative'>
            <div
                className='
                absolute 
                top-3 
                left-4 
                bg-[#7161EF] 
                p-[0.4rem] 
                rounded-full 
                pr-[0.5rem] 
                group 
                border-[#7161EF]
                border-2
                hover:bg-white 
                cursor-pointer
                duration-500
                '
                onClick={() => navigate('/dashboard')}
            >
                <IoChevronBack className='text-white group-hover:text-[#7161EF] h-5 w-5' />
            </div>
            <div className='w-[50%] p-4 h-fit'>
                <NoteFormComponent label="Add Note" btnLabel="Add note" btnSubmittingLabel="Adding" submitFunc={uploadNote} isSubmitting={isSubmitting} />
            </div>
        </section>
    )
}

export default AddNotePage
