import React from 'react';
import {app} from "../firebase/Firebase"
import {toast} from "react-toastify"
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

const ContactUs = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    function handleSubmit(e){
    e.preventDefault();
    const auth = getAuth(app);
    const db = getFirestore(app);
    addDoc(collection(db, "contacts-Data"), {
      name: name,
      email: email,
      subject: subject,
      message: message,
    })
      .then(() => {
        toast.success("Message sent successfully");
      })
      .catch((error) => {
        toast.error("Error sending message");
      });
    }
  return (
    <div className="w-full">
      <div className="bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p className="text-3xl font-bold leading-7 text-center">Contact me</p>
          <form onSubmit={handleSubmit}>
            <div className="md:flex items-center mt-12">
              <div className="w-full md:w-1/2 flex flex-col">
                <label className="font-semibold leading-none">Name</label>
                <input
                  type="text" onChange={(e) => setName(e.target.value)}
                  className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                
               />
              </div>
              <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="font-semibold leading-none">Email</label>
                <input
                  type="email" onChange={(e) => setEmail(e.target.value)}
                  className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                />
              </div>
            </div>
            <div className="md:flex items-center mt-8">
              <div className="w-full flex flex-col">
                <label className="font-semibold leading-none">Subject</label>
                <input
                  type="text" onChange={(e) => setSubject(e.target.value)}
                  className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                />
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col mt-8">
                <label className="font-semibold leading-none">Message</label>
                <textarea onChange={(e) => setMessage(e.target.value)}
                  className="h-40 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                type="submit"
                className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
