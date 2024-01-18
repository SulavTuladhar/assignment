import React, { useEffect, useState } from 'react'
import NoteFormComponent from '../../Components/NoteForm/NoteForm.Component'
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { httpClient } from '../../utils/http';
import { notify } from '../../utils/toaster';

function EditNotePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchNote()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const fetchNote = async () => {
        try {
            const res = await httpClient.GET(`/note/${id}`, true);
            setNote(res.data.data)
        } catch (err) {
            notify.showError(err.response.data.message)
        }
    }
    const uploadNote = async (e, title, content) => {
        try {
            e.preventDefault();
            setIsSubmitting(true)
            await httpClient.PUT(`/note/${id}`, {
                title,
                content
            }, true)
            notify.showSuccess("Note Updated Successfully")
            setIsSubmitting(false);
            navigate(`/note/${id}`)
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
                <NoteFormComponent note={note} label="Update Note" btnLabel="Update note" btnSubmittingLabel="Updating" submitFunc={uploadNote} isSubmitting={isSubmitting} />
            </div>
        </section>
    )
}

export default EditNotePage
