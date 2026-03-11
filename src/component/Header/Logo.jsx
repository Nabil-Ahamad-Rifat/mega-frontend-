import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appWrite/auth';


function logo() {
    const dispatch = useDispatch();
    const logout = () =>{
        authService.logout().then(()=>{
            dispatch(log)
        })
    }
  return (
    <div>logo</div>
  )
}

export default logo