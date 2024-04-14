import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { getAllColor } from '../services/operarions/color';


function ColorList() {
const [allColor, setAllColor] = useState([])
const [loading, setLoading] = useState(false);

const allColorFetch = async () => {
    ;(async () => {
      setLoading(true);
      try {
        // const res = await apiConnector("GET", productEndpoints.GET_ALL_COLOR_API);
        const res = await getAllColor() 
        setAllColor(res)
        } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  };

  useEffect(() => {
    allColorFetch();
  }, []);

  useEffect(()=>{
    console.log(allColor)
  },[allColor])
  return (
    <div className='w-full p-4'>

    <div className=' w-11/12 mx-auto h-full border-2 '>

    <div className='flex w-full justify-center text-3xl font-bold font-mono'>
            <h2>Here All Colors</h2>
            </div>
    </div>
    

 {
  loading ? <div className='spinner'></div> : 

  <div className='mt-8'>
      <ul className=' flex flex-col gap-2 w-full justify-center'>

      {allColor.length !== 0 && allColor?.map((color, index) => (
        <li key={index} className={`flex justify-between border-2 items-center w-[50%] px-7 `} style={{border: `2px solid ${color.title}`}}>
    <span
      className=" mt-2 "
      style={{
        backgroundColor: color.title,
        minWidth: "30px",
        minHeight: "30px",
        borderRadius: "50%",
        marginBottom: "10px",
      }}
    ></span>

    <div className=' text-xl flex gap-4'>
        <Link to={`/dashboard/color/${color._id}`}><FaRegEdit/></Link>
        <button><MdDelete/></button>

    </div>
  </li>
))}


      </ul>

    </div>

 }
    </div>
  )
}

export default ColorList