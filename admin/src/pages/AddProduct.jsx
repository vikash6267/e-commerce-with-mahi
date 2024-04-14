import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import {toast} from "react-hot-toast"
import Dropzone from "react-dropzone";
import { useLocation } from "react-router-dom";
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { Select } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../services/operarions/categoryApi";
import { getAllColor } from "../services/operarions/color";
import { uploadImg } from "../services/operarions/uploadImg";
import { createProduct } from "../services/operarions/product";
import ChipInput from "../components/core/ChipInput";



function AddProduct() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const getProductId = location.pathname.split("/")[3];
  const [allColor, setAllColor] = useState([]);
  const [colorState, setColorState] = useState([])
  const [product, setAllProduct] = useState([]);
  const [color, setColor] = useState([]);

  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allCategory, setAllCategory] = useState([]);





  const imageUpload = async (files) => {
    (async () => {
      setLoading(true);
      console.log(files)
      try {
        // const res = await apiConnector("GET", productEndpoints.GET_ALL_COLOR_API);
        const res = await uploadImg(files, token);
        console.log(res)
        if(res){
          setImage((prevUrls) => [...prevUrls, res]);
          

        }

        console.log(image);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  };

  const allColorFetch = async () => {
    (async () => {
      setLoading(true);
      try {
        // const res = await apiConnector("GET", productEndpoints.GET_ALL_COLOR_API);
        const res = await getAllColor();
        setAllColor(res);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  };

  const allCategoryFetch = async () => {
    (async () => {
      setLoading(true);
      try {
        // const res = await apiConnector("GET", productEndpoints.GET_ALL_COLOR_API);
        const res = await getAllCategory();
        console.log(res)
        setAllCategory(res);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  };

  useEffect(() => {
    allColorFetch();
    allCategoryFetch();

 

    if (getProductId) {
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("category", product.category);
      setValue("tag", product.tag);
      setValue("quantity", product.quantity);
      setValue("images", product.images);
      setValue("sizes", product.sizes);
      setValue("color", product.color);
    }
  }, []);

  const coloropt = [];
  allColor.forEach((i) => {
    coloropt.push({
      label: (
        <div className="col-3">
          <ul
            className="colors ps-0"
            style={{
              width: "20px",
              height: "20px",
              marginBottom: "10px",
              backgroundColor: i.title,
              borderRadius: "50%", // Added inline style for rounded shape
              listStyle: "none", // Hide bullet points
              border: "2px solid transparent",
            }}
          ></ul>
        </div>
      ),
      value: i._id,
    });
  });
  const productcolor = [];
  allColor?.forEach((i) => {
    productcolor.push({
      label: (
        <div className="col-3">
          <ul
            className="colors ps-0"
            style={{
              width: "20px",
              height: "20px",
              marginBottom: "10px",
              backgroundColor: i.title,
              borderRadius: "50%", // Added inline style for rounded shape
              listStyle: "none", // Hide bullet points
              border: "2px solid transparent",
            }}
          ></ul>
        </div>
      ),
      value: i._id,
    });
  });



  const img = [];
  image?.forEach((i) => {
    img.push({
      url: i,
    });
  });

  const imgshow = [];
  image?.forEach((i) => {
    imgshow.push({
        url: i,
    });
  });

  const handleColors = (e) => {
    setColor(e);
    console.log(color);
  };


  const isformUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.title !== product.title ||
      currentValues.description !== product.description ||
      currentValues.price !== product.price ||
      currentValues.category._id !== product.category._id ||
      currentValues.tag.toString() !== product.tag.toString() ||
      currentValues.quantity !== product.quantity ||
      currentValues.images !== product.images ||
      currentValues.sizes.toString() !== product.sizes.toString() ||
      currentValues.color.toString() !== product.color.toString()
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {


    // this is for edit product
    if (getProductId) {
      if (isformUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("productID", product._id);

        if (currentValues.title !== product.title) {
          formData.append("title", data.title);
        }

        if (currentValues.description !== product.description) {
          formData.append("description", data.description);
        }

        if (currentValues.price !== product.price) {
          formData.append("price", data.price);
        }

        if (currentValues.category._id !== product.category._id) {
          formData.append("category", data.category);
        }

        if (currentValues.tag.toString() !== product.tag.toString()) {
          formData.append("tag", JSON.stringify(data.tag));
        }

        if (currentValues.quantity !== product.quantity) {
          formData.append("quantity", data.quantity);
        }

        if (currentValues.images.toString() !== product.images.toString()) {
          formData.append("images", JSON.stringify(data.images));
        }

        if (currentValues.sizes.toString() !== product.sizes.toString()) {
          formData.append("sizes", JSON.stringify(data.sizes));
        }

        if (currentValues.color.toString() !== product.color.toString()) {
          formData.append("color", JSON.stringify(data.color));
        }
     
      setLoading(true)
      // const result = await editCourseDetails(formData, token)
      setLoading(false)
      // if (result) {
      
      // }
    } else {
      toast.error("No changes made to the form")
    }
      return
    
  }
  

 console.log(data)
  let form = new FormData()

  form.append("title", data?.title);
  form.append("description", data.description);
  form.append("price", data.price);
  form.append("tag", JSON.stringify(data.tag));
  form.append("quantity", data.quantity);
  form.append("images", image);
  form.append("sizes",  JSON.stringify(data.size));
  form.append("color", color);

console.log(form)
 
//   const result = await createProduct(form, token)
// console.log(result)

    };

  // useEffect(()=>{
  // console.log(allCategory)
  // console.log(allColor)

  // },[allColor,allCategory])

  return   (
    <div className='w-full p-4'>

<div className=' w-11/12 mx-auto h-full border-2 '>
<div className='flex w-full justify-center text-3xl font-bold font-mono'>
           {getProductId ?  <h2>Edit Product</h2> :  <h2>Create Product</h2>}
            </div>
    </div>


  
  <div className=" mt-8">


<form  onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-5">

      {/* Product Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-lg font-bold " htmlFor="productTitle">
          Product Title <sup className="text-red-700">*</sup>
        </label>
        <input
          id="productTitle"
          placeholder="Enter Product Title"
          {...register("title", { required: true })}
          className="form-style w-full outline-blue-900"
        />
        {errors.productTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product title is required
          </span>
        )}
      </div>

       {/* Product Short Description */}
       <div className="flex flex-col space-y-2">
        <label className="text-lg font-bold" htmlFor="productShortDesc">
        Product Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="productShortDesc"
          placeholder="Enter Description"
          {...register("description", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.productShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Description is required
          </span>
        )}
      </div>

    {/* Product Price */}
    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productPrice">
          Product Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="productPrice"
            placeholder="Enter Course Price"
            {...register("price", 
            // {
            //   required: true,
            //   valueAsNumber: true,
            //   pattern: {
            //     value: /^(0|[1-9]\d*)(\.\d+)?$/,
            //   },
            // }
            )}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.productPrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Price is required
          </span>
        )}
      </div>


     {/* Product Category */}
       <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productCategory">
          Product Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("category", { required: true })}
          defaultValue=""
          id="productCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            allCategory?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.productCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Category is required
          </span>
        )}
      </div>

 {/* Product Quantity */}
 <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productQuantity">
          Product Quantity <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="productQuantity"
            placeholder="Enter Course Price"
            {...register("quantity", 
            // {
            //   required: true,
            //   valueAsNumber: true,
            //   pattern: {
            //     value: /^(0|[1-9]\d*)(\.\d+)?$/,
            //   },
            // }
            )}
            className="form-style w-full !pl-12"
          />
        </div>
        {errors.productQuantity && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Price is required
          </span>
        )}
      </div>

   {/* Product Tags */}
   <ChipInput
        label="Tags"
        name="tag"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

        {/* Product Color */}
        <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={product?.color || color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />

  {/* Product Tags */}
  <ChipInput
        label="Size"
        name="size"
        placeholder="Enter Size and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

<div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => imageUpload(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3 w-screen">
            {imgshow?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => imageUpload(i)}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt={i} width={200} height={200} />
                </div>
              );
            })}
            {img?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    // onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>


<div>
  <button>Submit</button>
</div>
</form>

  </div>
  



  </div>
)
}

export default AddProduct;
