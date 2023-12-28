import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import Link from 'next/link';


function Navbar() {
    const {user, googleSignIn, logOut} = UserAuth();
    const [loading, setLoading] = useState(true);

    const handleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleSignOut = async () => {
        try{
            await logOut();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const checkAuthenticated = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50))
            setLoading(false)
        }
        checkAuthenticated()
    }, [user])



    return (
    <div class="mt-5 flex items-center justify-center">

<nav class="border-gray-200 px-5 mb-5 space-y-3 md:space-y-0 md:flex md:flex-row md:justify-between items-center md:space-x-5 lg:space-x-10">
  <div class="flex-col flex items-center justify-center space-y-2 md:flex-row md:space-x-5 lg:space-x-10 md:justify-start">
  <a href="/" className='flex items-center justify-center md:justify-start'>
      <span class="text-yellow-500 text-lg font-semibold">News App</span>
  </a>
  <div className=''>
      <div class="relative self-center">
        <div class="absolute inset-y-0 left-0 pl-3 pointer-events-none flex items-center">
          <svg class="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" class="bg-gray-500 text-white sm:text-sm rounded-lg border-2 border-cyan-500 focus:ring-blue-500 focus:border-cyan-500 outline-none block w-full pl-10 p-2" placeholder="Search..."></input>
      </div>
  </div>
  </div>
  <div className='md:flex-row flex flex-col justify-center items-center'>
  <div>
    {loading ? null : !user ? (<div className='flex items-center justify-center md:absolute md:right-5 md:top-7'><button onClick={handleSignIn} className='text-cyan-500 w-56 border-2 border-emerald-500 rounded-full hover:text-emerald-500 hover:bg-gray-800 hover:border-cyan-500 h-10'>Sign-In with Google</button></div>) : (
        <div className='md:flex-row flex flex-col justify-center space-y-3 md:space-y-0 mt-3 md:space-x-7'>
            <div className='flex items-center justify-center'>
        Welcome,&nbsp;<span className='text-emerald-500'>{user.displayName}</span>
        </div>

        <div className='flex items-center justify-center'>
            <Link href={`/userfav/1`} className="text-emerald-500 hover:text-[#59daff] after:block after:content-[''] after:absolute after:h-[3px] after:bg-[#59daff] after:w-[120px] after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left flex-wrap w-fit">Your Favourites</Link>
        </div>
        <div className='flex items-center justify-center md:pl-10'>
        <button onClick={handleSignOut} className='text-cyan-500 w-28 h-12 border-2 border-emerald-500 rounded-full hover:text-emerald-500 hover:bg-gray-800 hover:border-cyan-500'>Log-Out</button>
        </div>
        </div> 
    )}
  </div>
  </div>
</nav>
</div>
  )
}

export default Navbar