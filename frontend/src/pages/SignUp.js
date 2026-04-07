import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import uploadImage from '../helpers/uploadImage';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import   {chase} from '../assest/banner/chase.jpg'

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  })

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 🔥 CLOUDINARY PROFILE UPLOAD
  const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)

    try {
      const res = await uploadImage(file)

      if (res.secure_url) {
        setData(prev => ({
          ...prev,
          profilePic: res.secure_url
        }))
        toast.success("Profile image uploaded")
      } else {
        throw new Error("Upload failed")
      }

    } catch (err) {
      toast.error("Image upload failed")
    }

    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const response = await fetch(SummaryApi.signUP.url, {
      method: SummaryApi.signUP.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (result.success) {
      toast.success(result.message)
      navigate("/login")
    } else {
      toast.error(result.message)
    }
  }

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>

        <div className='bg-white p-6 w-full max-w-sm mx-auto rounded shadow'>

           <img
              src={data.profilePic || loginIcons}
              alt='profile'
              className='w-full h-full rounded-full object-cover border'
            />


          {/* PROFILE IMAGE */}
          <div className='w-24 h-24 mx-auto relative mb-4'>

            <img
              src={data.profilePic || loginIcons}
              alt='profile'
              className='w-full h-full rounded-full object-cover border'
            />

            <label className='absolute bottom-0 w-full text-xs text-center bg-black bg-opacity-50 text-white cursor-pointer rounded-b-full py-1'>
              {loading ? "Uploading..." : "Upload"}
              <input type='file' hidden onChange={handleUploadPic} />
            </label>

          </div>

          {/* FORM */}
          <form className='flex flex-col gap-3' onSubmit={handleSubmit}>

            {/* NAME */}
            <div>
              <label className='text-sm font-medium'>Name</label>
              <input
                type='text'
                name='name'
                value={data.name}
                onChange={handleOnChange}
                placeholder='Enter your name'
                className='w-full p-2 border rounded mt-1'
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className='text-sm font-medium'>Email</label>
              <input
                type='email'
                name='email'
                value={data.email}
                onChange={handleOnChange}
                placeholder='Enter email'
                className='w-full p-2 border rounded mt-1'
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className='text-sm font-medium'>Password</label>
              <div className='flex border rounded mt-1'>
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  className='w-full p-2 outline-none'
                  required
                />
                <span
                  className='p-2 cursor-pointer'
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className='text-sm font-medium'>Confirm Password</label>
              <div className='flex border rounded mt-1'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  className='w-full p-2 outline-none'
                  required
                />
                <span
                  className='p-2 cursor-pointer'
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* BUTTON */}
            <button className='bg-red-600 text-white py-2 rounded hover:bg-red-700 mt-2'>
              Sign Up
            </button>

          </form>

          <p className='mt-4 text-center text-sm'>
            Already have account?
            <Link to="/login" className='text-red-600 ml-1 hover:underline'>
              Login
            </Link>
          </p>

        </div>

      </div>
    </section>
  )
}

export default SignUp