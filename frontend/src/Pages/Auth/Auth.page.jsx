import React, { useState } from 'react'
import RegisterComponent from '../../Components/Register/Register.component'
import LoginComponent from '../../Components/Login/Login.component';

const containerStyle = {
    backgroundImage: 'linear-gradient(to right top, #7161ef, #826cee, #9076ee, #9d82ed, #a98ded, #c392e4, #d699dd, #e3a2d6, #f2acc8, #f7bac0, #f4cac3, #efd9ce)',
}

function AuthPage() {
    const [component, setComponent] = useState("login");
    
    function changeComponent(componentName) {
        setComponent(componentName);
    }
    const content = component === 'login'
        ? <LoginComponent func={changeComponent} />
        : <RegisterComponent func={changeComponent} />
    return (
        <section className='h-[100vh] w-full flex items-center justify-center' style={containerStyle}>
            {content}
        </section>
    )
}

export default AuthPage
