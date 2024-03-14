import {axiosClient} from '../api/axios';

export const addCategory = async (data) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      try{
        axiosClient.get("/sanctum/csrf-cookie");
        const res = await axiosClient.post("/api/addCategory", data, { headers });
        return res.data.message
    }catch(err){
        console.log(err);
    }
    
    }