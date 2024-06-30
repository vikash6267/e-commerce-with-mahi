import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdCalendar } from 'react-icons/io';
import { FaMoneyBillWave, FaUserFriends, FaDownload } from 'react-icons/fa';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:4000/api/v1/dashboardData';
        
        // Add selected month to URL if it's selected
        if (selectedMonth !== null) {
          url += `?month=${selectedMonth}`;
        }

        const response = await axios.get(url);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, [selectedMonth]); // Refetch data when selectedMonth changes

  const handleMonthSelect = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handleDownloadYearlyReport = async () => {
    try {
      console.log("first")
      const response = await axios.get('http://localhost:4000/api/v1/downloadPDF', {
        responseType: 'blob', // Important: Treat response as a blob
      });

      // Create blob link to download PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'yearly-report.pdf');
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className=" mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Month selection dropdown */}
      <div className="mb-4 flex items-center">
        <label htmlFor="monthSelect" className="mr-2">Select Month: </label>
        <select id="monthSelect" onChange={handleMonthSelect} className="border p-2 rounded">
          <option value="">All Months</option>
          {[...Array(12).keys()].map(month => (
            <option key={month + 1} value={month + 1}>
              {new Date(0, month).toLocaleString('en', { month: 'long' })}
            </option>
          ))}
        </select>
        <IoMdCalendar className="ml-2 text-gray-500" size={20} />
      </div>

      {/* Download Yearly Report Button */}
      {/* <button onClick={handleDownloadYearlyReport} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        <FaDownload className="inline-block mr-2" /> Download Yearly Report
      </button> */}

      {dashboardData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Orders Card */}
          <div className="bg-blue-200 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <FaMoneyBillWave className="mr-2 text-3xl text-blue-600" />
              <h2 className="text-xl font-bold">Total Orders</h2>
            </div>
            <p className="text-2xl font-semibold text-blue-900">{dashboardData.totalOrders}</p>
          </div>

          {/* Total Income Card */}
          <div className="bg-green-200 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <FaMoneyBillWave className="mr-2 text-3xl text-green-600" />
              <h2 className="text-xl font-bold">Total Income</h2>
            </div>
            <p className="text-2xl font-semibold text-green-900">₹ {dashboardData.totalIncome.toFixed(2)}</p>
          </div>

          {/* Monthly Orders Card */}
          <div className="bg-purple-200 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <IoMdCalendar className="mr-2 text-3xl text-purple-600" />
              <h2 className="text-xl font-bold">Monthly Orders</h2>
            </div>
            {dashboardData.monthlyOrders && (
              <div>
                {dashboardData.monthlyOrders.map((monthData) => (
                  <p key={`${monthData._id.month}-${monthData._id.year}`} className="mb-2">
                    {monthData.totalOrders} orders in {new Date(0, monthData._id.month - 1).toLocaleString('en', { month: 'long' })} {monthData._id.year}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Total Users Card */}
          <div className="bg-yellow-200 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <FaUserFriends className="mr-2 text-3xl text-yellow-600" />
              <h2 className="text-xl font-bold">Total Users</h2>
            </div>
            <p className="text-2xl font-semibold text-yellow-900">{dashboardData.totalUsers}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
