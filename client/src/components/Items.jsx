import React, { useState } from 'react'


const Items = ({item,handleEdit,deleteReq}) => {
  return (
      <>
      <tr>
      <td className="border-b p-3 md:p-4  text-center border-slate-300 ...">{item.id}</td>
      <td className="border-b p-3 md:p-4  text-center border-slate-300 ...">{item.name}</td>
      <td className="border-b p-3 md:p-4  text-center border-slate-300 ...">{item.description}</td>
      <td className="border-b p-3 md:p-4  text-center border-slate-300 ...">{item.price}</td>
      <td className="border-b p-3 md:p-4  text-center border-slate-300 ...">
        <button className='bg-blue-400 text-white p-1 px-2 rounded-md' onClick={()=>handleEdit(item._id)}>Edit</button>
      </td>
      <td className="border-b p-3 md:p-4  text-center mx-auto border-slate-300 ...">
        <button className='bg-red-600 text-white p-1 px-2 rounded-md' onClick={() => deleteReq(item._id)}>Delete</button>
      </td>      
    </tr>
    
      </>
  )
}

export default Items