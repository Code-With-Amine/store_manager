import React, { useRef, useState } from "react";
import { axiosClient } from "../api/axios";
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    f_name: "",
    l_name: "",
    password: "",
    companyLogo: null,
    password_confirmation: "",
  });
  const navigate = useNavigate();
  const imgRef = useRef();
  const [messg, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handelImageUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1]; // Extracts the encoded data after comma
      setFormData((prev) => ({ ...prev, companyLogo: base64Data }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (formData.password !== formData.password_confirmation) {
      // check the password
      setMessage("Passwords dosn't match ");
    } else {
      handleApiCall();
    }

    setFormData({
      userName: "",
      email: "",
      f_name: "",
      l_name: "",
      companyLogo: null,
      password: "",
      password_confirmation: "",
    });
  };

  const handleApiCall = async () => {
    try {
      axiosClient.get("/sanctum/csrf-cookie");
      const res = await axiosClient.post("/api/signUp", formData);
      console.log(res.data);
      setMessage(res.data.message);
      if(res.data.status == 201){
        return navigate(`/dashbord/${res.data.user}`);
      }
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  const handelImageClickSimulation = () =>{
    imgRef.current.click();
  }

  return (
    <div className="signup-container">
      <img src="bgImage.png" className="bgImage" alt="background image" />
      <form className="form d-flex flex-column gap-5 pt-5 p-4 w-75 mx-auto" onSubmit={handleSubmit}>
        {messg && <div className="bg-danger text-center w-50 mx-auto text-white p-3 rounded">{messg}</div>}
        <div className="form--dataContainer">
          <div className="form--dataInput">
            <label>
              User Name :{" "}
              <i className="fa-solid fa-asterisk form--dataInput__requiredField text-danger"></i>
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form--dataInput">
            <label>
              Email :{" "}
              <i className="fa-solid fa-asterisk form--dataInput__requiredField text-danger"></i>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ex: example@gmail.com"
              required
            />
          </div>
        </div>
        <div className="form--dataContainer">
          <div className="form--dataInput">
            <label>
              First Name :{" "}
              <i className="fa-solid fa-asterisk form--dataInput__requiredField text-danger"></i>
            </label>
            <input
              type="text"
              name="f_name"
              value={formData.f_name}
              placeholder="ex: John"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form--dataInput">
            <label>
                Last Name :
               <i className="fa-solid fa-asterisk form--dataInput__requiredField text-danger"></i>
            </label>
            <input
              type="text"
              name="l_name"
              placeholder="ex: Done"
              value={formData.l_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form--dataInput d-none">
          <label>Company Logo :</label>
          <input ref={imgRef} type="file" name="companyLogo" onChange={handelImageUpload} />
        </div>
          <div className="form__fakeUplade" onClick={handelImageClickSimulation}>
                Upload logo
          </div>
        <div className="form--dataContainer">
          <div className="form--dataInput">
            <label>
              Password :{" "}
              <i className="fa-solid fa-asterisk form--dataInput__requiredField text-danger"></i>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form--dataInput">
            <label>
              Confirm Password :{" "}
              <i className="fa-solid fa-asterisk form--dataInput__requiredField text-danger"></i>
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="form--submitBtn">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
