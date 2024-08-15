import React, { useEffect } from 'react';

const MyReferralProgram = ({ referralData }) => {
  // Helper function to mask email
  const maskEmail = (email) => {
    const [name, domain] = email.split('@');
    const visiblePart = name.slice(-3);
    const hiddenPart = name.slice(0, -3).replace(/./g, 'x');
    return `${hiddenPart}${visiblePart}@${domain}`;
  };

  useEffect(()=>{

    console.log(referralData)
  },[])

  return (
    <div className="my-referral-program max-w-7xl p-4  mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">My Referral Program</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Registered At</th>
            <th className="py-2 px-4 border-b">Email</th>
          </tr>
        </thead>
        <tbody>
          {referralData?.map((referral, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-center">{referral?.id?.name}</td>
              <td className="py-2 px-4 border-b text-center">
                {new Date(referral?.id?.createdAt).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {maskEmail(referral?.id?.email)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default MyReferralProgram