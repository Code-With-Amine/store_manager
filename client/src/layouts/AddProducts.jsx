import React, { useState, useRef } from "react";
import { addProduct } from "../functions/products";
import { useSelector } from "react-redux";

function AddProductForm() {
  const [formData, setFormData] = useState({
    CatId: "",
    ProdName: "",
    ProdLogo: "",
    price: "",
    Qte: "",
    WarnQte: "",
    FactoryDate: "",
    ExperDate: "",
  });
  const [messg, setMessg] = useState(null);
  const imgRef = useRef();
  const categories = useSelector((state) => state.storeReducer.categories);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1]; // Extracts the encoded data after comma
      setFormData((prev) => ({ ...prev, ProdLogo: base64Data }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addProduct(formData);
      setMessg(res);
    } catch (error) {
      setMessg("Error: " + error.message);
      console.error(error);
    }
    setTimeout(()=> {
        setMessg(null)
    }, 3000)
  };

  const handleImageClickSimulation = () => {
    imgRef.current.click();
  };

  return (
    <form
      className="form d-flex flex-column gap-5 pt-5 p-4 w-75 mx-auto"
      onSubmit={handleSubmit}
    >
      {messg && (
        <div className="bg-primary text-center w-50 mx-auto text-white p-3 rounded">
          {messg}
        </div>
      )}

      <div className="form--dataContainer">
        <div className="form--dataInput">
          <label>Category</label>
          <select name="CatId" onChange={handleChange}>
            {categories.length > 0 ? (
              <>
                <option>choose a category</option>
                {categories.map((category) => (
                  <option key={category.CatId} value={category.CatId}>
                    {category.CatName}
                  </option>
                ))}
              </>
            ) : (
              <option> there are no categories</option>
            )}
          </select>
        </div>
        <div className="form--dataInput">
          <label>Product Name:</label>
          <input
            type="text"
            name="ProdName"
            value={formData.ProdName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="form--dataContainer">
        <div className="form--dataInput">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form--dataInput">
          <input
            className="d-none"
            ref={imgRef}
            type="file"
            name="ProdLogo"
            onChange={handleImageUpload}
          />
          <div
            className="form__fakeUplade"
            onClick={handleImageClickSimulation}
          >
            Upload Logo
          </div>
        </div>
      </div>

      <div className="form--dataContainer">
        <div className="form--dataInput">
          <label>Quantity:</label>
          <input
            type="number"
            name="Qte"
            value={formData.Qte}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form--dataInput">
          <label>Warning Quantity:</label>
          <input
            type="number"
            name="WarnQte"
            value={formData.WarnQte}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form--dataContainer">
        <div className="form--dataInput">
          <label>Factory Date:</label>
          <input
            type="date"
            name="FactoryDate"
            value={formData.FactoryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form--dataInput">
          <label>Expiration Date:</label>
          <input
            type="date"
            name="ExperDate"
            value={formData.ExperDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit" className="form--submitBtn">
        Submit
      </button>
    </form>
  );
}

export default AddProductForm;
