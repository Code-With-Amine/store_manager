import React, { useState } from 'react'
import { axiosClient } from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFromData] = useState({
    "userName": "",
    "password": ""
  });
  const [messg, setMessg] = useState(null);

  const navigate = useNavigate();

  const handelChange = (e) => {
    const {name, value} = e.target;
    setFromData(prev => ({...prev, [name] : value }));
  }

  const handelLogin = async () => {
    try {
      const sanctum = axiosClient.get("/sanctum/csrf-cookie");
      const res = await axiosClient.post('/api/login', formData);
      if(res.data.status == 200){
        return navigate(`/dashbord/${res.data.user}`);
      }
      setMessg(res.data.message);
    }catch(err){
      setMessg(err.data.message);
    }
  }

  return (
    <div>
      {messg && <div className="bg-danger text-center w-50 mx-auto text-white p-3 rounded">{messg}</div>}
      <input placeholder='userName' name='userName' onChange={handelChange}/>
      <input type='password' name='password' onChange={handelChange} />
      <button onClick={handelLogin}>Login</button>
    </div>  
  )
}

export default Login