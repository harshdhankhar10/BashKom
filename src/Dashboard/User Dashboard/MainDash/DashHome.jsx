import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { app } from "../../../firebase/Firebase"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Firestore, doc, getDoc, getFirestore } from 'firebase/firestore';
import Loader from "../../../components/Loader"

const DashHome = () => {
  const [loading, setLoading] = useState(true);
  const [orderDropdown, setOrderDropdown] = useState(false);
  const [accountDropdown, setAccountDropdown] = useState(false);
  const [analyticsDropdown, setAnalyticsDropdown] = useState(false);
  const [marketingDropdown, setMarketingDropdown] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [customersDropdown, setCustomersDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    const checkUserRole = async (user) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        if (userData.role === 'user' || userData.role === 'admin') {
          setLoading(false);
        } else {
          setLoading(false);
          navigate('/login'); // Redirect to login if invalid role
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching user role:', error);
        navigate('/login'); // Redirect to login on error
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        checkUserRole(user);
      } else {
        setLoading(false);
        navigate('/login'); // Redirect to login if no user is authenticated
      }
    });
  }, []);

  const toggleOrderDropdown = () => {
    setOrderDropdown(!orderDropdown);
  };

  const toggleAccountDropdown = () => {
    setAccountDropdown(!accountDropdown);
  };

  const toggleAnalyticsDropdown = () => {
    setAnalyticsDropdown(!analyticsDropdown);
  };

  const toggleMarketingDropdown = () => {
    setMarketingDropdown(!marketingDropdown);
  };

  const toggleProductsDropdown = () => {
    setProductsDropdown(!productsDropdown);
  };

  const toggleCustomersDropdown = () => {
    setCustomersDropdown(!customersDropdown);
  };

  if (loading) {
    return <Loader />; // Display loader while checking user role
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="bg-white shadow-lg rounded p-6 neumorphic w-80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-center mb-8">
              <Link to='/'>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/bashkom---ecommerce.appspot.com/o/mainLogo.png?alt=media&token=b3b4ffc9-71d5-4cd0-8016-3e15e0e6869f"
                  alt="Logo"
                  className="h-16 w-16 mr-4 rounded-full"
                />
              </Link>
              <h1 className="text-4xl font-bold text-gray-800">BashKom</h1>
            </div>
            <hr className='pt-6' />
            <nav className='px-3 text-xl font-semibold py-5'>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-700 hover:text-indigo-500 flex items-center transition duration-300">
                    Dashboard
                  </a>
                </li>
                <li>
                  <button onClick={toggleOrderDropdown} className="text-gray-700 hover:text-indigo-500 flex items-center transition duration-300">
                    Orders
                    <span className="text-gray-400 ml-auto transition duration-300">
                      {orderDropdown ? '-' : '+'}
                    </span>
                  </button>
                  {orderDropdown && (
                    <ul className="ml-8 mt-2 space-y-2 transition duration-300">
                      <li>
                        <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                          See Orders
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                          Manage Orders
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button onClick={toggleProductsDropdown} className="text-gray-700 hover:text-indigo-500 flex items-center transition duration-300">
                    Products
                    <span className="text-gray-400 ml-auto transition duration-300">
                      {productsDropdown ? '-' : '+'}
                    </span>
                  </button>
                  {productsDropdown && (
                    <ul className="ml-8 mt-2 space-y-2 transition duration-300">
                      <li>
                        <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                          Add Product
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                          Manage Products
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button onClick={toggleCustomersDropdown} className="text-gray-700 hover:text-indigo-500 flex items-center transition duration-300">
                    Customers
                    <span className="text-gray-400 ml-auto transition duration-300">
                      {customersDropdown ? '-' : '+'}
                    </span>
                  </button>
                  {customersDropdown && (
                    <ul className="ml-8 mt-2 space-y-2 transition duration-300">
                      <li>
                        <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                          Customer List
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                          Add Customer
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <button onClick={toggleAccountDropdown} className="text-gray-700 hover:text-indigo-500 flex items-center transition duration-300">
                    Account
                    <span className="text-gray-400 ml-auto transition duration-300">
                      {accountDropdown ? '-' : '+'}
                    </span>
                  </button>
                  {accountDropdown && (
                    <ul className="ml-8 mt-2 space-y-2 transition duration-300">
                      <li>
                        <Link to="/dashboard/user/user-profile" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                          Settings
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                    <button onClick={toggleAnalyticsDropdown} className="text-gray-700 hover:text-indigo-500 flex items-center transition duration-300">
                      Analytics
                      <span className="text-gray-400 ml-auto transition duration-300">
                        {analyticsDropdown ? '-' : '+'}
                      </span>
                    </button>
                    {analyticsDropdown && (
                      <ul className="ml-8 mt-2 space-y-2 transition duration-300">
                        <li>
                          <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                            Sales Analytics
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                            Customer Analytics
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li>
                    <button onClick={toggleMarketingDropdown} className="text-gray-700 hover:text-indigo-500 flex items-center transition duration-300">
                      Marketing
                      <span className="text-gray-400 ml-auto transition duration-300">
                        {marketingDropdown ? '-' : '+'}
                      </span>
                    </button>
                    {marketingDropdown && (
                      <ul className="ml-8 mt-2 space-y-2 transition duration-300">
                        <li>
                          <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                            Social Media
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-gray-600 hover:text-indigo-500 transition duration-300">
                            Email Marketing
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
            <div className="mt-auto">
              <button className="bg-indigo-500 text-white rounded px-10 py-3 hover:bg-indigo-600 transition duration-300">
                Logout
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-10 bg-gray-100 rounded-r-3xl">
            <Outlet />
          </div>
        </div>
      </>
    );
}

export default DashHome;

