import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

function ContactGYM({ phone, email }) {
  return (
    <div className="p-4 border-gray-700 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FaPhone className="mr-2 text-red-500" />
        <span className="font-medium text-gray-300">Phone:</span>
        <span className="ml-2 text-gray-300">{phone}</span>
      </div>
      <div className="flex items-center">
        <FaEnvelope className="mr-2 text-red-500" />
        <span className="font-medium text-gray-300">Email:</span>
        <span className="ml-2 text-gray-300">{email}</span>
      </div>
    </div>
  );
}

export default ContactGYM;