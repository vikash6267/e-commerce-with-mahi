import React from "react";
import { useSelector } from "react-redux";
import { FaAward } from "react-icons/fa6";

function Credit() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className=" flex p-5 flex-col lg:w-[80vw] w-screen">
      <div>
        <div className="flex justify-between border w-full lg:p-10 md:p-10 p-3 ">
           <div className="text-xl"> <p>Your Absence Coin</p>
           <p>Rs. {user.totalCredit}</p>
           </div>


           <div>
           <FaAward className="text-6xl h-20 text-red-700" />

           </div>
        </div>
      </div>

      <div className=" mt-10">

        <div className=" text-center text-2xl font-bold">Your Transication</div>

        

        <div className="absence-coins-table w-full">
        <table className="w-full bg-white shadow-md rounded my-6">
    <thead>
        <tr className="bg-gray-200">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Absence Coins Reason</th>
            <th className="px-4 py-2">Coins</th>
        </tr>
    </thead>
    <tbody>
        {user.virtualMoney.map((vir, index) => (
            <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-2 text-center">{new Date(vir.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-center">{vir.message}</td>
                <td className={`px-4 py-2 text-center ${vir.money >= 0 ? 'text-green-500' : 'text-red-500'}`}>{vir.money >= 0 ? '+' : '-'}{Math.abs(vir.money)}</td>

                {/* <td className={`px-4 py-2 text-center ${vir.money >= 0 ? 'text-green-500' : 'text-red-500'}`}>{vir.money}</td> */}
            </tr>
        ))}
    </tbody>
</table>

</div>

      </div>
    </div>
  );
}

export default Credit;
