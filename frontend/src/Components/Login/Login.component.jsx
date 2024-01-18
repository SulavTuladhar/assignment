import React, { useEffect, useState } from 'react'
import { notify } from '../../utils/toaster';
import { httpClient } from '../../utils/http';
import { useCookies } from 'react-cookie';
import Button from '../Common/Button/Button.component';
import { useNavigate } from "react-router-dom";

function LoginComponent(props) {
    const { func } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cookies, setCookie] = useCookies(['token', 'user']);
    const nagivate = useNavigate();

    useEffect(()=> {
        if(cookies.token){
            nagivate('/dashboard')
        }
    }, [])

    const inputStyle = 'rounded-md p-2 border border-red-200 focus:outline-none mb-4 mt-1';

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        if (email.length === 0 || password.length === 0) {
            notify.showInfo("The fields should not be empty")
        } else {
            try {
                const res = await httpClient.POST(`/auth/login`, {
                    email,
                    password
                })
                setCookie('token', res.data.token);
                setCookie('user', res.data.data);
                notify.showSuccess(`Welcome ${res.data.data.name}`)
                setIsSubmitting(false);
                nagivate('/dashboard')
            } catch (err) {
                notify.showError(err.response.data.message)
                setIsSubmitting(false)
            }
        }
    }
    return (
        <form className='flex flex-col w-[80%] md:w-[40%] p-10 rounded-3xl shadow-lg bg-white'>
            <h1 className='text-[#7161EF] font-bold text-3xl mb-6'>
                Login
            </h1>

            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='Eg: john@gmail.com' id='email' name='email' onChange={(e) => setEmail(e.target.value)} className={inputStyle} />
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='******' id='password' name='password' onChange={(e) => setPassword(e.target.value)} className={inputStyle} />
            <Button
                label={`Login`}
                Submittinglabel={`LogginIin`}
                func={submit}
                isSubmitting={isSubmitting}
            />
            <p className='text-[#495057] mt-4'>
                Don't have an account? <span className='text-[#7161EF] cursor-pointer' onClick={() => func('register')}> Register here. </span>
            </p>
        </form>
    )
}

export default LoginComponent
