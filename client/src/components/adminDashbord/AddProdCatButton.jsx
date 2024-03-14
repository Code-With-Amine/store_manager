import React from 'react'
import { useNavigate } from 'react-router-dom'

function AddProdCatButton() {
    const navigate = useNavigate()
    const handleChange = (e) => {
        const {value} = e.target
        if(value === 'addProduct') return navigate('/addProduct')
        else if(value === 'addCategory') return navigate('/addCategory')
    }
  return (
    <div>
         <select onChange={handleChange} className='addSelect bg-success text-white text-center'>
            <option >Add</option>
            <option value='addProduct'>Product</option>
            <option value='addCategory'>Category</option>
        </select>
    </div>

  )
}

export default AddProdCatButton