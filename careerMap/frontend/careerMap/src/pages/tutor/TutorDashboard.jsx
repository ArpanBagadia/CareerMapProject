import React from 'react'
import Sidebar from '../../components/Sidebar'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";


function TutorDashboard() {
  return (
    <div className='flex'>
      <Sidebar />
      <main className="flex-1 p-6 bg-white min-h-screen">
        <div className="p-6 bg-white min-h-screen w-full">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Total Sales</p>
              <h2 className="text-3xl font-bold text-blue-700">2</h2>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-3xl font-bold text-green-700">₹2</h2>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Course Prices</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[100,200,300]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="courseTitle" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </main>
    </div>
  )
}

export default TutorDashboard