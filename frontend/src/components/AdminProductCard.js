// import React, { useState } from 'react'
// import { MdModeEditOutline } from "react-icons/md";
// import AdminEditProduct from './AdminEditProduct';
// import displayINRCurrency from '../helpers/displayCurrency';

// const AdminProductCard = ({
//     data,
//     fetchdata
// }) => {
//     const [editProduct,setEditProduct] = useState(false)

//   return (
//     <div className='bg-white p-4 rounded '>
//        <div className='w-40'>
//             <div className='w-32 h-32 flex justify-center items-center'>
//               <img src={data?.productImage[0]}  className='mx-auto object-fill h-full'/>   
//             </div> 
//             <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

//             <div>

//                 <p className='font-semibold'>
//                   {
//                     displayINRCurrency(data.sellingPrice)
//                   }
        
//                 </p>

//                 <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
//                     <MdModeEditOutline/>
//                 </div>

//             </div>

          
//        </div>
        
//         {
//           editProduct && (
//             <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
//           )
//         }
    
//     </div>
//   )
// }

// export default AdminProductCard

import React, { useState } from 'react'
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminProductCard = ({ data, fetchdata }) => {

  const [editProduct, setEditProduct] = useState(false)
  const [loading, setLoading] = useState(false)

  // 🔥 DELETE HANDLER
  const handleDelete = async () => {

    const confirmDelete = window.confirm("Are you sure you want to delete this product?")

    if (!confirmDelete) return

    try {
      setLoading(true)

      const response = await fetch(SummaryApi.deleteProduct.url, {
        method: SummaryApi.deleteProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          productId: data?._id
        })
      })

      const result = await response.json()

      if (result.success) {
        toast.success(result.message)
        fetchdata()
      } else {
        toast.error(result.message)
      }

    } catch (err) {
      toast.error("Delete failed")
    }

    setLoading(false)
  }

  return (
    <div className='bg-white p-2  rounded shadow hover:shadow-md transition-all relative md:w-[220px]'>

      {/* 🔥 ACTION BUTTONS (TOP RIGHT) */}
      <div className='absolute top-2 right-2 flex gap-2'>

        {/* EDIT */}
        <div
          className='p-1 bg-green-100 hover:bg-green-600 hover:text-white rounded-full cursor-pointer'
          onClick={() => setEditProduct(true)}
        >
          <MdModeEditOutline size={18} />
        </div>

        {/* DELETE */}
        <div
          className='p-1 bg-red-100 hover:bg-red-600 hover:text-white rounded-full cursor-pointer'
          onClick={handleDelete}
        >
          <MdDelete size={18} />
        </div>

      </div>

      {/* IMAGE */}
      <div className='w-full h-32 flex justify-center items-center mb-2'>
        <img
          src={data?.productImage?.[0]}
          className='object-contain h-full'
          alt={data?.productName}
        />
      </div>

      {/* NAME */}
      <h1 className='text-sm font-medium line-clamp-2 mb-1'>
        {data?.productName}
      </h1>

      {/* PRICE */}
      <p className='font-semibold text-red-600'>
        {displayINRCurrency(data?.sellingPrice)}
      </p>

      {/* LOADING STATE */}
      {loading && (
        <p className='text-xs text-gray-500 mt-1'>Processing...</p>
      )}

      {/* EDIT MODAL */}
      {
        editProduct && (
          <AdminEditProduct
            productData={data}
            onClose={() => setEditProduct(false)}
            fetchdata={fetchdata}
          />
        )
      }

    </div>
  )
}

export default AdminProductCard