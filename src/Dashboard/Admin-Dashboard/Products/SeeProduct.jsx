import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/Firebase'; // Assuming Firebase setup in a separate file
import { collection, onSnapshot } from 'firebase/firestore';

const SeeProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = collection(db, 'products');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">All Products</h2>
      {isLoading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-100 transition duration-200">
                  <td className="py-3 px-4">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-md shadow-md"
                      onError={(event) => {
                        event.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold">{product.title}</td>
                  <td className="py-3 px-4 font-semibold">{product.category}</td>
                  <td className="py-3 px-4 font-semibold text-red-500">Rs. {product.salesPrice}</td>
                  <td className="py-3 px-4">{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SeeProduct;
