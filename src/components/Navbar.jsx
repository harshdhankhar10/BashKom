import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiLocationOn } from 'react-icons/ci';
import { FaTruckFast } from 'react-icons/fa6';
import { BiSolidOffer } from 'react-icons/bi';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';
import { HiBars3 } from 'react-icons/hi2';
import { CiSearch } from 'react-icons/ci';
import { RiContactsFill } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import SearchResults from './SearchResult';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const productsCollection = collection(db, 'products');
      const q = query(productsCollection,
        where('title', '>=', searchQuery),
        where('title', '<=', searchQuery + '\uf8ff')
      );
      const productsSnapshot = await getDocs(q);
      const searchResults = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSearchResults(searchResults);
      setShowSearch(true);

    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Upper Section */}
      <div className="upperSection bg-gray-100 flex justify-between items-center px-4 md:px-6 py-3">
        <span className="text-gray-500 font-semibold">
          Welcome to Ecommerce Platform!
        </span>
        <div className="items flex items-center gap-2">
          <CiLocationOn color="#1493C8" size="1.3em" />
          <span className="text-gray-600 text-semibold">
            Address <span className="font-bold">INDIA</span> &nbsp;
          </span>
          <FaTruckFast color="#1493C8" size="1.3em" />
          <span className="text-gray-600 text-semibold">
            <Link to="/contact">Contact Us</Link>
          </span>
          <BiSolidOffer color="#1493C8" size="1.3em" />
          <span className="text-gray-600 text-semibold">All Offers</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mainNavbar flex justify-between items-center px-4 md:px-6 py-5">
        <div className="leftSection flex gap-4">
          <HiMiniBars3BottomLeft
            style={{
              borderRadius: '10px',
              padding: '5px 5px',
              backgroundColor: '#F2F9FB',
            }}
            size="2.5em"
            color="#1493C8"
          />
          <span style={{ color: '#068BCC' }} className="text-3xl font-bold">
            <Link to="/">BashKom</Link>
          </span>
        </div>
        <div className="centerSection flex items-center">
          <CiSearch
            size="1.5em"
            color="#1493C8"
            className="mr-2 relative left-10"
          />
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search Online courses, AI, Blockchain, Iot, etc"
              className="flex-grow py-2 md:px-12 bg-gray-200 md:w-96 rounded-lg focus:outline-none"
              style={{ width: '800px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <HiBars3
            size="1.5em"
            color="#1493C8"
            className="ml-2 relative right-10"
          />
        </div>
        <div className="rightSection flex gap-1 items-center">
          <RiContactsFill color="#1493C8" size="1.3em" />
          <span className="text-gray-700 font-semibold">
            <Link to="/login">Account</Link>
          </span>
          <span className="text-gray-300 text-lg mx-5"> |</span>
          <div className="relative" style={{ marginRight: '20px' }}>
            <Link to="#">
              <button className="flex items-center px-2">
                <FaShoppingCart className="text-2xl" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Rule */}
      <hr className="mx-5" />

      {/* Main Category Navigation */}
      <div className="mainCategoryNav px-4 md:px-6 py-4 flex flex-wrap gap-3 items-center ">
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          Programming <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          Software <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          Data <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          Cloud <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          Security <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          IoT <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          Blockchain <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          Robotics <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          AI <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          AI <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          AI <IoIosArrowDown size="1.2em" />
        </span>
        <span className="bg-blue-400 px-4 py-1.5 rounded-2xl flex items-center gap-1 text-gray-100">
          Business & Entrepreneurship <IoIosArrowDown size="1.2em" />
        </span>
      </div>
      <hr className="mx-5" />

      {/* Search Results Modal */}
      {showSearch && (
        <SearchResults
          searchResults={searchResults}
          closeSearch={closeSearch}
        />
      )}
    </>
  );
}

export default Navbar;