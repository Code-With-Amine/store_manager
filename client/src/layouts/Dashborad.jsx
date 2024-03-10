import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashborad() {
  const categories = useSelector((state) => state.storeReducer.categories);
  console.log(categories);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return <div className="">Dashborad</div>;
}

export default Dashborad;
