import React, { useEffect, useState } from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar.component'
import { httpClient } from '../../utils/http';
import NoteContainerComponent from '../../Components/NoteContainer/NoteContainer.component';
import { notify } from '../../utils/toaster';

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    useEffect(() => {
        fetchNotes()
    }, [])

    useEffect(() => {
        searchNotes()
    }, [title])

    const setTitleFunc = (title) => {
        setTitle(title)
    }

    const fetchNotes = async () => {
        try {
            const res = await httpClient.GET('/note/', true);
            setNotes(res.data.data)
        } catch (err) {
            notify.showError(err.response.data.message)
        }
    }

    const searchNotes = async () => {
        try {
            const res = await httpClient.POST(`/note/search`, {
                title
            }, true)
            setNotes(res.data.data)
        } catch (err) {
            notify.showError(err.response.data.message)
        }
    }

    const deleteNote = async (e, id, index) => {
        e.preventDefault();
        try {
            const confirmation = window.confirm("Are you sure to remove?");
            if (confirmation) {
                const newNotes = [...notes];
                newNotes.splice(index, 1);
                setNotes(newNotes);
                await httpClient.DELETE(`/note/${id}`, true);
                notify.showSuccess('Note Removed Successfully');
            }
        } catch (err) {
            notify.showError(err.response.data.message)
        }
    }

    return (
        <section className='h-[90vh] py-20'>
            <SearchBar searchFunc={setTitleFunc} />
            <div className='mt-20'>
                <span className='flex items-baseline gap-2'>
                    <h1> All Notes</h1>
                    <p className='text-[#495057] text-[0.7rem]'>{notes.length} Note</p>
                </span>
                <div className='flex flex-wrap gap-10 mt-6'>
                    {
                        notes?.map((item, index) => (
                            <NoteContainerComponent index={index} id={item.id} title={item.title} key={index} deleteNote={deleteNote} />
                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default Dashboard
