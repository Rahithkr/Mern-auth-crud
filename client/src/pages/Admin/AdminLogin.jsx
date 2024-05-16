// import React from 'react'
// import AdminNav from '../../components/AdminNav'
// import { signInStart } from '../../redux/userSlice'

// function AdminLogin() {

    


//   return (
//     <>
//    <AdminNav/>
    
//    <div className='p-3 max-w-lg mx-auto'>
//         <h1 className='text-3xl text-center font-bold'>Admin Sign in</h1>
//        <form  className='flex flex-col gap-4'>
//          <input type="text" placeholder='email' id='email' className='bg-slate-100 p-3 rounded-lg' />

//          <input type="text" placeholder='password' id='password' className='bg-slate-100 p-3 rounded-lg'/>
//           <button  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Sign in</button>
//        </form>
//        <div className='flex gap-3 mt-2 '>
       
    
//       </div>
//     </div>
//     </>
//   )
// }

// export default AdminLogin






import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInFailure ,signInStart,signInSuccess} from "../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "../../components/AdminNav";
import axios from "axios";
function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errors,setErrors]=useState({})
//   const { loading, error } = useSelector((state) => state.admin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors={};
    if(!formData.email){
      validationErrors.email='Email is required'

    }
    if(!formData.password){
      validationErrors.password='Password is required'
    }
    setErrors(validationErrors)
    try {
      dispatch(signInStart());
      // setLoading(true)
      // setError(false)
      const res =await axios.post('/server/admin/dashboard',formData)

      const data =  res.data;
       console.log(data);
      //   setLoading(false)
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        // setError(true)
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure(error));
      // setLoading(false);
      // setError(true);
    }
  };
  return (
    <>
    <AdminNav/>
      <div>
        <div className="p-3 max-w-lg mx-auto">
          <h1 className="text-3xl text-center font-bold"> Admin Sign in</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="email"
              id="email"
              className="bg-slate-100 p-3 rounded-lg"
              onChange={handleChange}
            />
           {errors.email && <p className="text-red-500">{errors.email}</p>}


            <input
              type="text"
              placeholder="password"
              id="password"
              className="bg-slate-100 p-3 rounded-lg"
              onChange={handleChange}
            />
              {errors.password && <p className="text-red-500">{errors.password}</p>}

            <button
              
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
            >
                Sign in
          
            </button>
          </form>
          <div className="flex gap-3 mt-2 ">
          
          </div>
         
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
