import { axiosClient } from "../api/axios";

export const addProduct = async (data) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  try {
    axiosClient.get("/sanctum/csrf-cookie");
    const res = await axiosClient.post("/api/addProducts", data, { headers });
    return res.data.message;
  } catch (err) {
    console.log(err);
  }
};

export const FetchProducts = async (catID, p) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  axiosClient.get("/sanctum/csrf-cookie");
  const res = await axiosClient.get(`/api/products/${catID}/${p}`, { headers });
  return res.data;
};
