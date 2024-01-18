import React, { useState } from 'react'
import { notify } from '../../utils/toaster';
import Button from '../Common/Button/Button.component';
import { httpClient } from '../../utils/http';

function RegisterComponent(props) {
    const func = props.func;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputStyle = 'rounded-md p-2 border border-red-200 focus:outline-none mb-4 mt-1';

    const submit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            notify.showError("Password doesn't match")
        }
        setIsSubmitting(true);
        try {
            await httpClient.POST(`/auth/register`, {
                name,
                email,
                password
            })
            notify.showSuccess(`Register Successfull`)
            setIsSubmitting(false);
            func('login')
        } catch (err) {
            notify.showError(err.response.data.message)
            setIsSubmitting(false)
        }
    }
    return (
        <form className='flex flex-col w-[80%] md:w-[40%] p-10 rounded-3xl shadow-lg bg-white'>
            <h1 className='text-[#7161EF] font-bold text-3xl mb-6'>
                Join Us
            </h1>

            <label htmlFor='name'>Name</label>
            <input type='text' placeholder='Eg: John Doe' id='name' name='name' onChange={(e) => setName(e.target.value)} className={inputStyle} />
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='Eg: john@gmail.com' id='email' name='email' onChange={(e) => setEmail(e.target.value)} className={inputStyle} />
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='******' id='password' name='password' onChange={(e) => setPassword(e.target.value)} className={inputStyle} />
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input type='password' placeholder='******' id='confirmPassword' name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} className={inputStyle} />
            <Button
                Submittinglabel="Registering"
                func={submit}
                label="Register"
                isSubmitting={isSubmitting}
            />
            <p className='text-[#495057] mt-4'>
                Been here before? <span className='text-[#7161EF] cursor-pointer' onClick={() => func('login')}> Sign in. </span>
            </p>
        </form>
    )
}

export default RegisterComponent
