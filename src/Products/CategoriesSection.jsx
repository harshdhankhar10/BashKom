import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const categoriesSet = new Set();
        productsSnapshot.docs.forEach((doc) => {
          const productData = doc.data();
          categoriesSet.add(productData.category);
        });
        const categoriesData = Array.from(categoriesSet).map((category) => ({
          name: category,
          count: productsSnapshot.docs.filter(
            (doc) => doc.data().category === category
          ).length,
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white h-48 rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl relative"
            >
              <div className="bg-blue-500 text-white py-4 text-xl px-4 font-bold">
                {category.name}
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="text-gray-700 font-semibold">
                  Total Items: {category.count}
                </div>
                <div className="text-center bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors">
                  Explore Now
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;