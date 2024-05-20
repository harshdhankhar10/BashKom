import React, { useState } from 'react';
import { app, db, storage } from "../../../firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from 'react-toastify';
import { FiPlusCircle as PlusCircleIcon } from "react-icons/fi";
import { FaTrashAlt as TrashIcon } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";


const AddProduct = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    originalPrice: '',
    salesPrice: '',
    productImage: '',
    category: '',
    rating: '',
    isFeatured: false,
  });
  const [description, setDescription] = useState('');
  const [uploadMethod, setUploadMethod] = useState('upload');
  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUploadMethodChange = (e) => {
    setUploadMethod(e.target.value);
    setFormValues({ ...formValues, productImage: '' });
    setImageFiles([]);
  };

  const handleFileChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleFeatureChange = (e, index) => {
    const newFeatures = [...features];
    newFeatures[index] = e.target.value;
    setFeatures(newFeatures);
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrls = [];

    if (uploadMethod === 'upload' && imageFiles.length > 0) {
      const uploadPromises = imageFiles.map(async (file) => {
        const storageRef = ref(storage, `product-images/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });
      imageUrls = await Promise.all(uploadPromises);
    } else if (uploadMethod === 'url') {
      imageUrls = [formValues.productImage];
    }

    try {
      const docRef = await addDoc(collection(db, "products"), {
        title: formValues.title,
        originalPrice: formValues.originalPrice,
        salesPrice: formValues.salesPrice,
        category: formValues.category,
        rating: formValues.rating,
        isFeatured: formValues.isFeatured,
        description,
        imageUrls,
        features,
      });

      console.log("Document written with ID: ", docRef.id);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to add product. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="bg-gray-900 text-gray-100 py-4 px-6 flex justify-between items-center rounded-lg sticky top-0">
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
        <br />
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-600">Product Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formValues.title}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product title"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-600">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                value={formValues.category}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter category"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="originalPrice" className="block text-sm font-semibold text-gray-600">Original Price</label>
              <input
                id="originalPrice"
                name="originalPrice"
                type="number"
                value={formValues.originalPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter original price"
                required
              />
            </div>
            <div>
              <label htmlFor="salesPrice" className="block text-sm font-semibold text-gray-600">Sales Price</label>
              <input
                id="salesPrice"
                name="salesPrice"
                type="number"
                value={formValues.salesPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter sales price"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="rating" className="block text-sm font-semibold text-gray-600">Rating (out of 5)</label>
              <input
                id="rating"
                name="rating"
                type="number"
                value={formValues.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter rating"
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formValues.isFeatured}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <label htmlFor="isFeatured" className="ml-2 text-sm font-semibold text-gray-600">Featured</label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="uploadMethod" className="block text-sm font-semibold text-gray-600">Upload Method</label>
            <select
              id="uploadMethod"
              name="uploadMethod"
              value={uploadMethod}
              onChange={handleUploadMethodChange}
              className="w-full px-4 py-2 mt-2 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="upload">Upload Images</option>
              <option value="url">Image URL</option>
            </select>
          </div>

          {uploadMethod === 'upload' ? (
            <div className="mb-4">
              <label htmlFor="productImages" className="block text-sm font-semibold text-gray-600">Product Images</label>
              <input
                id="productImages"
                name="productImages"
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-2 mt-2 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                multiple
                required
              />
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="productImage" className="block text-sm font-semibold text-gray-600">Product Image URL</label>
              <input
                id="productImage"
                name="productImage"
                type="url"
                value={formValues.productImage}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product image URL"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-600">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full px-4 py-2 mt-2 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 h-40"
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="features" className="block text-xl font-semibold text-gray-600">Features</label>
            <div className="flex flex-col gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(e, index)}
                    className="w-full px-4 py-2 mt-2 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Feature ${index + 1}`}
                  />
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeature}
                className="mt-2 text-indigo-500 hover:text-indigo-700 flex items-center"
              >
                <PlusCircleIcon className="h-5 w-5 mr-1" />
                Add Feature
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddProduct;
