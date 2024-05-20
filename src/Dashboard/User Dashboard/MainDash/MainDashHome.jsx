import React, { useEffect } from 'react';
import { Outlet, Link,useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import DashHome from './DashHome';
import {app} from "../../../firebase/Firebase"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { toast } from 'react-toastify';
import Loader from "../../../components/Loader"
const MainContent = () => {
  const navigate = useNavigate();
   useEffect(() => {
    const auth = getAuth(app);
     onAuthStateChanged(auth, (user) => {
      if (!user) {
        <Loader/>
        navigate('/login');
      }
    });
  }, []);


  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 19000, 16000, 22000, 18000, 25000, 20000, 23000, 27000, 21000, 19000, 25000],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  const customerData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Customers',
        data: [500, 700, 600, 800, 650, 900, 750, 850, 1000, 800, 700, 900],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  React.useEffect(() => {
    const salesChart = new Chart(document.getElementById('salesChart'), {
      type: 'line',
      data: salesData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const customerChart = new Chart(document.getElementById('customerChart'), {
      type: 'bar',
      data: customerData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      salesChart.destroy();
      customerChart.destroy();
    };
  }, []);



  return (
    <div className="p-10 bg-gray-100 rounded relative -left-20">
      {/* Navigation Bar */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8">
        <nav className="flex justify-between items-center">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-500 transition duration-300 px-3 py-2 rounded-md"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="text-gray-700 hover:text-indigo-500 transition duration-300 px-3 py-2 rounded-md"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-700 hover:text-indigo-500 transition duration-300 px-3 py-2 rounded-md"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/customers"
                className="text-gray-700 hover:text-indigo-500 transition duration-300 px-3 py-2 rounded-md"
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className="text-gray-700 hover:text-indigo-500 transition duration-300 px-3 py-2 rounded-md"
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link
                to="/marketing"
                className="text-gray-700 hover:text-indigo-500 transition duration-300 px-3 py-2 rounded-md"
              >
                Marketing
              </Link>
            </li>
          </ul>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <svg
                className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 transform -translate-y-1/2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center bg-gray-200 rounded-full p-2">
              <img
                src="https://via.placeholder.com/32"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-gray-700">John Doe</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <canvas id="salesChart"></canvas>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">New Customers</h2>
          <canvas id="customerChart"></canvas>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          <ul>
            <li className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Product A</span>
              <span className="text-gray-500">1,200 sold</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Product B</span>
              <span className="text-gray-500">980 sold</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Product C</span>
              <span className="text-gray-500">750 sold</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700">Product D</span>
              <span className="text-gray-500">620 sold</span>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <ul>
            <li className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Order #12345</span>
              <span className="text-gray-500">$99.99</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Order #67890</span>
              <span className="text-gray-500">$149.99</span>
            </li>
            <li className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Order #24680</span>
              <span className="text-gray-500">$79.99</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-700">Order #13579</span>
              <span className="text-gray-500">$129.99</span>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Customer Feedback</h2>
          <div className="flex items-center mb-4">
            <div className="bg-green-100 text-green-800 rounded-full p-2 mr-2">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-700">"Excellent service! Highly recommended."</span>
          </div>
          <div className="flex items-center">
            <div className="bg-red-100 text-red-800 rounded-full p-2 mr-2">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-gray-700">"Product quality could be better."</span>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Latest News</h2>
          <ul>
            <li className="mb-4">
              <h3 className="text-gray-700 font-semibold">New Product Launch</h3>
              <p className="text-gray-500">
                We're excited to announce the launch of our new product line, featuring innovative designs and cutting-edge technology.
              </p>
            </li>
            <li>
              <h3 className="text-gray-700 font-semibold">Special Promotion</h3>
              <p className="text-gray-500">
                Don't miss our limited-time promotion! Get 20% off on selected items until the end of the month.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const MainDashHome = () => {
  return (
    <>
      <div className="flex h-screen">
        <DashHome />
        <MainContent />
      </div>
    </>
  );
};

export default MainDashHome;