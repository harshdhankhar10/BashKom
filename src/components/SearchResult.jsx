import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ searchResults, closeSearch }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Search Results</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={closeSearch}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((product) => (
              <li
                key={product.id}
                className="py-2 border-b border-gray-200 hover:bg-gray-100 transition duration-200"
              >
                <Link
                  to={`/view-product/${product.id}`}
                  className="flex items-center"
                  onClick={closeSearch}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-gray-500">${product.price}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;