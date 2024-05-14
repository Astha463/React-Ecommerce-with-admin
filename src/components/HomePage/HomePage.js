import { Link } from "react-router-dom";
import HomeCategories from "./HomeCategories";
import HomeProductTrending from "./HomeProductTrending";
import Slider from "react-slick";
import image1 from "../../assets/images/welcome-to our onlinestore.jpg"
import image2 from "../../assets/images/pinkfiftysale.jpg"
import image3 from "../../assets/images/pinkfriday.jpg"
import image4 from "../../assets/images/PINK.jpg"
import image5 from "../../assets/images/pinkcoat.jpg"
import image6 from "../../assets/images/pinkdress.jpg"
import image7 from "../../assets/images/pinkgirl.webp"
import image8 from "../../assets/images/jwellery bag.jpg"
import image9 from "../../assets/images/pinkandyellow.webp"
import image10 from "../../assets/images/sandal.avif"
import image11 from "../../assets/images/shoeandbag.jpg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const perks = [
  {
    name: "Free returns",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg",
    description:
      "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
  },
  {
    name: "Same day delivery",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg",
    description:
      "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
  },
  {
    name: "All year discount",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg",
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: "For the planet",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg",
    description:
      "We’ve pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];
const images=[image1,image2,image3,image9]
const images2=[image4,image5,image6,image7]
const images3=[image8,image10,image11]


export default function Example() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
   
};
const settings1 = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
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
const settings2 = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
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
  return (
    <div className="bg-white h-screen w-screen">
      <main className="h-1/4">
      <Slider {...settings}>
        {images?.map((image)=>(
          <div>
            <img src={image} 
            alt="billboard"
            width={1500}
            height={200}
            
            />
          </div>
        )
        )}
      
         
      
    </Slider>

     
      <main>
        {/* Category section */}
        <section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900">
              Shop by Category
            </h2>
            <Link
              to="/all-categories"
              className="hidden text-sm font-semibold text-pink-600 hover:text-pink-500 sm:block">
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
          
          {/* home categories */}
          <div className="mb-4 pb-4">  <HomeCategories /></div>
        
        
        <div className="mt-5 pt-5 " >
        <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900">
              Explore Dresses
            </h2>
            <Slider {...settings1}>
        {images2?.map((image)=>(
          <div>
            <img src={image} 
            alt="pinks"
           
            
            />
          </div>
        )
        )}
      
            </Slider>

          </div>
        {/* Home trending trending */}
      
        <div className="m-5 p-5 ">
        <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900">
              Explore Shoes and bags
            </h2>
          
          <Slider {...settings2}>
      {images3?.map((image)=>(
        <div>
          <img src={image} 
          alt="pinks"
         
          
          />
        </div>
      )
      )}
    
  </Slider>

        </div>
        </section>
      </main>
      </main>
    </div>
  );
}
