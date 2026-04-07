
// import React, { useState } from 'react'
// import { CgClose } from "react-icons/cg";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import uploadImage from '../helpers/uploadImage';
// import DisplayImage from './DisplayImage';
// import productCategory from '../helpers/productCategory';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';

// const AdminEditProduct = ({ onClose, productData, fetchdata }) => {

//   const [data, setData] = useState({
//     ...productData,
//     productImage: (productData?.productImage || []).filter(Boolean)
//   })

//   const [loading, setLoading] = useState(false)
//   const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
//   const [fullScreenImage, setFullScreenImage] = useState("")

//   const handleOnChange = (e) => {
//     const { name, value } = e.target
//     setData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleUploadProduct = async (e) => {
//     const files = e.target.files
//     if (!files.length) return

//     setLoading(true)

//     try {
//       const uploadedImages = []

//       for (let i = 0; i < files.length; i++) {
//         const res = await uploadImage(files[i])

//         if (res.secure_url) {
//           uploadedImages.push(res.secure_url)
//         } else {
//           throw new Error("Upload failed")
//         }
//       }

//       setData(prev => ({
//         ...prev,
//         productImage: [...prev.productImage, ...uploadedImages]
//       }))

//       toast.success("Images uploaded")

//     } catch (err) {
//       toast.error("Upload failed")
//     }

//     setLoading(false)
//   }

//   const handleDeleteProductImage = (index) => {
//     const newImages = [...data.productImage]
//     newImages.splice(index, 1)

//     setData(prev => ({ ...prev, productImage: newImages }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!data.productImage.length) {
//       toast.error("At least one image required")
//       return
//     }

//     const response = await fetch(SummaryApi.updateProduct.url, {
//       method: SummaryApi.updateProduct.method,
//       credentials: 'include',
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(data)
//     })

//     const result = await response.json()

//     if (result.success) {
//       toast.success(result.message)
//       onClose()
//       fetchdata()
//     } else {
//       toast.error(result.message)
//     }
//   }

//   return (
//     <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>

//       <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[85%] overflow-hidden'>

//         <div className='flex justify-between items-center pb-3 border-b'>
//           <h2 className='font-bold text-lg'>Edit Product</h2>
//           <CgClose className='text-2xl cursor-pointer' onClick={onClose} />
//         </div>

//         <form className='grid gap-3 overflow-y-auto h-full p-2' onSubmit={handleSubmit}>

//           <input name='productName' value={data.productName} onChange={handleOnChange} className='p-2 border rounded' required />
//           <input name='brandName' value={data.brandName} onChange={handleOnChange} className='p-2 border rounded' required />

//           <select name='category' value={data.category} onChange={handleOnChange} className='p-2 border rounded'>
//             {productCategory.map((el, i) => (
//               <option key={i} value={el.value}>{el.label}</option>
//             ))}
//           </select>

//           <label className='border p-4 flex flex-col items-center cursor-pointer'>
//             <FaCloudUploadAlt className='text-4xl' />
//             <input type='file' multiple hidden onChange={handleUploadProduct} />
//           </label>

//           {loading && <p>Uploading...</p>}

//           <div className='flex flex-wrap gap-2'>
//             {data.productImage.map((img, i) => (
//               <div key={i} className='relative group'>
//                 <img src={img} className='w-20 h-20 object-cover border' />
//                 <MdDelete className='absolute top-0 right-0 bg-red-600 text-white p-1 rounded hidden group-hover:block cursor-pointer'
//                   onClick={() => handleDeleteProductImage(i)} />
//               </div>
//             ))}
//           </div>

//           <input type='number' name='price' value={data.price} onChange={handleOnChange} className='p-2 border rounded' />
//           <input type='number' name='sellingPrice' value={data.sellingPrice} onChange={handleOnChange} className='p-2 border rounded' />

//           <textarea name='description' value={data.description} onChange={handleOnChange} className='p-2 border rounded' />

//           <button className='bg-red-600 text-white p-2 rounded'>
//             Update Product
//           </button>

//         </form>

//       </div>

//       {openFullScreenImage && (
//         <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />
//       )}

//     </div>
//   )
// }

// export default AdminEditProduct

