import React, { useEffect, useState } from 'react'
import {createColor}  from "../services/operarions/color"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from 'react-router-dom';
import {useFormik} from "formik"
import * as yup from "yup";

function AddColor() {
const dispatch = useDispatch();
const location = useLocation()

const { token } = useSelector((state) => state.auth)
const parts = location.pathname.split("/");
const getColorId = parts[3];
const [color ,setColor ] = useState([])

let schema = yup.object().shape({
    title: yup.string().required("Color is Required"),
  });

const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: color?.title || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
        console.log(values.title)
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        // dispatch(updateAColor(data));

      } else {
        dispatch(createColor(values.title,token));
        formik.resetForm();
      
      }
    },
  });

  // useEffect(()=>{
  //   console.log(location.pathname)

  //   console.log(getColorId)
    
  // },[])

    return (
    <div className='w-full p-4'>

        <div className=' w-11/12 mx-auto h-full border-2 '>
            <div className='flex w-full justify-center text-3xl font-bold font-mono'>
              {getColorId ?  <h2>Edit Color </h2>:  <h2> Add Color </h2>}
            </div>

            <div>

                <form onSubmit={formik.handleSubmit} className='w-full flex flex-col items-center gap-6 mt-10'>

<label htmlFor="color" className=' text-2xl'>Please Choose Color</label>
                    <input 
                    type="color" 
                    label = "Enter Product Color"
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleChange("title")}
                    value={formik.values.title}
                    id="color" />
                       <div className="error -mt-1 text-[12px] text-red-800">
            {formik.touched.title && formik.errors.title}
          </div>

        <div className='flex w-full justify-center'>
        <button
            className="bg-yellow-300 rounded-xl p-2 text-xl px-5 font-bold font-mono hover:bg-yellow-500"
            type="submit"
          >
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </div>
                </form>
            </div>
        </div>

    </div>
  )
}

export default AddColor