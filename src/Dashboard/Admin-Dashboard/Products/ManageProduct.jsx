import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/Firebase'; // Assuming Firebase setup in a separate file
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    setHasMounted(true);
    const q = collection(db, 'products');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });
    return unsubscribe;
  }, [hasMounted]);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      Swal.fire('Success', 'Product deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire('Error', 'Failed to delete product.', 'error');
    }
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentProduct(null);
  };

  const saveProduct = async () => {
    try {
      const { id, title, category, salesPrice, imageUrl, description } = currentProduct;
      await updateDoc(doc(db, 'products', id), {
        title,
        category,
        salesPrice,
        imageUrl,
        description,
      });
      closeModal();
      Swal.fire('Success', 'Product updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire('Error', 'Failed to update product.', 'error');
    }
  };

  const confirmDeleteProduct = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct(id);
      }
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Manage Products</h2>
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
                <th className="py-3 px-4 text-center">Actions</th>
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
                  <td className="py-3 px-4 flex justify-center items-center space-x-2 relative top-5">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-200 h-10"
                      onClick={() => handleEditProduct(product)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-200 h-10"
                      onClick={() => confirmDeleteProduct(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-4xl w-full sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-2xl leading-6 font-bold text-gray-900">Edit Product</h3> <br />
                  <div className="mt-2">
                    <form>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input
                          type="text"
                          value={currentProduct?.title || ''}
                          onChange={(e) =>
                            setCurrentProduct({ ...currentProduct, title: e.target.value })
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                        <input
                          type="text"
                          value={currentProduct?.category || ''}
                          onChange={(e) =>
                            setCurrentProduct({ ...currentProduct, category: e.target.value })
                          }
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                          <input
                            type="number"
                            value={currentProduct?.salesPrice || ''}
                            onChange={(e) =>
                              setCurrentProduct({ ...currentProduct, salesPrice: e.target.value })
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                          <input
                            type="text"
                            value={currentProduct?.imageUrl || ''}
                            onChange={(e) =>
                              setCurrentProduct({ ...currentProduct, imageUrl: e.target.value })
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                          <textarea
                            value={currentProduct?.description || ''}
                            onChange={(e) =>
                              setCurrentProduct({ ...currentProduct, description: e.target.value })
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={saveProduct}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ManageProduct;
  