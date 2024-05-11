import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Profile() {
  const{user} = useSelector(state=> state.profile)

  useEffect(()=>{
    console.log(user)
  },[])
  return (
    <div className=' mt-[65px] w-[80%] mx-auto font '>



    </div>
  )
}

export default Profile