import React, { useRef, useState, useEffect } from "react";
import { addCategory } from "../functions/categories";

function AddCategory() {
  const [formData, setFormData] = useState({
    CatName: "",
    catPhoto: "",
  });
  const [messg, setMessg] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State variable to control alert display
  const imgRef = useRef();
  const displayImageStyle = {
    width: "30rem",
    height: "300px",
    borderRadius: "22px",
  };

  const handelImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(e.target.files[0]));

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1]; // Extracts the encoded data after comma
      setFormData((prev) => ({ ...prev, catPhoto: base64Data }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setMessg(null);
    setShowAlert(false); // Hide the alert when the form data changes
    const { name, value } = e.target;
    if (name === "catPhoto") {
      handelImageUpload(e); // Call handelImageUpload instead of returning it
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handelSubmit = async () => {
    try {
      const response = await addCategory(formData);
      setMessg(response);
      setShowAlert(true); // Show the alert after the message is updated
    } catch (error) {
      setMessg("Error: " + error.message);
      setShowAlert(true); // Show the alert for error messages as well
      console.error(error);
    }
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  useEffect(() => {
    setShowAlert(messg !== null); // Show the alert when messg is not null
  }, [messg]);

  return (
    <div className="w-100 h-100 d-flex gap-5 justify-content-center align-items-center flex-column mt-4">
      {showAlert && (
        <div className="alert alert-primary p-3 mx-auto" role="alert">
          {messg}
        </div>
      )}
      <div className="form--dataInput w-50">
        <label>
          Category name :{" "}
          <i className="fa-solid fa-asterisk form--dataInput__requiredField text-danger"></i>
        </label>
        <input type="text" name="CatName" onChange={handleChange} required />
      </div>
      <div className="form--dataInput d-none">
        <label>Company Logo :</label>
        <input
          ref={imgRef}
          type="file"
          name="catPhoto"
          onChange={handleChange}
        />
      </div>
      <div className="form__fakeUplade" onClick={() => imgRef.current.click()}>
        Upload logo
      </div>
      {selectedImage && (
        <img style={displayImageStyle} src={selectedImage} alt="logo" />
      )}
      <button onClick={handelSubmit} className="form--submitBtn">
        Submit
      </button>
    </div>
  );
}

export default AddCategory;
