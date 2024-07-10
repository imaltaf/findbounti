// components/Dashboard.js
import React from 'react';

const Dashboard = ({ subdomains }) => {
  return (
    <div className="bg-opacity-10 bg-white backdrop-blur-md border-gray-100 border-2 rounded-lg p-4 mx-auto mt-4 w-80 md:max-w-md text-white max-h-400 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Subdomains</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b-2 border-gray-300 p-2 text-left">Host</th>
            </tr>
          </thead>
          <tbody>
            {subdomains.map((subdomain, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}
              >
                <td className="border-b border-gray-300 p-2">{subdomain.host}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
