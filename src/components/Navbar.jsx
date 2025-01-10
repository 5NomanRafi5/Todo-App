import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-cyan-800 text-white justify-around py-2'>
        <div className="logo font-bold mx-9 text-xl">
         iTask
        </div>
        <ul className='flex  mx-9 gap-5'>
            <li className='hover:font-bold cursor-pointer transition-all'>Home </li>
            <li className='hover:font-bold cursor-pointer transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
