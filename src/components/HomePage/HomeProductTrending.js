import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsAction } from "../../redux/slice/products/productSlices";
import baseURL from "../../utils/baseURL";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HomeProductTrending = () => {
  //dispatch
  const dispatch = useDispatch();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 500, // Set autoplay speed to 3 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let productUrl = `${baseURL}/products`;

  useEffect(() => {
    dispatch(
      fetchProductsAction({
        url: productUrl,
      })
    );
  }, [dispatch]);

  //get data from store
  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.products);
  // console.log(products)
  if (loading) {
    return <p>Loading...</p>;
  }

  const trendingProducts = [];

  return (
    <>
      <section aria-labelledby="trending-heading">
        <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
          <div className="md:flex md:items-center md:justify-between">
            <h2
              id="favorites-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
               Products you may like
            </h2>
            <Link
              to="/products-filters" // Update this path to your products page path
              className="font-medium text-pink-600 hover:text-pink-500"
            >
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
          <Slider {...settings} >
      {products?.map((product) => (
        <div key={product._id} className="px-4 border-pink-400">
          <Link to={`/products/${product._id}`} className="group relative">
            <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
              <img
                src={product.images}
                alt={product.images}
                className="h-full w-full object-cover object-center outline-pink-400"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
              <span className="absolute inset-0" />
              {product.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-900">
              Rs {product.price}.00
            </p>
            <p className="mt-1 text-sm text-gray-500">{product.description}</p>
          </Link>
        </div>
      ))}
    </Slider>

          <div className="mt-8 text-sm md:hidden">
            <a
              href="#"
              className="font-medium text-pink-600 hover:text-pink-500"
            >
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeProductTrending;
