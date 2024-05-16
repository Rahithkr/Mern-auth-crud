import React from 'react'
import { Link } from 'react-router-dom'

function AdminNav() {

  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center' >
            <Link to='/dashboard'>
            <h1 className='font-bold py-3 px-4 '>Auth admin App</h1>
            </Link>
            <ul className='flex gap-4 m-4'>
                
               
            </ul>
        </div>
    </div>
  )
}

export default AdminNav