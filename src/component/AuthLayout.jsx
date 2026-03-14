import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Protected({children, authentication}) {
    const [loader, setloader] = useState(true)
    const authstatus = useSelector(state =>state.auth.status);
    const navigator =useNavigate()

    useEffect(()=>{

        if(authentication && authstatus !==authentication){
            navigator('/login')
        }else if(!authentication && authstatus !==authentication){
            navigator("/")
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setloader(false)
    },
    [navigator,authentication,authstatus])
  return loader ?<h1> loding.....!</h1>:<>{children}</> 
  
}

