import React, { useEffect, useState } from 'react'
import { Cookies } from "react-cookie";
import Button from '../../Components/Common/Button/Button.component';
import { httpClient } from '../../utils/http';
import { notify } from '../../utils/toaster';
import { useCookies } from 'react-cookie';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const cookies = new Cookies();
    const user = cookies.get('user');
    const imgUrl = process.env.REACT_APP_IMG_URL;
    const labelStyle = "border p-1 w-full border border-[#7161EF] rounded-lg p-2";

    const [name, setName] = useState(user ? user.name : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [img, setImg] = useState(null);
    const [cookie, setCookie] = useCookies(['token', 'user']);
    const navigate = useNavigate();

    const fetchUser = async (e) => {
        const res = await httpClient.GET(`/user`, true)
        setCookie('user', res.data.data);
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setImg(e.target.files[0]);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            notify.showError("Password doesn't match")
        }
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("profile", img);
            formData.append("name", name);
            formData.append("email", email);
            if (password.length > 1)
                formData.append("password", password);
            await httpClient.PUT(`/user`, formData, true, true)
            notify.showSuccess(`Updated Successfully`)
            setIsSubmitting(false);
            fetchUser()
        } catch (err) {
            notify.showError(err.response.data.message)
            setIsSubmitting(false)
        }
    }

    return (
        <section className='h-[90vh] flex items-center justify-center'>
            <form className='flex w-[50%] border p-10 rounded-2xl shadow-lg border-[#7161EF] relative'>
                <div
                    className='
                absolute 
                top-4
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
                <div className='flex flex-col items-center justify-center gap-4 flex-1'>
                    <div className='border-2 border-[#7161EF] w-fit h-fit rounded-full p-1'>
                        <img src={`${imgUrl}/profile/${user.image}`} alt='profile-img' className='h-24 w-24 rounded-full object-cover' />
                    </div>
                    <input type='file' className='bg-[#7161EF] text-white rounded-md' onChange={handleFileChange} />
                </div>
                <div className='flex flex-col gap-6 bg-white p-2 flex-1'>
                    <span>
                        <label>Name</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} className={labelStyle} />
                    </span>
                    <span>
                        <label>Email</label>
                        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className={labelStyle} />
                    </span>
                    <span>
                        <label>Password</label>
                        <input type='password' value={password} placeholder='******' onChange={(e) => setPassword(e.target.value)} className={labelStyle} />
                    </span>
                    <span>
                        <label>Confirm Password</label>
                        <input type='password' value={confirmPassword} placeholder='******' onChange={(e) => setConfirmPassword(e.target.value)} className={labelStyle} />
                    </span>
                    <Button
                        Submittinglabel="Saving"
                        label="Save"
                        isSubmitting={isSubmitting}
                        func={submit}
                    />
                </div>
            </form>
        </section>
    )
}

export default ProfilePage
