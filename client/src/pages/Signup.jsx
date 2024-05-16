import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Header from '../components/Header';

function Signup() {
const navigate=useNavigate();
  const[formData,setFormData]=useState({})
  const [error,setError]=useState(false)
  const[loading,setLoading ]=useState(false)

  const [errors, setErrors] = useState({});


  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();


    const validationErrors = {};
    if (!formData.username) {
      validationErrors.username = "Username is required";
    }
    if (!formData.email) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    }
    setErrors(validationErrors);


    if (Object.keys(validationErrors).length > 0) {
      return; // Stop submission if there are validation errors
    }
    try {
      setLoading(true)
      setError(false)
      const res=await fetch('/server/auth/signup',{
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
   
    navigate('/signin')
  } catch (error) {
    setLoading(false);
    setError(true);
  }
   

  }
  return (
    <>
    <Header/>
    <div>
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-bold'>Sign Up</h1>
       <form  className='flex flex-col gap-4' onSubmit={handleSubmit}>
         <input type="text" placeholder='username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
         {errors.username && <p className='text-red-500'>{errors.username}</p>}
         <input type="text" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
         {errors.email && <p className='text-red-500'>{errors.email}</p>}

         <input type="text" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
         {errors.password && <p className='text-red-500'>{errors.password}</p>}
          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>{loading ? 'Loading...' : 'Sign up'}</button>
       </form>
       <div className='flex gap-3 mt-2 '>
        <p>Already Have An Account?</p>
    <Link to='/signin'>
        <span className='text-blue-500'>Sign in</span>
        </Link>
       </div>
       <p className='text-red-700 mt-5'>{error && 'something went wrong'}</p>
      </div>
    </div>
    </>
  )
}

export default Signup