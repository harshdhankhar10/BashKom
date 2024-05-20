import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, updateProfile, updateEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase/Firebase';
import { RiDashboardHorizontalFill as FaDashboard } from "react-icons/ri";
import { FaUserEdit, FaAddressCard, FaHistory, FaHeart, FaEnvelope } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UserProfile = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    gender: '',
    country: '',
    dateOfBirth: '',
    photoURL: '',
    role: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData.role === 'admin' || userData.role === 'user') {
            setProfileData(userData);
          } else {
            // If user role is not admin or user, log out the user or handle it accordingly
            auth.signOut();
            toast.error('Access denied.');
          }
        } else {
          setProfileData({
            name: user.displayName,
            email: user.email,
            address: '',
            phoneNumber: '',
            gender: '',
            country: '',
            dateOfBirth: '',
            photoURL: user.photoURL,
            role: '',
          });
        }
      } else {
        setUser(null);
        setProfileData({
          name: '',
          email: '',
          address: '',
          phoneNumber: '',
          gender: '',
          country: '',
          dateOfBirth: '',
          photoURL: '',
          role: '',
        });
      }
    });

    return unsubscribe;
  }, [auth]);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, profileData);
      await updateProfile(user, {
        displayName: profileData.name,
        photoURL: profileData.photoURL,
      });
      setEditMode(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setProfileData({
      name: user.displayName,
      email: user.email,
      address: profileData.address,
      phoneNumber: profileData.phoneNumber,
      gender: profileData.gender,
      country: profileData.country,
      dateOfBirth: profileData.dateOfBirth,
      photoURL: user.photoURL,
      role: profileData.role,
    });
  };

  const handleUploadProfilePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileRef = ref(storage, `profilePhotos/${user.uid}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading profile photo:', error);
          toast.error('Failed to upload profile photo.');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setProfileData({ ...profileData, photoURL: downloadURL });
          setUploadProgress(0);
          toast.success('Profile photo uploaded successfully!');
        }
      );
    }
  };

  const handleUpdateEmail = async () => {
    const { value: newEmail } = await Swal.fire({
      title: 'Enter your new email address',
      input: 'email',
      inputPlaceholder: 'Enter your new email address',
      showCancelButton: true,
      confirmButtonText: 'Update Email',
      cancelButtonText: 'Cancel',
    });

    if (newEmail) {
      try {
        const credential = await promptForCredentials();
        if (credential) {
          await reauthenticateWithCredential(user, credential);
          await updateEmail(user, newEmail);
          setProfileData({ ...profileData, email: newEmail });
          toast.success('Email updated successfully!');
        }
      } catch (error) {
        console.error('Error updating email:', error);
        toast.error('Failed to update email. Please try again.');
      }
    }
  };

  const handleUpdatePassword = async () => {
    const { value: newPassword } = await Swal.fire({
      title: 'Enter your new password',
      input: 'password',
      inputPlaceholder: 'Enter your new password',
      showCancelButton: true,
      confirmButtonText: 'Update Password',
      cancelButtonText: 'Cancel',
    });

    if (newPassword) {
      try {
        const credential = await promptForCredentials();
        if (credential) {
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, newPassword);
          toast.success('Password updated successfully!');
        }
      } catch (error) {
        console.error('Error updating password:', error);
        toast.error('Failed to update password. Please try again.');
      }
    }
  };

  const promptForCredentials = async () => {
    const { value: password } = await Swal.fire({
      title: 'Re-enter your current password',
      input: 'password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: 50,
        autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
  });

  if (password) {
    const credential = EmailAuthProvider.credential(user.email, password);
    return credential;
  }
};

return (
  <div className="max-w-4xl mx-auto py-12 px-6">
    {/* Profile Section */}
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold">Profile Details</h3>
        {!editMode && (
          <button
            onClick={handleEditProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <FaUserEdit />
            Edit Profile
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={profileData.fullName}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            disabled={!editMode}
            className={`w-full px-4 py-2 border ${
              editMode
                ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
                : 'border-gray-300 bg-gray-100'
            } rounded-md focus:outline-none`}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <div className="flex items-center">
            <input
              type="email"
              id="email"
              value={profileData.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md focus:outline-none"
            />
            <button
              onClick={handleUpdateEmail}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <FaEnvelope />
            </button>
          </div>
        </div>
        <div className='flex items-center '>
          <div>
             <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={profileData.phoneNo}
            onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
            disabled={!editMode}
            className={`w-full px-4 py-2 border ${
              editMode
                ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
                : 'border-gray-300 bg-gray-100'
            } rounded-md focus:outline-none`}
          />
          
          </div>
          <div className='w-full'>
          <button onClick={() => setShowPasswordModal(true)}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
       <span className='flex items-center'> <RiLockPasswordFill /> Update Password</span>
         </button>
          </div>
         
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
            Address
          </label>
          <textarea
            id="address"
            value={profileData.address}
            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
            disabled={!editMode}
            rows={3}
            className={`w-full px-4 py-2 border ${
              editMode
                ? 'border-blue-500 focus:ring-blue-500 focus:border-blue-500'
                : 'border-gray-300 bg-gray-100'
            } rounded-md focus:outline-none`}
          ></textarea>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="profilePhoto" className="block text-gray-700 font-semibold mb-2">
            Profile Photo
          </label>
          <div className="flex items-center">
            {profileData.photoURL ? (
              <img
                src={profileData.photoURL}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                <FaUserEdit className="text-gray-500" />
              </div>
            )}
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              onChange={handleUploadProfilePhoto}
              disabled={!editMode}
              className="hidden"
            />
            <label
              htmlFor="profilePhoto"
              className={`cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
                !editMode ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploadProgress === 0 ? 'Upload Photo' : `Uploading... ${uploadProgress.toFixed(0)}%`}
            </label>
          </div>
        </div>
      </div>
      {editMode && (
        <div className="flex justify-end mt-6">
          <button
            onClick={handleCancelEdit}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>

    {/* Change Password Modal */}
    {showPasswordModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          <h3 className="text-2xl font-semibold mb-4">Change Password</h3>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700 font-semibold mb-2">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePassword}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    
    </div>
  );
};

export default UserProfile;
