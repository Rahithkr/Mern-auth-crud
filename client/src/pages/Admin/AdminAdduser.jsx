import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'


function AdminAdduser() {
const navigate=useNavigate();
  const[formData,setFormData]=useState({})
  const [error,setError]=useState(false)
  const[loading,setLoading ]=useState(false)
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      setError(false)
      const res=await fetch('/server/admin/dashboard/adduser',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json();
     console.log(data);
      setLoading(false)
      if(data.success===false){
        setError(true)
        return;
      }
   
    navigate('/dashboard')
  } catch (error) {
    setLoading(false);
    setError(true);
  }
   

  }
  return (
    <>
   
    <div>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-bold'>Add user</h1>
       <form  className='flex flex-col gap-4' onSubmit={handleSubmit}>
         <input type="text" placeholder='username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
         <input type="text" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>

         <input type="text" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>{loading ? 'Loading...' : 'Add user'}</button>
       </form>
       <div className='flex gap-3 mt-2 '>
       
       </div>
       <p className='text-red-700 mt-5'>{error && 'something went wrong'}</p>
      </div>
    </div>
    </>
  )
}

export default AdminAdduser