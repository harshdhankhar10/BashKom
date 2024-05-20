import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase'; // Assuming you have your Firebase configuration setup
import { useNavigate } from 'react-router-dom';
const ProductsData = () => {
  const [products, setProducts] = useState([]);
 const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const productSplice = products.slice(0, 4);

  const handleExploreMore = () => {
    
  };


  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {productSplice.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110" />
                {product.isFeatured && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-500 mb-2">{product.category}</p>
                <p className="text-gray-900 font-bold">${product.salesPrice}</p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                onClick={() => navigate(`/view-product`,{state :product})}>
                  Explore More
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default ProductsData;