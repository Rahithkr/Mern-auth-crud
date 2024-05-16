// import React, { useRef } from 'react'
// import { useSelector } from 'react-redux'
// function Profile() {
  
//   const {currentUser}=useSelector((state)=>state.user)
//   const fileRef=useRef(null)
//   const handleUpload = () => {
//     if (fileRef.current) {
//       fileRef.current.click();
//     }
//     console.log(fileRef.current);
//   };



//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
//       <form className='flex flex-col gap-4' >
//         <input className='hidden' type="file" ref={fileRef} />
//         <img  src={currentUser.profilePicture} alt="profile"  className='h-24 w-24 self-center mt-2 cursor-pointer rounded-full object-cover' onClick={handleUpload}/>
//         <input defaultValue={currentUser.username} type="text" id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3' />
//         <input defaultValue={currentUser.email} type="email" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3' />
//         <input type="password" id='password' placeholder='password' className='bg-slate-100 rounded-lg p-3' />
//         <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Update</button>
//       </form>
//       <div className='flex justify-between mt-4'> 
//         <span className='text-red-700 font-semibold cursor-pointer '>Delete Account</span>
//         <span className='text-red-700 font-semibold cursor-pointer '>Sign out</span>
//       </div>
//     </div>
//   )
// }

// export default Profile







import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess,updateUserFailure ,signOut} from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';


function Profile() {
  const fileRef = useRef(null);
  const [image,setImage] = useState(undefined);
  const[imagePercent,setImagePercent]=useState(0);
  const [imageError,setImageError]=useState(false);
  const[formData,setFormData]=useState({});
  const[updateSuccess,setUpdateSuccess]=useState(false);
  
  const { currentUser ,loading,error} = useSelector((state) => state.user);

  const dispatch=useDispatch();
useEffect(()=>{
  if(image){
    handleFileUpload(image);
  }
},[image]);
 
 
  
   const handleFileUpload= async(image)=>{
    const storage =getStorage(app);
   const fileName=new Date().getTime() + image.name;
   const storageRef=ref(storage,fileName);
   const uploadTask= uploadBytesResumable(storageRef,image); 
  
 uploadTask.on(
  'state_changed',
  (snapshot)=>{
    const progress=(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('upload is' +progress + '% done');
    setImagePercent(Math.round(progress));
  },
    (error)=>
    {
      setImageError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
     setFormData({...formData,profilePicture:downloadURL}));
      });
    
  }
 const handleChange=(e)=>{
setFormData({...formData,[e.target.id]:e.target.value})
 }
  
 const handleSubmit= async(e)=>{
e.preventDefault();
try {
  console.log(formData);
  dispatch(updateUserStart());
  const res = await fetch(`/server/user/update/${currentUser._id}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
});

  const data=await res.json();
  if(data.success === false){
    dispatch(updateUserFailure(data))
    return;
  }
  dispatch(updateUserSuccess(data));
  setUpdateSuccess(true);
} catch (error) {
  dispatch(updateUserFailure(error))
}
 }

  const handleSignOut=async()=>{
    try {
      await fetch('/server/auth/signout')
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
    <Header/>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form encType='multipart/form-data' className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input className='hidden'  name='profileImage' type="file" ref={fileRef} onChange={(e)=>setImage(e.target.files[0])} accept='image/*' />
        {/* allow read;
      allow write: if request.auth !=null &&
      request.resource.size<2 * 1024 &&
      request.resource.contentType.matches("image/.*") */}
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className='h-24 w-24 self-center mt-2 cursor-pointer rounded-full object-cover'
          onClick={()=>fileRef.current.click()}
        />
        <p className='text-sm self-center'>{imageError ? (
          <span className='text-red-700'> Error uploading image</span>) : imagePercent >0 && imagePercent< 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>) : imagePercent === 100 ? (<span className='text-green-700'>Image uploaded successfully</span>) : '' }</p>
        <input onChange={handleChange} defaultValue={currentUser.username} type="text" id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3' />
        <input  onChange={handleChange} defaultValue={currentUser.email} type="email" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3' />
        <input  onChange={handleChange} type="password" id='password' placeholder='password' className='bg-slate-100 rounded-lg p-3' />
        <button type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>   {loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className='flex justify-between mt-4'>
      
        <span  onClick={handleSignOut} className='text-red-700 font-semibold cursor-pointer '>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'something went wrong'}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && 'user updated successfully'}</p>
    </div>
    </>
  );
}

export default Profile;

