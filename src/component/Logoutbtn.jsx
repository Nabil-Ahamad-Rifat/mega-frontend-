import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../store/authslice';
import authService from '../appWrite/auth';


function Logoutbtn() {
    const dispathch = useDispatch();
    const logoutHandeler = ()=>{
        authService.logout().then(()=>{
            dispathch(logout());
        })
    }

  return (
    <button onClick={logoutHandeler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Log Out</button>
  )
}

export default Logoutbtn