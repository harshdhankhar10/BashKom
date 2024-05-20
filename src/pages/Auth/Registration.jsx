import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app, db } from "../../firebase/Firebase";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

const Registration = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [country, setCountry] = useState('');

  const auth = getAuth(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user registration information in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName: fullName,
        email: email,
        dob: dob,
        gender: gender,
        phoneNo: phoneNo,
        country: country,
        role : 'user'
      });

      toast.success("Registration successful!");
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
      console.error("Error creating user account:", error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user registration information in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName: user.displayName,
        email: user.email,
        dob: "", // Additional fields can be handled as needed
        gender: "",
        phoneNo: "",
        country: ""
      });

      toast.success("Google Login successful!");
      console.log(user);
    } catch (error) {
      toast.error(error.message);
      console.error("Google Login error:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className='flex'>
          <img src="https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80" alt="" />
          <div className="p-8 bg-white rounded-lg shadow-lg" style={{ width: "600px" }}>
            <h2 className="text-3xl font-bold text-gray-800 text-center">BashKom</h2>
            <p className="mt-2 text-lg text-gray-600 text-center">Create an account!</p>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="mt-4">
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-600">Full Name</label>
                <input id="fullName" type="text" className="w-full px-4 py-2 mt-2 bg-gray-200 text-gray-800 placeholder-gray-500 border rounded-md focus:outline-none focus:bg-white" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email Address</label>
                <input id="email" type="email" className="w-full px-4 py-2 mt-2 bg-gray-200 text-gray-800 placeholder-gray-500 border rounded-md focus:outline-none focus:bg-white" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Password</label>
                <input id="password" type="password" className="w-full px-4 py-2 mt-2 bg-gray-200 text-gray-800 placeholder-gray-500 border rounded-md focus:outline-none focus:bg-white" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="dob" className="block text-sm font-semibold text-gray-600">Date of Birth</label>
                  <input id="dob" type="date" className="w-full px-4 py-2 mt-2 bg-gray-200 text-gray-800 placeholder-gray-500 border rounded-md focus:outline-none focus:bg-white" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-semibold text-gray-600">Gender</label>
                  <select id="gender" className="w-full px-4 py-2 mt-2 bg-gray-200 text-gray-800 placeholder-gray-500 border rounded-md focus:outline-none focus:bg-white" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="phoneNo" className="block text-sm font-semibold text-gray-600">Phone No.(With Country code)</label>
                  <input id="phoneNo" type="number" className="w-full px-4 py-2 mt-2 bg-gray-200 text-gray-800 placeholder-gray-500 border rounded-md focus:outline-none focus:bg-white" placeholder='Enter Phone Number' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-semibold text-gray-600">Country</label>
                  <input id="country" type="text" className="w-full px-4 py-2 mt-2 bg-gray-200 text-gray-800 placeholder-gray-500 border rounded-md focus:outline-none focus:bg-white" placeholder='Enter Country Name' value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="agreeTerms" className="flex items-center">
                  <input id="agreeTerms" type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-sm text-gray-600">I agree to the terms and conditions</span>
                </label>
              </div>
              <div className="mt-6">
                <button type="submit" className="w-full px-4 py-2 text-lg font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Register</button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <Link to="/signin" className="text-xs text-gray-500 uppercase font-bold px-5">or Click here to sign in</Link>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
            <button className="flex items-center justify-center mt-4 w-full text-white rounded-lg shadow-md hover:bg-gray-100" onClick={handleGoogleLogin}>
              <div className="px-4 py-3">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"></path>
                  <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"></path>
                  <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"></path>
                  <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"></path>
                </svg>
              </div>
              <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign up with Google</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;

