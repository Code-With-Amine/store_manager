import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Dashborad() {
  const {email} = useParams();
  const navigate = useNavigate();
  if(!email){
    navigate('/');
  }
  
  return (
    <div className='dashnoard-container'>Dashborad</div>
  )
}

export default Dashborad