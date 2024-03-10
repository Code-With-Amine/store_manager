import React, { useState } from "react";
import { axiosClient } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../feauturs/storeReducer";
import { useDispatch } from 'react-redux';

function Login() {
  const [formData, setFromData] = useState({
    userName: "",
    password: "",
  });
  const [messg, setMessg] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFromData((prev) => ({ ...prev, [name]: value }));
  };

  const handelLogin = async () => {
    try {
      const sanctum = axiosClient.get("/sanctum/csrf-cookie");
      const res = await axiosClient.post("/api/login", formData);
      if (res.data.status == 200) {
        localStorage.setItem('token',res.data.token);
        dispatch(fetchCategories()); // Dispatch the thunk to fetch data
        return navigate('/dashbord');
      }
      setMessg(res.data.message);
    } catch (err) {
      setMessg(err.data.message);
    }
  };

  return (
    <div className="row gap-2 page-container justify-content-end">
      <div className="col-md-5 col-12 d-flex flex-column justify-content-center gap-5">
        {messg && (
          <div className="bg-danger text-center w-50 mx-auto text-white p-3 rounded">
            {messg}
          </div>
        )}
        <div className="form--dataInput">
          <label>User Name</label>
          <input name="userName" onChange={handelChange} />
        </div>
        <div className="form--dataInput">
          <label>Password</label>
          <input type="password" name="password" onChange={handelChange} />
        </div>
        <button onClick={handelLogin} className="form--submitBtn">
          Login
        </button>
      </div>
      <img src="bgImage.png" className="col-md-6 d-md-block d-none" />
    </div>
  );
}

export default Login;
