import React from 'react'
import { Cookies } from "react-cookie";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function NavComponent() {
  const cookies = new Cookies();
  const user = cookies.get('user');
  const navigate = useNavigate();
  const imgUrl = process.env.REACT_APP_IMG_URL;

  function logout() {
    cookies.remove('token');
    navigate(-1)
  }
  return (
    <nav className='h-[10vh] flex items-center justify-between'>
      <div className='flex gap-4 items-center cursor-pointer' onClick={() => navigate('/profile')}>
        {
          user.image && (
            <img src={`${imgUrl}/profile/${user.image}`} alt='profile-img' className='h-10 w-10 rounded-full object-cover' />
          )
        }
        <div>
          <p className='text-lg text-[#7161EF]'>{user.name}</p>
          <p className='text-[0.8rem] text-[#495057]'>{user.email}</p>
        </div>
      </div>
      <div>
        <TbLogout className='h-6 w-6 text-[#7161EF]' onClick={() => logout()} />
      </div>
    </nav>
  )
}

export default NavComponent
