import React, { useState } from 'react'
import AdminNav from '../../components/AdminNav'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStart,updateUserFailure,updateUserSuccess } from '../../redux/userSlice';
import axios from 'axios';



function AdminEdit() {

const dispatch=useDispatch()
const navigate=useNavigate();

  const[form,setForm]=useState({})
  
    const { id } = useParams();
    const userDetail=useSelector((state)=>state.admin.currentAdmin.userDetail)
const currentUser=userDetail.find((user)=>user._id===id)


const handleChange=(e)=>{
    setForm({...form,[e.target.id]:e.target.value})
     }
     console.log("form",form);

const handleSubmit=async(e)=>{
e.preventDefault();
try {
    dispatch(updateUserStart())
    const res=await axios.post(`/server/admin/dashboard/edituser/${id}`,form,{
       headers:{
        'Content-Type':'application/json'
       } 
    })
    const data=res.data;
    if(data.success===false){
        dispatch(updateUserFailure(data))
        return;
    }
    dispatch(updateUserSuccess(data))
navigate('/dashboard')
} catch (error) {
    console.log(error);
    dispatch(updateUserFailure(error))
}
}


  return (
    <>
    <AdminNav/>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        {/* <input className='hidden'  name='profileImage' type="file" ref={fileRef} onChange={(e)=>setImage(e.target.files[0])} accept='image/*' /> */}
        {/* allow read;
      allow write: if request.auth !=null &&
      request.resource.size<2 * 1024 &&
      request.resource.contentType.matches("image/.*") */}
        {/* <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className='h-24 w-24 self-center mt-2 cursor-pointer rounded-full object-cover'
          onClick={()=>fileRef.current.click()}
        /> */}
        {/* <p className='text-sm self-center'>{imageError ? (
          <span className='text-red-700'> Error uploading image</span>) : imagePercent >0 && imagePercent< 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>) : imagePercent === 100 ? (<span className='text-green-700'>Image uploaded successfully</span>) : '' }</p> */}
        <input onChange={handleChange}  defaultValue={currentUser.username} type="text" id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3' />
        <input onChange={handleChange}   defaultValue={currentUser.email} type="email" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3' />
        <input  onChange={handleChange}  type="password" id='password' placeholder='password' className='bg-slate-100 rounded-lg p-3' />
        <button type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>  update user</button>
      </form>
      <div className='flex justify-between mt-4'>
      
        
      </div>
     
    </div>
    </>
  )
}

export default AdminEdit