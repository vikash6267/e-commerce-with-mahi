import React from "react";
import { useSelector } from "react-redux";
import coin from "../assests/logo/coin.png";

function Credit() {
  const { user } = useSelector((state) => state.profile);

  // Function to sort transactions by date (ascending order)
  const sortTransactionsByDate = (transactions) => {
    return transactions.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  };

  // Sorted transactions
  const sortedTransactions = sortTransactionsByDate([...user.virtualMoney]);

  return (
    <div className="w-11/12 mx-auto mt-20 lg:flex lg:justify-center">
      <div className="flex flex-col p-5 lg:w-[80vw] md:w-[90vw] w-full">
        {/* New Section */}
        <div className="mb-10 p-5 bg-white shadow-lg rounded-lg">
          <div className="flex items-center space-x-4">
            <img src={coin} className="rounded-full h-[120px]" alt="Coin" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Coin Balance</h2>
              <p className="text-lg text-gray-600">Total Absence Coins: {user.totalCredit}</p>
            </div>
          </div>
        </div>
        
  

        <div className="mt-10">
          <div className="text-center text-xl font-bold">Your Transaction</div>

          <div className="overflow-x-auto mt-6 overflow-y-auto max-h-[400px]">
            <div className="relative">
              <table className="w-full bg-white shadow-md rounded-2xl">
                <thead className="sticky top-0 bg-gray-900 lg:text-[15px] text-[12px] rounded-lg text-white">
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Absence Coins Reason</th>
                    <th className="px-4 py-2">Coins</th>
                  </tr>
                </thead>
                <tbody className=" ">
                  {sortedTransactions.map((vir, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 lg:text-[13px] text-[11px]"
                    >
                      <td className="px-4 py-2 text-center">
                        {new Date(vir.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-center">{vir.message}</td>
                      <td
                        className={`px-4 py-2 text-center ${
                          Number(vir.money) >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {Number(vir.money) >= 0 ? "+" : "-"}
                        {Math.abs(vir.money)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credit;
