import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../serivces/operations/user'; // Ensure the path is correct
import { useSelector } from 'react-redux';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const { token } = useSelector(state => state.profile);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(token);
      setUsers(res);
      console.log(res);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md">
    
    <div className="overflow-x-auto mt-6 overflow-y-auto max-h-[400px]">
    <div className="relative">
    
      <table className="min-w-full bg-white border border-gray-300">
        <thead className='sticky top-0 bg-gray-300 lg:text-[15px] text-[12px] rounded-lg text-white'> 
          <tr>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Phone Number</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Coins</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Network Length</th>
            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Registration Date</th>
          </tr>
        </thead>
        <tbody className=''>
          {users.length > 0 ? (
            users.map((user) => (
              <React.Fragment key={user.email}>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{user.contactNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{user.totalCredit}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{user.network?.length || 0}</td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700 text-center">No Users Found</td>
            </tr>
          )}
        </tbody>
      </table>

      </div></div>
    </div>
  );
}

export default AllUsers;
