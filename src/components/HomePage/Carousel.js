import { useEffect } from "react";
import baseURL from "../../utils/baseURL";
import { fetchProductsAction } from "../../redux/slice/products/productSlices";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Carousel = () => {
    //dispatch
    const dispatch = useDispatch();
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true, // Enable autoplay
      autoplaySpeed: 1000, // Set autoplay speed to 3 seconds
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
  
    
    //get data from store
    const {
      products = [],
      loading,
      error,
    } = useSelector((state) => state.products);
    // console.log(products)
   
  
    const trendingProducts = [];
  
    return (
      <>

<Slider {...settings}>
{products?.map((product) => (
  <div key={product._id} className="px-4">
    <Link to={`/products/${product._id}`} className="group relative">
      <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
        <img
          src={product.images}
          alt={product.images}
          className="h-full w-full object-cover object-center"
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
</>
)}
export default Carousel