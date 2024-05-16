// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons'


// function AdminDashboard() {


//     const currentAdmin=useSelector((state)=>state.admin.currentAdmin.userDetail)
// console.log(currentAdmin);
//   return (
//     <div className="admin-home-container">
    
//     <table className="user-table">
//       <thead>
//         <tr>
//           <th>Sl. No.</th>
//           <th>Image</th>
//           <th>Username</th>
//           <th>Email</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {currentAdmin.map((user , index ) => (
//           <tr key={user._id}>
//             <td>{index + 1}</td>
            
//             <td>{user.username}</td>
//             <td>{user.email}</td>
//             {/* Add action buttons or links */}
//             <td>
//               <Link to={`profile/${user._id}`} className="edit-button">
//                 <FontAwesomeIcon icon={faEdit} />
//               </Link>
//               <button
//                 className="delete-button"
//                 // onClick={() => confirmDelete(user._id)}
//               >
//                 <FontAwesomeIcon icon={faTrash} />
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//   )
// }

// export default AdminDashboard


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminNav from '../../components/AdminNav';
import { useEffect, useState } from 'react';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess ,signOut} from '../../redux/adminSlice';
import axios from 'axios';

function AdminDashboard() {
    const dispatch = useDispatch()
    const navigate= useNavigate()
  const currentAdmin = useSelector((state) => state.admin.currentAdmin.userDetail);
  const admin = useSelector((state)=>state.admin)
  const [userData,setUserData]=useState([])

  const handleDelete = async(userId)=>{
    try {
        dispatch(deleteUserStart());
        const res = await axios.delete(`/server/admin/dashboard/delete/${userId}`)
        const data = res.data
        if(data.success === false){
          
            dispatch(deleteUserFailure(data))
            return
        }
        fetchuser()
        dispatch(deleteUserSuccess())
       
    } catch (error) {
        console.log(error);
        dispatch(deleteUserFailure(error))
    }
  }


  const handleSignOut=async()=>{
    try {
      await fetch('/server/admin/dashboard/signout')
      dispatch(signOut());
      navigate('/admin')
    } catch (error) {
      console.log(error);
    }
  }


  const fetchuser=async()=>{
    try {
    const res= await fetch('/server/admin/dashboard/getuser',{
        method:"GET"
    })
    const data = await res.json();
    setUserData(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchuser()
    console.log("useEffect");
  },[])

const handleAdduser=async()=>{
    try {
        // await fetch('/server/admin/dashboard/adduser')
        fetchuser()
        navigate('/dashboard/adduser')
      } catch (error) {
        console.log(error);
      }
}
console.log("currentAdmin",currentAdmin);
userData.map((user)=>{
    console.log(user.username);
})
  return (
    <>
    <AdminNav/>
    <div style={{ margin: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>Sl. No.</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>Username</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>Email</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user._id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{index + 1}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.username}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <Link to={`edituser/${user._id}`} style={{ marginRight: '5px', cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button onClick={()=>handleDelete(user._id)} style={{ cursor: 'pointer' }}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-center my-20  gap-20'>
        <button onClick={handleSignOut} className='text-white-700 font-semibold rounded-lg bg-red-700 max-h-50 w-60'>signout</button>
        {/* <Link to='/dashboard/adduser'>
        <button className='text-white-700 font-semibold rounded-lg bg-slate-700 w-60'>add user</button>
        </Link> */}
                <button onClick={handleAdduser} className='text-white-700 font-semibold rounded-lg bg-slate-700 max-h-50 w-60'>add user</button>

      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
