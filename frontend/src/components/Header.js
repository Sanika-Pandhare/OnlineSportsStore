import React, { useContext, useState, useEffect, useRef } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart, FaBars, FaTimes, FaHeart } from "react-icons/fa"; // ✅ added FaHeart
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {

  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()

  const [menuDisplay,setMenuDisplay] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [wishlistCount, setWishlistCount] = useState(0) // ✅ added

  const context = useContext(Context)
  const navigate = useNavigate()

  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const menuRef = useRef()

  // 🔥 Close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setMenuDisplay(false)
      }
    }

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [])

  // 🔥 Dummy wishlist count (localStorage optional)
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    setWishlistCount(wishlist.length)
  }, [])

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })
    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }
  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
   <div className="fixed top-0 left-0 w-full z-50">

    <header className='h-16 shadow-md bg-white fixed w-full z-50'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        
        {/* Logo */}
        <Link to={"/"}>
          <Logo w={90} h={50}/>
        </Link>

        {/* Search */}
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input 
            type='text' 
            placeholder='Search product here...' 
            className='w-full outline-none' 
            onChange={handleSearch} 
            value={search}
          />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className='hidden lg:flex items-center gap-6'>
          <Link to="/aboutus" className='hover:text-red-600'>About Us</Link>
          <Link to="/contact" className='hover:text-red-600'>Contact</Link>
        </div>

        {/* Right Side */}
        <div className='flex items-center gap-4 lg:gap-7'>

          {/* Mobile Menu */}
          <div className='lg:hidden text-2xl cursor-pointer' onClick={()=>setMobileMenu(prev => !prev)}>
            { mobileMenu ? <FaTimes/> : <FaBars/> }
          </div>

          {/* 👤 User */}
          {user?._id && (
            <div ref={menuRef} className='relative flex justify-center'>
              <div 
                className='text-3xl cursor-pointer flex justify-center' 
                onClick={()=>setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : <FaRegCircleUser />}
              </div>

              {menuDisplay && (
                <div className='absolute bg-white top-12 right-0 p-2 shadow-lg rounded w-44'>
                  <nav className='flex flex-col'>

                    <Link to={"/profile"} className='hover:bg-slate-100 p-2 rounded'>
                      My Profile
                    </Link>

                    {user?.role === ROLE.ADMIN && (
                      <Link to={"/admin-panel/all-products"} className='hover:bg-slate-100 p-2 rounded'>
                        Admin Panel
                      </Link>
                    )}

                    <button onClick={handleLogout} className='text-left hover:bg-red-100 p-2 rounded text-red-600'>
                      Logout
                    </button>

                  </nav>
                </div>
              )}
            </div>
          )}

          {/* ❤️ Wishlist */}
          {user?._id && (
            <Link to={"/wishlist"} className='text-2xl relative'>
              <FaHeart className='text-gray-700 hover:text-red-600'/>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-xs'>{wishlistCount}</p>
              </div>
            </Link>
          )}

          {/* 🛒 Cart */}
          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <FaShoppingCart/>
              <div className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-xs'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {/* Login */}
          {!user?._id && (
            <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>
              Login
            </Link>
          )}

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className='lg:hidden bg-white w-full shadow-md absolute top-16 left-0 flex flex-col p-4 gap-4'>
          <Link to="/aboutus">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
      )}

    </header>
   </div>
  )
}

export default Header