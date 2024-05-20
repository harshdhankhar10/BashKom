import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { PiStarThin as OutlinedStarIcon  } from "react-icons/pi";
import { GoStarFill as SolidStarIcon } from "react-icons/go";
import { useLocation } from 'react-router-dom';

const ViewProduct = ({}) => {
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);

  const location = useLocation()
  const product = location.state
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row px-4 md:px-20 py-12 gap-10">
        <section className="leftSide md:w-1/2">
          <div className="relative">
            <img
              src={product.imageUrl}
              className="rounded-xl shadow-lg w-full object-cover"
              style={{ height: '40rem' }}
              alt=""
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              Featured
            </div>
          </div>
        </section>
        <section className="rightSide md:w-1/2">
          <div className="heading flex items-center gap-4">
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <button className="px-5 py-2 bg-blue-100 text-blue-600 font-bold rounded-md">
              {product.category}
            </button>
          </div>
          <p className="text-xl text-gray-400 mt-2">Comes with 2 years warranty</p>

          <div className="flex items-center mt-2 py-2">
            <span className="text-xl font-semibold mr-2">Add a Review:</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRatingClick(value)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  {rating >= value ? <SolidStarIcon className="h-8 w-8" /> : <OutlinedStarIcon className="h-8 w-8" />}
                </button>
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-semibold py-5 text-gray-800">Rs.{product.salesPrice}</h1>
          <ul className="features text-lg font-semibold text-gray-700 flex flex-col gap-2">
            <li className="flex items-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/14/check-box-1294836_960_720.png"
                className="h-6 w-6 mr-2"
                alt="feature icon"
              />
              Apple A15 Bionic (5 nm) Chipset
            </li>
            <li className="flex items-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/14/check-box-1294836_960_720.png"
                className="h-6 w-6 mr-2"
                alt="feature icon"
              />
              Hexa-core (2x3.23 GHz Avalanche + 4x1.83 GHz Blizzard)
            </li>
            <li className="flex items-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/14/check-box-1294836_960_720.png"
                className="h-6 w-6 mr-2"
                alt="feature icon"
              />
              128GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM, 1TB 4GB RAM
            </li>
            <li className="flex items-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/14/check-box-1294836_960_720.png"
                className="h-6 w-6 mr-2"
                alt="feature icon"
              />
              12 MP, f/2.4, 120˚, 13mm (ultrawide)
            </li>
            <li className="flex items-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/14/check-box-1294836_960_720.png"
                className="h-6 w-6 mr-2"
                alt="feature icon"
              />
              4K video recording at 24 fps, 30 fps, or 60 fps
            </li>
            <li className="flex items-center">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/19/14/check-box-1294836_960_720.png"
                className="h-6 w-6 mr-2"
                alt="feature icon"
              />
              Face ID, accelerometer, gyro, proximity, compass, barometer
            </li>
          </ul>
          <div className="reviewsImages py-5">
            <div className="images">
              <img
                src="https://hotpot.ai/images/site/ai/image_generator/art_maker/style_catalog/concept_art_7.jpg"
                className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                alt="user"
              />
              <img
                src="https://hotpot.ai/images/site/ai/image_generator/art_maker/style_catalog/concept_art_7.jpg"
                className="inline-block w-10 h-10 rounded-full ring-2 ring-white -ml-4"
                alt="user"
              />
              <img
                src="https://hotpot.ai/images/site/ai/image_generator/art_maker/style_catalog/concept_art_7.jpg"
                className="inline-block w-10 h-10 rounded-full ring-2 ring-white -ml-4"
                alt="user"
              />
              <span className="ml-2 text-gray-500">1241 sold in the last 24 hours</span>
            </div>
          </div>
          <div className="btn flex gap-4">
            <button className="px-12 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors">
              Buy it now
            </button>
            <button className="px-12 py-3 bg-blue-100 text-blue-600 font-bold rounded-md hover:bg-blue-200 transition-colors">
              Add to Cart
            </button>
          </div>
        </section>
      </div>


      <div className="flex justify-center mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleTabClick('description');
              }}
              className={`${
                activeTab === 'description'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Description
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleTabClick('reviews');
              }}
              className={`${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Reviews
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleTabClick('policies');
              }}
              className={`${
                activeTab === 'policies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Policies
            </a>
          </nav>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-4xl">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Description</h3>
              <p>
                {product.description}
              </p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Reviews</h3>
              <div className="bg-gray-100 p-6 rounded-md mb-6 shadow-md">
                <div className="flex items-center mb-2">
                  <img
                    src="https://via.placeholder.com/50x50"
                    className="w-8 h-8 rounded-full mr-2"
                    alt="user"
                  />
                  <span className="text-sm font-bold">John Doe</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "Great phone! The camera quality is amazing, and the performance is top-notch. Highly recommended!"
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-md shadow-md">
                <div className="flex items-center mb-2">
                  <img
                    src="https://via.placeholder.com/50x50"
                    className="w-8 h-8 rounded-full mr-2"
                    alt="user"
                  />
                  <span className="text-sm font-bold">Jane Smith</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  "I've been using the iPhone 13 for a few months now, and I'm thoroughly impressed with its battery life and smooth performance."
                </p>
              </div>
            </div>
          )}
          {activeTab === 'policies' && (
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Policies</h3>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>14-day return policy for unused and unopened products.</li>
                <li>2-year limited warranty against manufacturing defects.</li>
                <li>Free shipping on orders over $50.</li>
              </ul>
            </div>
          )}
        </div>
      </div><br /><br /><br />
      <br />
    </>
  );
};

export default ViewProduct;