import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import {
  fetchSingleProductAction,
  updateProductAction,
} from "../../../redux/slice/products/productSlices";
import { fetchCategoryAction } from "../../../redux/slice/categories/categoriesSlice";
import { fetchBrandsAction } from "../../../redux/slice/categories/brandsSlice";
import { fetchColorsAction } from "../../../redux/slice/categories/colorsSlice";
import { useParams } from "react-router-dom";

//animated components for react-select
const animatedComponents = makeAnimated();

export default function UpdateProducts() {
  //! disapatch
  const dispatch = useDispatch();

  //* get id from params
  const { id } = useParams();

  //Fetch single product
  useEffect(() => {
    dispatch(fetchSingleProductAction(id));
  }, [id, dispatch]);

  //? Sizes
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [sizeOption, setSizeOption] = useState([]);
  const handleSizeChange = (sizes) => {
    setSizeOption(sizes);
  };

  //converted sizes
  const sizeOptionsCoverted = sizes?.map((size) => {
    return {
      value: size,
      label: size,
    };
  });

  //?categories
  useEffect(() => {
    dispatch(fetchCategoryAction());
  }, [dispatch]);

  //select data from store (categories)
  const { categories } = useSelector((state) => state?.categories?.categories);

  //  console.log(loading, categories, error);

  //! brands
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  //select data from store (brands)
  const {
    brands: { brands },
  } = useSelector((state) => state?.brands);

  //Colors
  const [colorsOption, setColorsOption] = useState([]);

  //select data from store (colors)
  const {
    colors: { colors },
  } = useSelector((state) => state?.colors);

  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  //!colors handlechange
  const handleColorChange = (colors) => {
    setColorsOption(colors);
  };

  //colors converted
  const colorsConverted = colors?.map((color) => {
    return {
      value: color?.name,
      label: color?.name,
    };
  });

  //get product from store
  const {
    product,
    isUpdated,
    loading,
    error,
  } = useSelector((state) => state?.products);

  //---form data---
  const [formData, setFormData] = useState({
    name: product?.product?.name,
    description: product?.product?.description,
    category: "",
    sizes: "",
    brand: "",
    colors: "",
    price: product?.product?.price,
    totalQty: product?.product?.totalQty,
  });

  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();

    //!dispatch
    dispatch(
      updateProductAction({
        ...formData,
        id,
        colors: colorsOption?.map((color) => color.label),
        sizes: sizeOption?.map((size) => size?.label),
      })
    );
    console.log(formData);
    // reset form data
    setFormData({
      name: "",
      description: "",
      category: "",
      sizes: "",
      brand: "",
      colors: "",
      images: "",
      price: "",
      totalQty: "",
    });
  };

  return (
    <>
      {/* Error */}
      {error && <ErrorMsg message={error?.message} />}

      {/* success message */}
      {/* {isUpdated && <SuccessMsg message="Product Updated Successfully" />} */}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Update Product
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-pink-600 hover:text-pink-500">
              Manage Products
            </p>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <div className="mt-1">
                  <input
                    name="name"
                    value={formData?.name}
                    onChange={handleOnChange}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* size option */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Size
                </label>
                <Select
                  components={animatedComponents}
                  isMulti
                  name="sizes"
                  options={sizeOptionsCoverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={(item) => handleSizeChange(item)}
                />
              </div>

              {/* Select category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleOnChange}
                  className="mt-1  block w-full rounded-md border-gray-300 py-2  pl-3 pr-10 text-base focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm border"
                  defaultValue="Canada"
                >
                  <option>-- Select Category --</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleOnChange}
                  className="mt-1  block w-full rounded-md border-gray-300 py-2  pl-3 pr-10 text-base focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm border"
                  defaultValue="Canada"
                >
                  <option>-- Select Brand --</option>
                  {brands?.map((brand) => (
                    <option key={brand?._id} value={brand?.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Color
                </label>
                <Select
                  components={animatedComponents}
                  isMulti
                  name="colors"
                  options={colorsConverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={(e) => handleColorChange(e)}
                />
              </div>

              {/* price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="mt-1">
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Quantity
                </label>
                <div className="mt-1">
                  <input
                    name="totalQty"
                    value={formData.totalQty}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* description */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Product Description
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleOnChange}
                    className="block w-full rounded-md border-gray-300 border shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    Update Product
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
