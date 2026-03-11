import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Protected({children, authentication}) {
    const [loader, setloader] = useState(true)
    const authstatus = useSelector(state =>state.auth.status);
    const dispatch = useDispatch()
    const navigator =useNavigate()

    useEffect(()=>{

        if(authentication && authstatus !==authentication){
            navigator('/login')
        }else if(!authentication && authstatus !==authentication){
            navigator("/")
        }
        setloader(false)
    },
    [navigator,authentication,authstatus])
  return loader ?<h1> loding.....!</h1>:<>{children}</> 
  
}

