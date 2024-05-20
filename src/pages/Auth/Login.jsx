import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../firebase/Firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleRoleBasedNavigation = async (user) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      if (userData.role === 'admin') {
        navigate('/dashboard/admin');
      } else {
        navigate('/dashboard/user');
      }
    } catch (error) {
      toast.error('Error fetching user role');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Login Successfully');
        handleRoleBasedNavigation(userCredential.user);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const googleLoginAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('Login Successfully');
        handleRoleBasedNavigation(result.user);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, forgotEmail)
      .then(() => {
        toast.success('Password reset email sent!');
        setForgotPassword(false);
        setForgotEmail('');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}></div>
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex justify-center items-center gap-5">
            <img src="../src/assets/images/mainLogo.png" alt="logo" className="w-20 h-20 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-gray-700 text-center py-1">BashKom</h2>
              <p className="text-xl text-gray-600 text-center">Welcomes You!</p>
            </div>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <button type="button" onClick={handleForgotPassword} className="text-xs text-gray-500">Forgot Password?</button>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-8">
              <button type="submit" className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                Login
              </button>
            </div>
          </form>
          {forgotPassword && (
            <form className="mt-4" onSubmit={handlePasswordReset}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Enter Email to Reset Password</label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <button type="submit" className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                  Reset Password
                </button>
              </div>
            </form>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link to="/registration" className="text-xs text-gray-500 uppercase">or sign up</Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
          <button
            className="w-full flex items-center justify-center mt-4 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100"
            onClick={googleLoginAuth}
          >
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C2.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
              </svg>
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
