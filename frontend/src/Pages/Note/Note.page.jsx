import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { httpClient } from '../../utils/http';
import { notify } from '../../utils/toaster';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function NotePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [note, setNote] = useState(null);

    useEffect(() => {
        fetchNote()
    }, [id])

    const fetchNote = async () => {
        try {
            const res = await httpClient.GET(`/note/${id}`, true);
            setNote(res.data.data)
        } catch (err) {
            notify.showError(err.response.data.message)
        }
    }
    return (
        <section className='mt-20 relative py-20 px-10'>
            <div
                className='
                absolute 
                top-0
                left-0
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
            <div>
                <p className='text-[0.8rem] text-[#7f7f7f] mb-[-0.3rem]'>Title</p>
                <h1 className='font-bold text-2xl'>{note?.title}</h1>
            </div>
            <div className='my-2'>
                <p className='text-[0.8rem] text-[#7f7f7f] mb-[-0.3rem]'>Content</p>
                <p>{note?.content}</p>
            </div>
        </section>
    )
}

export default NotePage
