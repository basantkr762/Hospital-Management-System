import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Welcome to the Hospital Management System Admin Panel
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              🚧 Admin Panel Integration
            </h2>
            <p className="text-blue-700">
              The full admin panel is available as a separate application. 
              For complete admin functionality, please deploy the admin panel separately or contact the developer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800">Doctors</h3>
              <p className="text-green-600">Manage doctors and profiles</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800">Appointments</h3>
              <p className="text-blue-600">View and manage appointments</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800">Dashboard</h3>
              <p className="text-purple-600">Analytics and reports</p>
            </div>
          </div>
          <div className="mt-8">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Back to Main Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
