import React, { useEffect, useState } from 'react'
import Button from '../Common/Button/Button.component';
import { notify } from '../../utils/toaster';

function NoteFormComponent({ note, submitFunc, label, btnLabel, btnSubmittingLabel, isSubmitting}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        if(note){
            setTitle(note.title);
            setContent(note.content)
        }
    }, [note])

    const func = (e) => {
        e.preventDefault();
        if(title.length === 0 || content.length === 0){
            notify.showInfo("The field should not be empty")
        }else{
            submitFunc(e, title,content);
            setTitle('');
            setContent('');
        }
    }
    return (
        <form className='flex flex-col w-full h-full'>
            <h1 className='text-2xl font-bold text-[#7161EF] mb-4'> {label}</h1>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} className='p-2 rounded-lg mb-4 border border-[#7161EF]'/>
            <label htmlFor='content'>Content</label>
            <textarea id='content' value={content} onChange={(e) => setContent(e.target.value)} rows={4} className='p-2 rounded-lg mb-4 border border-[#7161EF]'/>
            <Button 
            Submittinglabel={btnSubmittingLabel}
            func={func}
            isSubmitting={isSubmitting}
            label={btnLabel}
            />
        </form>
    )
}

export default NoteFormComponent
