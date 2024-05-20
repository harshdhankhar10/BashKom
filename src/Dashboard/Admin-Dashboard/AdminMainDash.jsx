import React, { useState } from 'react';
import { FaChartBar, FaShoppingCart, FaUsers, FaBriefcase, FaCog, FaBell, FaAngleDown, FaCalendarAlt, FaClipboardList, FaTags, FaChartPie, FaChartLine } from 'react-icons/fa';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaSearch } from 'react-icons/fa';
Chart.register(...registerables);
import AdminHome from './AdminHome';
const AdminMainDash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data for the charts
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 19, 3, 5, 2, 3, 20, 10, 15, 8, 12, 18],
        fill: false,
        borderColor: '#4c51bf',
        tension: 0.1,
      },
      {
        label: 'Expenses',
        data: [5, 8, 12, 10, 7, 9, 15, 8, 12, 6, 10, 14],
        fill: false,
        borderColor: '#e11d48',
        tension: 0.1,
      },
      {
        label: 'Profit',
        data: [7, 11, -9, -5, -5, -6, 5, 2, 3, 2, 2, 4],
        fill: false,
        borderColor: '#39b54a',
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Direct', 'Referral', 'Social', 'Other'],
    datasets: [
      {
        data: [300, 150, 100, 50],
        backgroundColor: ['#4c51bf', '#e11d48', '#39b54a', '#f1c40f'],
        hoverBackgroundColor: ['#3b3f94', '#b31a3b', '#2e8f3a', '#c29b0a'],
      },
    ],
  };

  const barChartData = {
    labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 900, 1500, 800, 1300],
        backgroundColor: '#4c51bf',
        hoverBackgroundColor: '#3b3f94',
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
    <div>
      <AdminHome/>
    </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-6">
        {/* Top Bar */}
        <div className="bg-gray-900 text-gray-100 py-4 px-6 flex justify-between items-center rounded-lg relative right-4">
          <div className="flex items-center">
            <button
              className="mr-4 lg:hidden text-gray-100 hover:text-gray-400 focus:outline-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h18a1 1 0 0 1 0 2H3a1 1 0 1 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 6h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-5">
          <div className="relative">
            <FaSearch className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400" />
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72  p-2.5"
              placeholder="Search..."
              
            />
          </div>
           <div className='flex items-center'>
           <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-2"
            />
            <span className="mr-2">John Doe</span>
            <FaAngleDown className="text-gray-400" />
           </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <FaShoppingCart className="text-green-500" />
                <h3 className="text-lg font-bold text-gray-800">Total Orders</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">1,234</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <FaUsers className="text-blue-500" />
<h3 className="text-lg font-bold text-gray-800">Total Users</h3>
</div>
<p className="text-2xl font-bold text-gray-800">5,678</p>
</div>
<div className="bg-white rounded-lg shadow-md p-6">
<div className="flex items-center justify-between mb-4">
<FaBriefcase className="text-yellow-500" />
<h3 className="text-lg font-bold text-gray-800">Total Products</h3>
</div>
<p className="text-2xl font-bold text-gray-800">987</p>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Line Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Financial Overview</h3>
          <Line data={lineChartData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Traffic Sources</h3>
          <Pie data={pieChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Product Sales</h3>
          <Bar data={barChartData} />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <FaClipboardList className="mr-2" />
            Recent Orders
          </h3>
          <div className="grid grid-cols-1 divide-y divide-gray-200">
            <div className="py-4 flex items-center justify-between">
              <div>
                <p className="text-gray-800 font-bold">Order #123456</p>
                <p className="text-gray-600">John Doe</p>
              </div>
              <p className="text-green-500 font-bold">$99.99</p>
            </div>
            <div className="py-4 flex items-center justify-between">
              <div>
                <p className="text-gray-800 font-bold">Order #789012</p>
                <p className="text-gray-600">Jane Smith</p>
              </div>
              <p className="text-green-500 font-bold">$149.99</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <FaCalendarAlt className="mr-2" />
            Calendar
          </h3>
          {/* Add your calendar component or integration here */}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <FaTags className="mr-2" />
            Top Products
          </h3>
          <div className="grid grid-cols-1 divide-y divide-gray-200">
            <div className="py-4 flex items-center justify-between">
              <div>
                <p className="text-gray-800 font-bold">Product Name</p>
                <p className="text-gray-600">Category</p>
              </div>
              <p className="text-blue-500 font-bold">1,234 units</p>
            </div>
            <div className="py-4 flex items-center justify-between">
              <div>
                <p className="text-gray-800 font-bold">Another Product</p>
                <p className="text-gray-600">Category</p>
              </div>
              <p className="text-blue-500 font-bold">987 units</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
};
export default AdminMainDash;
