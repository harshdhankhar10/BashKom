import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FaProductHunt, FaClipboardList, FaUser, FaCog, FaRocketchat } from 'react-icons/fa';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { app } from "../../firebase/Firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Loader from "../../components/Loader";
import {FaPowerOff} from "react-icons/fa";

const AdminHome = () => {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showOrdersDropdown, setShowOrdersDropdown] = useState(false);
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const checkUserRole = async (user) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        if (userData.role !== 'admin') {
          navigate('/dashboard/user');
        } else {
          setLoading(false);
        }
      } catch (error) {
        toast.error('Error fetching user role');
        navigate('/login'); // Redirect to login on error
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        checkUserRole(user);
      } else {
        navigate('/login'); // Redirect to login if no user is authenticated
      }
    });
  }, [navigate]);

  const toggleDropdown = (dropdownSetter, currentState) => {
    dropdownSetter(!currentState);
  };

  useEffect(() => {
    // Close all dropdowns when navigating to a new route
    setShowProductsDropdown(false);
    setShowOrdersDropdown(false);
    setShowUsersDropdown(false);
    setShowSettingsDropdown(false);
  }, [location.pathname]);


  return (
    <div className="flex h-screen bg-gray-100">
      <div className="sideNav h-screen sticky top-0 bg-white shadow-lg px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bashkom---ecommerce.appspot.com/o/mainLogo.png?alt=media&token=b3b4ffc9-71d5-4cd0-8016-3e15e0e6869f"
              className="w-16 h-16 object-cover rounded-full border border-gray-200 shadow-md"
              alt=""
            />
            <span className="text-3xl font-bold ml-4">BashKom</span>
          </div>
          <hr className='my-5'/>
        </div>
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard/admin"
              className={`flex items-center p-2 rounded transition duration-200 ${location.pathname === '/dashboard/admin'
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-gray-200'
              }`}
            >
              <FaClipboardList className="mr-2 text-lg" />
              <span className="text-lg font-semibold">Dashboard</span>
            </Link>
          </li>
          <li>
            <div
              className={`flex items-center justify-between p-2 rounded transition duration-200 cursor-pointer ${showProductsDropdown
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => toggleDropdown(setShowProductsDropdown, showProductsDropdown)}
            >
              <div className="flex items-center">
                <FaProductHunt className="mr-2 text-lg" />
                <span className="text-lg font-semibold">Products</span>
              </div>
              {showProductsDropdown ? <MdExpandLess /> : <MdExpandMore />}
            </div>
            <ul
              className={`transition-all duration-300 ${showProductsDropdown ? 'max-h-40' : 'max-h-0 overflow-hidden'
              } ml-4 space-y-2`}
            >
              <li>
                <Link
                  to="/dashboard/admin/add-product"
                  className={`block p-2 rounded transition duration-200 ${location.pathname === '/dashboard/admin/add-product'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Add Product
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/manage-product"
                  className={`block p-2 rounded transition duration-200 ${location.pathname === '/dashboard/admin/manage-product'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Manage Products
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/see-products"
                  className={`block p-2 rounded transition duration-200 ${location.pathname === '/dashboard/admin/see-products'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  See Products
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div
              className={`flex items-center justify-between p-2 rounded transition duration-200 cursor-pointer ${showOrdersDropdown
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => toggleDropdown(setShowOrdersDropdown, showOrdersDropdown)}
            >
              <div className="flex items-center">
                <FaClipboardList className="mr-2 text-lg" />
                <span className="text-lg font-semibold">Orders</span>
              </div>
              {showOrdersDropdown ? <MdExpandLess /> : <MdExpandMore />}
            </div>
            <ul
              className={`transition-all duration-300 ${showOrdersDropdown ? 'max-h-40' : 'max-h-0 overflow-hidden'
              } ml-4 space-y-2`}
            >
              <li>
                <Link
                  to="/dashboard/admin/view-orders"
                  className={`block p-2 rounded transition duration-200 ${location.pathname === '/dashboard/admin/view-orders'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  View Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/manage-orders"
                  className={`block p-2 rounded transition duration-200 ${location.pathname === '/dashboard/admin/manage-orders'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Manage Orders
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div
              className={`flex items-center justify-between p-2 rounded transition duration-200 cursor-pointer ${showUsersDropdown
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => toggleDropdown(setShowUsersDropdown, showUsersDropdown)}
            >
              <div className="flex items-center">
                <FaUser className="mr-2 text-lg" />
                <span className="text-lg font-semibold">Users</span>
              </div>
              {showUsersDropdown ? <MdExpandLess /> : <MdExpandMore />}
            </div>
            <ul
              className={`transition-all duration-300 ${showUsersDropdown ? 'max-h-40' : 'max-h-0 overflow-hidden'
              } ml-4 space-y-2`}
            >
              <li>
                <Link
                  to="/dashboard/admin/view-users"
                  className={`block p-2 rounded transition duration-200 ${location.pathname === '/dashboard/admin/view-users'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  View Users
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/manage-users"
                  className={`block p-2 rounded transition duration-200 ${location.pathname === '/dashboard/admin/manage-users'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Manage Users
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div
              className={`flex items-center justify-between p-2 rounded transition duration-200 cursor-pointer ${showSettingsDropdown
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => toggleDropdown(setShowSettingsDropdown, showSettingsDropdown)}
            >
              <div className="flex items-center">
                <FaCog className="mr-2 text-lg" />
                <span className="text-lg font-semibold">Settings</span>
              </div>
              {showSettingsDropdown ? <MdExpandLess /> : <MdExpandMore />}
            </div>
            <ul
              className={`transition-all duration-300 ${showSettingsDropdown ? 'max-h-40' : 'max-h-0 overflow-hidden'
              } ml-4 space-y-2`}
            >
              <li>
                <Link
                  to="/dashboard/admin/account-settings"
                  className={`block p-2 rounded transition duration-200 ${location.pathname === '/dashboard/admin/account-settings'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Account Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/chat-settings"
                  className={`block p-2 rounded transition duration-200 ${location.pathname === '/dashboard/admin/chat-settings'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Chat Settings
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <button
              
              className="flex items-center p-2 rounded transition duration-200 text-gray-800 hover:bg-gray-200 w-full text-left"
            >
              <FaPowerOff className="mr-2 text-lg" />
              <span className="text-lg font-semibold">Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="content flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;