import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import productCategory from '../helpers/productCategory';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {

  const [data, setData] = useState({
    ...productData,
    productImage: (productData?.productImage || []).filter(Boolean)
  })

  const [loading, setLoading] = useState(false)
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleUploadProduct = async (e) => {
    const files = e.target.files
    if (!files.length) return

    setLoading(true)

    try {
      const uploadedImages = []

      for (let i = 0; i < files.length; i++) {
        const res = await uploadImage(files[i])

        if (res.secure_url) {
          uploadedImages.push(res.secure_url)
        } else {
          throw new Error("Upload failed")
        }
      }

      setData(prev => ({
        ...prev,
        productImage: [...prev.productImage, ...uploadedImages]
      }))

      toast.success("Images uploaded")

    } catch (err) {
      toast.error("Upload failed")
    }

    setLoading(false)
  }

  const handleDeleteProductImage = (index) => {
    const newImages = [...data.productImage]
    newImages.splice(index, 1)
    setData(prev => ({ ...prev, productImage: newImages }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!data.productImage.length) {
      toast.error("At least one image required")
      return
    }

    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (result.success) {
      toast.success(result.message)
      onClose()
      fetchdata()
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-40 flex justify-center items-center'>

      <div className='bg-white p-4 rounded w-full max-w-2xl h-[85vh] flex flex-col'>

        {/* HEADER */}
        <div className='flex justify-between items-center pb-3 border-b'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <CgClose className='text-2xl cursor-pointer' onClick={onClose} />
        </div>

        {/* FORM SCROLL AREA */}
        <form 
          className='flex-1 overflow-y-auto px-2 py-3 space-y-4'
          onSubmit={handleSubmit}
        >

          {/* PRODUCT NAME */}
          <div>
            <label className='block text-sm font-medium mb-1'>Product Name</label>
            <input 
              name='productName' 
              value={data.productName} 
              onChange={handleOnChange} 
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400'
              required 
            />
          </div>

          {/* BRAND */}
          <div>
            <label className='block text-sm font-medium mb-1'>Brand Name</label>
            <input 
              name='brandName' 
              value={data.brandName} 
              onChange={handleOnChange} 
              className='w-full p-2 border rounded focus:ring-2 focus:ring-red-400'
              required 
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className='block text-sm font-medium mb-1'>Category</label>
            <select 
              name='category' 
              value={data.category} 
              onChange={handleOnChange} 
              className='w-full p-2 border rounded'
            >
              {productCategory.map((el, i) => (
                <option key={i} value={el.value}>{el.label}</option>
              ))}
            </select>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className='block text-sm font-medium mb-2'>Product Images</label>

            <label className='border p-4 flex flex-col items-center cursor-pointer rounded bg-gray-50 hover:bg-gray-100'>
              <FaCloudUploadAlt className='text-4xl text-gray-500' />
              <p className='text-sm'>Upload Images</p>
              <input type='file' multiple hidden onChange={handleUploadProduct} />
            </label>

            {loading && <p className='text-blue-500 text-sm mt-1'>Uploading...</p>}

            {/* IMAGE PREVIEW */}
            <div className='flex flex-wrap gap-2 mt-3'>
              {data.productImage.map((img, i) => (
                <div key={i} className='relative group'>
                  <img 
                    src={img} 
                    className='w-20 h-20 object-cover border rounded cursor-pointer'
                    onClick={() => {
                      setFullScreenImage(img)
                      setOpenFullScreenImage(true)
                    }}
                  />
                  <MdDelete 
                    className='absolute top-0 right-0 bg-red-600 text-white p-1 rounded hidden group-hover:block cursor-pointer'
                    onClick={() => handleDeleteProductImage(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div>
            <label className='block text-sm font-medium mb-1'>Price</label>
            <input 
              type='number' 
              name='price' 
              value={data.price} 
              onChange={handleOnChange} 
              className='w-full p-2 border rounded'
            />
          </div>

          {/* SELLING PRICE */}
          <div>
            <label className='block text-sm font-medium mb-1'>Selling Price</label>
            <input 
              type='number' 
              name='sellingPrice' 
              value={data.sellingPrice} 
              onChange={handleOnChange} 
              className='w-full p-2 border rounded'
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className='block text-sm font-medium mb-1'>Description</label>
            <textarea 
              name='description' 
              value={data.description} 
              onChange={handleOnChange} 
              className='w-full p-2 border rounded h-24'
            />
          </div>

          {/* BUTTON */}
          <button 
            className='w-full bg-red-600 text-white p-2 rounded hover:bg-red-700'
          >
            Update Product
          </button>

        </form>

      </div>

      {/* FULL IMAGE VIEW */}
      {openFullScreenImage && (
        <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)} />
      )}

    </div>
  )
}

export default AdminEditProduct