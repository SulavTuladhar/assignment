import React, { useEffect, useState } from 'react'
import { TbSearch, TbNotes, TbPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function SearchBar({searchFunc}) {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        searchFunc(title)
    }, [title])
    return (
        <div className='flex gap-10'>
            <div className='w-[30%] flex p-2 px-4 items-center gap-2 rounded-3xl border border-[#7161EF]'>
                <TbSearch className='h-6 w-6 text-[#7161EF]' />
                <input
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Search By Title'
                    className='h-fill w-full rounded-lg p-1 focus:outline-none'
                />
            </div>
            <div className='flex items-center gap-2 rounded-lg cursor-pointer' onClick={() => navigate('/add-note')}>
                <div className='p-3 bg-[#7161EF] rounded-full border border-[#7161EF]'>
                <TbNotes className='h-6 w-6 text-white' />
                </div>
                <div>
                    <span className='flex items-center gap-1'>
                        <TbPlus className='text-[#7f7f7f]'/>
                        <p className='text-[0.7rem] text-[#7f7f7f]'>New Note</p>
                    </span>
                    <h3>Take a Note</h3>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
