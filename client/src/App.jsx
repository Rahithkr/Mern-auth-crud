import { Routes,Route,BrowserRouter as Router } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"

import PrivateRoute from "./components/PrivateRoute"
import AdminLogin from "./pages/Admin/AdminLogin"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import AdminEdit from "./pages/Admin/AdminEdit"
import AdminAdduser from "./pages/Admin/AdminAdduser"

function App() {
  return (
   <Router>

    
    <Routes>

     <Route path="/signin" element={<Signin/>}/>
     <Route path="/signup" element={<Signup/>}/>
     <Route element={<PrivateRoute/>}>
     <Route path="/" element={<Home/>}/>
     <Route path="/about" element={<About/>}/>
     <Route path="/profile" element={<Profile/>}/>
     </Route>
     <Route path="/admin" element={<AdminLogin/>}/>
     <Route path="/dashboard" element={<AdminDashboard/>}/>
     <Route path="/dashboard/edituser/:id" element={<AdminEdit/>}/>
     <Route path='/dashboard/adduser' element={<AdminAdduser/>}/>

    </Routes>
   </Router>


  
  )
}

export default App