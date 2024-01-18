import React from 'react'
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function NoteContainerComponent({ id, title, deleteNote, index }) {
    const navigate = useNavigate();
    return (
        <div className=' w-[16rem] min-h-[12rem] p-4 rounded-2xl shadow-sm hover:shadow-2xl border cursor-pointer duration-500 relative'>
            <h3 className='text-[2rem] hover:underline' onClick={(e) => navigate(`/note/${id}`)}>{title}</h3>
            <div className='absolute bottom-2 right-2 flex gap-2'>
                <div className='bg-[#7161EF] h-fit w-fit p-2 rounded-full' onClick={(e) => navigate(`/edit-note/${id}`)}>
                    <RiEdit2Line className='text-white' />
                </div>
                <div className='bg-[#7161EF] h-fit w-fit p-2 rounded-full' onClick={(e) => deleteNote(e, id, index)}>
                    <RiDeleteBin6Line className='text-white' />
                </div>
            </div>
        </div>
    )
}

export default NoteContainerComponent
