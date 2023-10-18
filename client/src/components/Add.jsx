import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Add = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: '',
    name: '',
    description: '',
    price: ''
  })

  const handleChange = (e) =>{
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))    
  }
  const addItemReq = async () =>{
    axios.post('http://localhost:5000/api/items',
      inputs
    )
    .catch(err => console.log(err))
  }
 const handleSubmit =(e) =>{
    e.preventDefault()
    addItemReq()
    navigate('/')
 }
  return (
    <div className="flex justify-center mt-20">
      <div className=" bg-gray-100 h-96 w-[27rem] rounded-xl  shadow-xl p-3">
      <p className='text-center mb-3'>Add Product</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input name='id' onChange={handleChange} value={inputs.id} className='rounded-md h-10 pl-2 focus:outline-none' type="number" placeholder='Product id' />
        <input name='name' onChange={handleChange} value={inputs.name} className='rounded-md h-10 pl-2 focus:outline-none' type="text" placeholder='Product Name' />
        <input name='description' onChange={handleChange} value={inputs.tittitlele} className='rounded-md h-10 pl-2 focus:outline-none' type="text" placeholder='Product Description' />
        <input name='price' onChange={handleChange} value={inputs.price} className='rounded-md h-10 pl-2 focus:outline-none' type="number" placeholder='Product Price' />
        <div className='flex justify-end gap-3 mt-4'>
          <button className='bg-blue-600 text-white p-1 px-2 rounded-md'>Submit</button>
          <Link to='/'><button className='bg-red-600 text-white p-1 px-2 rounded-md '>Cancel</button></Link>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Add