import React from "react";
import { useSelector } from "react-redux";
import { FaAward } from "react-icons/fa6";

function Credit() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-11/12 mx-auto mt-20 lg:flex justify-center">
      <div className="flex p-5 flex-col lg:w-[80vw] md:w-[90vw] w-full">
        <div className="flex justify-between border w-full lg:p-10 md:p-8 p-5">
          <div className="text-xl">
            <p>Your Absence Coin</p>
            <p>Rs. {user.totalCredit}</p>
          </div>
          <div>
            <FaAward className="lg:text-6xl md:text-5xl text-4xl lg:h-20 md:h-16 h-12 text-red-700" />
          </div>
        </div>

        <div className="mt-10">
          <div className="text-center text-2xl font-bold">Your Transaction</div>

          <div className="absence-coins-table w-full mt-6">
            <table className="w-full bg-white shadow-md rounded">
              <thead>
                <tr className="bg-gray-200 lg:text-[15px]">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Absence Coins Reason</th>
                  <th className="px-4 py-2">Coins</th>
                </tr>
              </thead>
              <tbody>
                {user.virtualMoney.map((vir, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 lg:text-[13px]"
                  >
                    <td className="px-4 py-2 text-center">
                      {new Date(vir.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-center">{vir.message}</td>
                    <td
                      className={`px-4 py-2 text-center ${
                        vir.money >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {vir.money >= 0 ? "+" : "-"}
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
  );
}

export default Credit;
