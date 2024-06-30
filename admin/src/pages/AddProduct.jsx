import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddProduct.css'; // Import external CSS file
import { fetchCategory, imageUpload, createProduct, editProduct } from '../serivces/operations/admin';
import Dropzone from 'react-dropzone';
import MultiSelectDropdown from '../components/Product/MultiSelectDropDown.';
import { fetchProductDetails } from '../serivces/operations/product';
import { useParams } from 'react-router-dom';

const ProductForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      sizes: [],
      gender: [],
    },
  });
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('slug', data.slug);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('highPrice', data.highPrice);
    formData.append('view', data.view);
    formData.append('fabric', data.fabric);
    formData.append('gsm', data.gsm);
    formData.append('washingInstructions', data.washingInstructions);
    formData.append('printing', data.printing);
    formData.append('quantity', data.quantity);
    formData.append('category', data.category);
    formData.append('gender', JSON.stringify(selectedGenders));
    formData.append('sizes', JSON.stringify(selectedSizes));
    formData.append('images', JSON.stringify(images));

    if (id) {
      await editProduct({ ...formData, id });
    } else {
      await createProduct(formData);
    }
  };

  const sizeOptions = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' },
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Unisex', label: 'Unisex' },
  ];

  const removeImage = (publicId) => {
    const updatedImages = images.filter((image) => image.public_id !== publicId);
    setImages(updatedImages);
  };

  const uploadImage = async (acceptedFiles) => {
    const response = await imageUpload(acceptedFiles);
    const uploadedImages = response?.map((image) => ({
      public_id: image?.asset_id,
      url: image?.url,
    }));
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  useEffect(() => {
    const fetchCategoryMain = async () => {
      try {
        const response = await fetchCategory();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProductDetailsMain = async () => {
      if (id) {
        try {
          const productResponse = await fetchProductDetails(id);
          const product = productResponse?.data?.productDetails;
          setValue('title', product.title);
          setValue('description', product.description);
          setValue('price', product.price);
          setValue('highPrice', product.highPrice);
          setValue('view', product.view);
          setValue('fabric', product.fabric);
          setValue('gsm', product.gsm);
          setValue('washingInstructions', product.washingInstructions);
          setValue('printing', product.printing);
          setValue('quantity', product.quantity);
          setValue('category', product.category);
          setValue('gender', JSON.stringify(selectedGenders));
          setValue('sizes', JSON.stringify(selectedSizes));
          setValue('images', JSON.stringify(images));
          setSelectedSizes(product?.sizes);
          setSelectedGenders(product?.gender);
          setImages(product.images);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchCategoryMain();
    fetchProductDetailsMain();
  }, [id, setValue]);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="font-bold text-2xl text-center mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className={`form-input ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            className={`form-input ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price must be greater than zero' },
            })}
            className={`form-input ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="highPrice" className="form-label">
            High Price
          </label>
          <input
            type="number"
            id="highPrice"
            {...register('highPrice')}
            className={`form-input ${errors.highPrice ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.highPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.highPrice.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="fabric" className="form-label">
            Fabric
          </label>
          <input
            type="text"
            id="fabric"
            {...register('fabric')}
            className={`form-input ${errors.fabric ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.fabric && (
            <p className="text-red-500 text-sm mt-1">{errors.fabric.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="gsm" className="form-label">
            GSM
          </label>
          <input
            type="text"
            id="gsm"
            {...register('gsm')}
            className={`form-input ${errors.gsm ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.gsm && (
            <p className="text-red-500 text-sm mt-1">{errors.gsm.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="washingInstructions" className="form-label">
            Washing Instructions
          </label>
          <input
            type="text"
            id="washingInstructions"
            {...register('washingInstructions')}
            className={`form-input ${errors.washingInstructions ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.washingInstructions && (
            <p className="text-red-500 text-sm mt-1">{errors.washingInstructions.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="printing" className="form-label">
            Printing
          </label>
          <input
            type="text"
            id="printing"
            {...register('printing')}
            className={`form-input ${errors.printing ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.printing && (
            <p className="text-red-500 text-sm mt-1">{errors.printing.message}</p>
          )}
        </div>

        <MultiSelectDropdown
          title="Sizes"
          options={sizeOptions}
          selectedOptions={selectedSizes}
          setSelectedOptions={setSelectedSizes}
        />

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            {...register('category', { required: 'Category is required' })}
            className={`form-select ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        <MultiSelectDropdown
          title="Gender"
          options={genderOptions}
          selectedOptions={selectedGenders}
          setSelectedOptions={setSelectedGenders}
        />

        <div className="form-group">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            {...register('quantity', {
              required: 'Quantity is required',
              min: { value: 0, message: 'Quantity must be greater than zero' },
            })}
            className={`form-input ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
          )}
        </div>

        <div className="dropzone-wrapper">
          <Dropzone onDrop={(acceptedFiles) => uploadImage(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="images-preview flex gap-4 mt-4 flex-wrap">
        {images?.map((image, index) => (
          <div className="relative" key={index}>
            <button
              type="button"
              onClick={() => removeImage(image.public_id)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img src={image.url} alt="" className="w-40 h-40 object-cover rounded-lg shadow-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductForm;
