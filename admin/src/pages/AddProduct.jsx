"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Dropzone from "react-dropzone"
import { useParams } from "react-router-dom"
import { FiPlus, FiX, FiUpload, FiTag, FiDollarSign, FiInfo, FiType, FiBox, FiShoppingBag } from "react-icons/fi"
import { MdOutlineCleaningServices, MdOutlinePriceCheck } from "react-icons/md"
import { TbGenderBigender } from "react-icons/tb"
import { GiClothes, GiWashingMachine } from "react-icons/gi"
import { IoColorPaletteOutline } from "react-icons/io5"
import MultiSelectDropdown from "../components/Product/MultiSelectDropDown."
import SizeSelect from "../components/Product/SizeSelect"
import { fetchCategory, imageUpload, createProduct, editProduct } from "../serivces/operations/admin"
import { fetchProductDetails } from "../serivces/operations/product"

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      sizes: [],
      gender: [],
    },
  })
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedGenders, setSelectedGenders] = useState([])
  const { id } = useParams()
  const [categories, setCategories] = useState([])
  const [images, setImages] = useState([])
  const [pId, setPid] = useState("")
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = () => {
    if (tagInput) {
      const updatedTags = [...tags, tagInput]
      setTags(updatedTags)
      setValue("tag", updatedTags)
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
    setValue("tag", updatedTags)
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("slug", data.slug)
      formData.append("tag", JSON.stringify(data.tag))
      formData.append("description", data.description)
      formData.append("price", data.price)
      formData.append("highPrice", data.highPrice)
      formData.append("view", data.view)
      formData.append("fabric", data.fabric)
      formData.append("gsm", data.gsm)
      formData.append("washingInstructions", data.washingInstructions)
      formData.append("printing", data.printing)
      formData.append("category", data.category)
      formData.append("gender", JSON.stringify(selectedGenders))
      formData.append("sizes", JSON.stringify(selectedSizes))
      formData.append("images", JSON.stringify(images))

      if (id) {
        formData.append("id", pId)
        await editProduct(formData)
      } else {
        await createProduct(formData)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Unisex", label: "Unisex" },
  ]

  const removeImage = (publicId) => {
    const updatedImages = images.filter((image) => image.public_id !== publicId)
    setImages(updatedImages)
  }

  const uploadImage = async (acceptedFiles) => {
    const response = await imageUpload(acceptedFiles)
    const uploadedImages = response?.map((image) => ({
      public_id: image?.asset_id,
      url: image?.url,
    }))
    setImages((prevImages) => [...prevImages, ...uploadedImages])
  }

  useEffect(() => {
    const fetchCategoryMain = async () => {
      try {
        const response = await fetchCategory()
        setCategories(response)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    const fetchProductDetailsMain = async () => {
      if (id) {
        try {
          const productResponse = await fetchProductDetails(id)
          const product = productResponse?.data?.productDetails

          setValue("title", product?.title)
          setValue("slug", product?.slug)
          setValue("tag", product?.tag)
          setValue("description", product?.description)
          setValue("price", product?.price)
          setValue("highPrice", product?.highPrice)
          setValue("view", product?.view)
          setValue("fabric", product?.fabric)
          setValue("gsm", product?.gsm)
          setValue("washingInstructions", product?.washingInstructions)
          setValue("printing", product?.printing)
          setValue("category", product?.category)
          setValue("gender", JSON.stringify(selectedGenders))
          setValue("sizes", JSON.stringify(selectedSizes) || [])
          setValue("images", JSON.stringify(images))

          setPid(product?._id)
          setTags(product?.tag || [])
          setSelectedSizes(product?.sizes)
          setSelectedGenders(product?.gender)
          setImages(product.images)
        } catch (error) {
          console.error("Error fetching product details:", error)
        }
      }
    }

    fetchCategoryMain()
    fetchProductDetailsMain()
  }, [id, setValue])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">{id ? "Edit Product" : "Add New Product"}</h1>
        <p className="text-gray-500 text-center mt-2">
          Fill in the details below to {id ? "update" : "create"} your product
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiInfo className="mr-2 text-gray-600" /> Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 flex items-center">
                <FiType className="mr-2 text-gray-500" /> Title <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: "Title is required" })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"} focus:border-transparent focus:outline-none focus:ring-2`}
                placeholder="Enter product title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 flex items-center">
                <FiBox className="mr-2 text-gray-500" /> Category <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.category ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"} focus:border-transparent focus:outline-none focus:ring-2 bg-white`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center">
                <FiInfo className="mr-2 text-gray-500" /> Description <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="description"
                {...register("description", { required: "Description is required" })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"} focus:border-transparent focus:outline-none focus:ring-2 min-h-[120px]`}
                placeholder="Enter product description"
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiDollarSign className="mr-2 text-gray-600" /> Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 flex items-center">
                <FiDollarSign className="mr-2 text-gray-500" /> Price <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  id="price"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be greater than zero" },
                  })}
                  className={`w-full pl-8 pr-4 py-3 rounded-lg border ${errors.price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"} focus:border-transparent focus:outline-none focus:ring-2`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* High Price */}
            <div className="space-y-2">
              <label htmlFor="highPrice" className="block text-sm font-medium text-gray-700 flex items-center">
                <MdOutlinePriceCheck className="mr-2 text-gray-500" /> High Price (Original)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  id="highPrice"
                  {...register("highPrice")}
                  className={`w-full pl-8 pr-4 py-3 rounded-lg border ${errors.highPrice ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"} focus:border-transparent focus:outline-none focus:ring-2`}
                  placeholder="0.00"
                />
              </div>
              {errors.highPrice && <p className="text-red-500 text-sm mt-1">{errors.highPrice.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <GiClothes className="mr-2 text-gray-600" /> Product Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fabric */}
            <div className="space-y-2">
              <label htmlFor="fabric" className="block text-sm font-medium text-gray-700 flex items-center">
                <GiClothes className="mr-2 text-gray-500" /> Fabric
              </label>
              <input
                type="text"
                id="fabric"
                {...register("fabric")}
                className={`w-full px-4 py-3 rounded-lg border ${errors.fabric ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"} focus:border-transparent focus:outline-none focus:ring-2`}
                placeholder="Cotton, Polyester, etc."
              />
              {errors.fabric && <p className="text-red-500 text-sm mt-1">{errors.fabric.message}</p>}
            </div>

            {/* GSM */}
            <div className="space-y-2">
              <label htmlFor="gsm" className="block text-sm font-medium text-gray-700 flex items-center">
                <MdOutlineCleaningServices className="mr-2 text-gray-500" /> GSM
              </label>
              <input
                type="text"
                id="gsm"
                {...register("gsm")}
                className={`w-full px-4 py-3 rounded-lg border ${errors.gsm ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"} focus:border-transparent focus:outline-none focus:ring-2`}
                placeholder="180, 200, etc."
              />
              {errors.gsm && <p className="text-red-500 text-sm mt-1">{errors.gsm.message}</p>}
            </div>

            {/* Washing Instructions */}
            <div className="space-y-2">
              <label
                htmlFor="washingInstructions"
                className="block text-sm font-medium text-gray-700 flex items-center"
              >
                <GiWashingMachine className="mr-2 text-gray-500" /> Washing Instructions
              </label>
              <input
                type="text"
                id="washingInstructions"
                {...register("washingInstructions")}
                className={`w-full px-4 py-3 rounded-lg border ${errors.washingInstructions ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"} focus:border-transparent focus:outline-none focus:ring-2`}
                placeholder="Machine wash, Hand wash, etc."
              />
              {errors.washingInstructions && (
                <p className="text-red-500 text-sm mt-1">{errors.washingInstructions.message}</p>
              )}
            </div>

            {/* Printing */}
            <div className="space-y-2">
              <label htmlFor="printing" className="block text-sm font-medium text-gray-700 flex items-center">
                <IoColorPaletteOutline className="mr-2 text-gray-500" /> Printing
              </label>
              <input
                type="text"
                id="printing"
                {...register("printing")}
                className={`w-full px-4 py-3 rounded-lg border ${errors.printing ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-500"} focus:border-transparent focus:outline-none focus:ring-2`}
                placeholder="Screen printing, Digital printing, etc."
              />
              {errors.printing && <p className="text-red-500 text-sm mt-1">{errors.printing.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiShoppingBag className="mr-2 text-gray-600" /> Product Variants
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {/* Sizes */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiBox className="mr-2 text-gray-500" /> Available Sizes
              </label>
              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <SizeSelect selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes} />
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <TbGenderBigender className="mr-2 text-gray-500" /> Gender
              </label>
              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <MultiSelectDropdown
                  title="Select Gender"
                  options={genderOptions}
                  selectedOptions={selectedGenders}
                  setSelectedOptions={setSelectedGenders}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiTag className="mr-2 text-gray-500" /> Product Tags
              </label>
              <div className="bg-white p-4 rounded-lg border border-gray-300">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-transparent focus:outline-none focus:ring-2"
                    placeholder="Add a tag"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  >
                    <FiPlus className="mr-2" /> Add
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                  {tags.length === 0 && <span className="text-gray-500 text-sm">No tags added yet</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiUpload className="mr-2 text-gray-600" /> Product Images
          </h2>
          <div className="space-y-4">
            <Dropzone onDrop={(acceptedFiles) => uploadImage(acceptedFiles)}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-gray-500 bg-gray-100"
                      : "border-gray-300 hover:border-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <FiUpload className="h-10 w-10 text-gray-400" />
                    <p className="text-gray-600">Drag and drop images here, or click to select files</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
            </Dropzone>

            {images.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Product Images ({images.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(image.public_id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                        aria-label="Remove image"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>{id ? "Update Product" : "Create Product"}</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
