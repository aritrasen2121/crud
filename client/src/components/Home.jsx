import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Items from './Items'
import { Link, useNavigate } from 'react-router-dom'
//soumik roy sourashis ghosh
const Home = () => {
    const [items, setItems] = useState()
    const [edititem, setEditItem] = useState()
    const [edititemid, setEditItemId] = useState()
    const [open, setOpen] = useState(false)
    const [currPage, setCurrPage] = useState(1)
    const navigate = useNavigate()

    const getItems = async () => {
        await axios.get(`http://localhost:5000/api/items?currPage=${currPage}`)
            .then(res => setItems(res.data))
            .catch(err => console.log(err))
    }
    const handleNextPage = () => {
        if (items && items.length == 5) {
            setCurrPage(currPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currPage > 1) {
            setCurrPage(currPage - 1)
        }
    }

    const handleEdit = (id) => {
        setOpen(true)
        getItemById(id)
        setEditItemId(id)
    }
    const getItemById = async (id) => {
        await axios.get(`http://localhost:5000/api/items/${id}`)
            .then(res => setEditItem(res.data))
            .catch(err => console.log(err))
    }
    const editItemReq = async (id) => {
        axios.put(`http://localhost:5000/api/items/${id}`,
            edititem
        )
            .then(() => getItems(currPage))
            .catch(err => console.log(err))
    }
    const handleChange = (e) => {
        setEditItem((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        editItemReq(edititemid)
        setOpen(false)
        setEditItem()
        setEditItemId()
    }
    useEffect(() => {
        getItems(currPage)
    }, [currPage])

    const deleteReq = async (id) => {
        axios.delete(`http://localhost:5000/api/items/${id}`)
            .then(() => navigate('/'))
            .catch(err => console.log(err))
        setItems(
            items.filter((item) => {
                return item._id !== id;
            })
        );
    }
    return (
        <div className=' my-10 flex flex-col items-center '>
            <h1 className='text-3xl mb-3'>Items Table</h1>
            <div className={`p-8 rounded-xl bg-gray-100 w-full md:w-2/4 overflow-auto ${open ? 'blur-[2px]' : 'blur-none'}`}>
                <Link to='/add'><button className='bg-blue-600 text-white p-1 px-2 rounded-md mb-3' >Add Item</button></Link>
                {items ?
                    <table className="w-72 sm:w-full bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                return (
                                    <Items key={item._id} item={item} handleEdit={handleEdit} deleteReq={deleteReq} />
                                )
                            })}
                        </tbody>
                    </table> :
                    <div className=' flex justify-center'>
                        <svg aria-hidden="true" className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                }
                <div className='flex justify-end gap-5 mt-2 '>
                    <button className={`${currPage === 1 ? 'text-gray-500 ' : 'text-blue-500 '}`} onClick={handlePrevPage}>Prev Page</button>
                    <button className={`${items && items.length != 5 ? 'text-gray-500 ' : 'text-blue-500 '}`} onClick={handleNextPage}>Next Page</button>
                </div>
            </div>

            {
                open && edititem ?
                    <div className=" absolute top-44 bg-gray-200 h-96 w-[27rem] rounded-xl  shadow-xl p-5">
                        <p className='text-center mb-3'>Edit Product</p>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                            <input name='id' value={edititem.id} disabled={true} className='rounded-md h-10 pl-2 bg-white' type="number" placeholder='Product id' />
                            <input name='name' onChange={handleChange} value={edititem.name} className='rounded-md h-10 pl-2' type="text" placeholder='Product Name' />
                            <input name='description' onChange={handleChange} value={edititem.description} className='rounded-md h-10 pl-2' type="text" placeholder='Product Description' />
                            <input name='price' onChange={handleChange} value={edititem.price} className='rounded-md h-10 pl-2' type="number" placeholder='Product Price' />
                            <div className='flex justify-end gap-3 mt-4'>
                                <button className='bg-blue-600 text-white p-1 px-2 rounded-md' type='submit' >Submit</button>
                                <button className='bg-red-600 text-white p-1 px-2 rounded-md ' onClick={() => { setOpen(false); setEditItem(); setEditItemId() }}>Cancel</button>
                            </div>
                        </form>
                    </div> :
                    <></>
            }
        </div>
    )
}

export default Home