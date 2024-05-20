import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Registration";
import ContactUs from './pages/ContactUs'
import NotFound from './pages/NotFound'
import AddProduct from "./Dashboard/Admin-Dashboard/Products/AddProducts";
import ManageProduct from "./Dashboard/Admin-Dashboard/Products/ManageProduct";
import AdminHome from './Dashboard/Admin-Dashboard/AdminHome'
import AdminMainDash from './Dashboard/Admin-Dashboard/AdminMainDash'
import SeeProduct from './Dashboard/Admin-Dashboard/Products/SeeProduct'
import ChatWithAI from './pages/ChatWithAI'
import ViewProduct from './Products/ViewProduct'
import DashHome from './Dashboard/User Dashboard/MainDash/DashHome'
import MainDashHome from './Dashboard/User Dashboard/MainDash/MainDashHome'
import SearchResult from './components/SearchResult'
import UserProfile from './Dashboard/User Dashboard/Pages/UserProfile'
function App() {

  return (
    <>
      

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/chatWithAI" element={<ChatWithAI />} />
        <Route path="/view-product" element={<ViewProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/dashboard/admin/" element={<AdminMainDash />} />
        <Route path="/dashboard/admin" element={<AdminHome />} >
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-product" element={<ManageProduct />} />
          <Route path="see-products" element={<SeeProduct />} />
          <Route path="chatWithAI" element={<ChatWithAI />} />
        </Route>



        <Route path='/dashboard/user' element={<MainDashHome/>}></Route>
        <Route path="/dashboard/user" element={<DashHome />} >
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="chatWithAI" element={<ChatWithAI />} />
        </Route>




    </Routes>


      <ToastContainer />

    </>
  )
}

export default App
