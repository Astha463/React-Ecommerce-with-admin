// import { useDispatch, useSelector } from "react-redux";
// import AddShippingAddress from "../Forms/AddShippingAddress";
// import { getCartItemsFromLocalStorageAction } from "../../../redux/slice/cart/cartSlice";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { placeOrderAction } from "../../../redux/slice/orders/ordersSlice";
// import { getUserProfileAction } from "../../../redux/slice/users/usersSlice";
// import LoadingComponent from "../../LoadingComp/LoadingComponent";
// import ErrorMsg from "../../ErrorMsg/ErrorMsg";
// import { Esewa } from "../Payment/Esewa";
// import { Table } from "antd";

// export default function OrderPayment() {
//   //get data from location
//   const location = useLocation();
//   const { sumTotalPrice } = location.state;
//   console.log(sumTotalPrice);

//   const calculateTotalDiscountedPrice = () => {};
//   //!dispatch
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCartItemsFromLocalStorageAction());
//   }, [dispatch]);

//   //get cart item from store
//   const { cartItems } = useSelector((state) => state?.carts);

//   //get user profile
//   useEffect(() => {
//     dispatch(getUserProfileAction());
//   }, [dispatch]);

//   //get data from store
//   const { loading, error, profile } = useSelector((state) => state?.users);

//   const user = profile?.user;

//   //place order action
//   //get shipping address
//   const shippingAddress = user?.shippingAddress;
//   const placeOrderHandler = () => {
//     dispatch(
//       placeOrderAction({
//         shippingAddress,
//         orderItems: cartItems,
//         totalPrice: sumTotalPrice,
//       })
//     );
//     //empty cart items after payment
//     // localStorage.removeItem('cartItems')
//   };

//   const { loading: orderLoading, error: orderErr } = useSelector(
//     (state) => state?.orders
//   );
//   const [isPayment,setIsPayment]=useState({
//     esewa:true,
//     khalti:false,
//     cod:false,
//   });

//     const columns = [
//       {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//       },
//       {
//         title: 'Price',
//         dataIndex: 'price',
//         key: 'price',
//       },
//       {
//         title: 'Quantity',
//         dataIndex: 'qty',
//         key: 'qty',
//       },
//     ];
//     const totalQuantity = cartItems.reduce((previous, item) => {
//       return item.qty  + previous;
//     }, 0);
//     const TotalPrice = cartItems.reduce((previous, item) => {
//       return (
//         (item.price * item.qty) + previous
//       )
//     }, 0)

//   const path="https://uat.esewa.com.np/epay/main";
//   const params={
//       amt: 100,
//       psc:0,
//       pdc:0,
//       txAmt:0,
//       tAmt:100,
//       pid:"ee2c3cal",
//       scd:"EPAYTEST",
//       su:"https://merchant.com.np/page/esewa_payment_success",
//       fu:"https://merchant.com.np/page/esewa_payment_failed",
//     }
//     const Payment=[
//       {
//         name:"Esewa",
//         color:"limegreen",
//         id:1,
//         logo:"https://th.bing.com/th/id/OIP.iJwN4-dPt7UkbndhLEycVAHaD4?rs=1&pid=ImgDetMain"
  
//     }]
//     const handlePayment=(id)=>{
//       console.log('safas',id);
//       if(id===1){
//         setIsPayment({
//           esewa:true,
//           khalti:false,
//         })
//       }
//     else if(id===2){
//          setIsPayment({
//           esewa:false,
//           khalti:true,
//          })
//       }
//     }
//   return (
//     <>
//       {orderErr && <ErrorMsg message={orderErr?.message} />}
//     <div className=' mt-5 font-varela px-6'>
//       <div className=' grid grid-cols-4 gap-x-3'>
//       <div className=' col-span-2' >
//       <Table dataSource={cartItems} columns={columns} 
//       rowKey={cartItems=>cartItems.id}/> </div>
//       <div className=' col-span-2'>
//       <h2>Payment Method</h2>
//       <section className=' flex gap-x-4 pt-3'>
      
//         {
//           Payment.map((item,idx)=>{
//             return(
//                 <div key={idx} style={{color:`${item.color}`}} className=' h-8 text-lg 
//                 font-varela' onClick={()=>handlePayment(item.id)}>
//                   <img src={item.logo} alt="logo" className='  h-14'/>
//                   <h1 className=' text-center'>{item.name}</h1>
//                 </div>
//             )
//           })
//         }
       
//         </section>
//         {
//           isPayment.esewa &&(
//             <Esewa path={path} params={params}/>
//           )
//         } 
//       </div>
//       </div>
//       <div className=' flex justify-center gap-3'>
//       <h1>Total Amount:{TotalPrice} </h1>
//       <h1>Total Quantity:{totalQuantity}</h1>
//       </div>
//     </div>
//   </>
//   );
// }
import { useDispatch, useSelector } from "react-redux";
import AddShippingAddress from "../Forms/AddShippingAddress";
import { getCartItemsFromLocalStorageAction } from "../../../redux/slice/cart/cartSlice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrderAction } from "../../../redux/slice/orders/ordersSlice";
import { getUserProfileAction } from "../../../redux/slice/users/usersSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";

export default function OrderPayment() {
  //get data from location
  const location = useLocation();
  const { sumTotalPrice } = location.state;
  console.log(sumTotalPrice);

  const calculateTotalDiscountedPrice = () => {};
  //!dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);

  //get cart item from store
  const { cartItems } = useSelector((state) => state?.carts);

  //get user profile
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  //get data from store
  const { loading, error, profile } = useSelector((state) => state?.users);

  const user = profile?.user;
  const navigate=useNavigate()
  //place order action
  //get shipping address
  const shippingAddress = user?.shippingAddress;
  const placeOrderHandler = () => {
    dispatch(
      placeOrderAction({
        shippingAddress,
        orderItems: cartItems,
        totalPrice: sumTotalPrice,
      })
   
  
    );
    //empty cart items after payment
    // localStorage.removeItem('cartItems')
  };

  const { loading: orderLoading, error: orderErr } = useSelector(
    (state) => state?.orders
  );

  return (
    <>
      {orderErr && <ErrorMsg message={orderErr?.message} />}
      <div className="bg-gray-50">
        <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
          

            <div className="flex justify-center items-center w-[80vw]">
              

              {/* Order summary */}
              <div className="mt-10 lg:mt-0 min-w-full  ">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>

                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <h3 className="sr-only">Items in your cart</h3>
                  <ul role="list" className="divide-y divide-gray-200">
                    {cartItems?.map((product) => (
                      <li key={product._id} className="flex py-6 px-4 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product._id}
                            className="w-20 rounded-md"
                          />
                        </div>

                        <div className="ml-6 flex flex-1 flex-col">
                          <div className="flex">
                            <div className="min-w-0 flex-1">
                              <p className="mt-1 text-sm text-gray-500">
                                {product.name}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.size}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.color}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-1 items-end justify-between pt-2">
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              Rs {product?.price} X {product?.qty} = Rs{" "}
                              {product?.totalPrice}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Taxes</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        Rs0.00
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                      <dt className="text-base font-medium">Sub Total</dt>
                      <dd className="text-base font-medium text-gray-900">
                        Rs {sumTotalPrice}.00
                      </dd>
                    </div>
                  </dl>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    {orderLoading ? (
                      <LoadingComponent />
                    ) : (
                      <button
                        onClick={placeOrderHandler}
                        className="w-full rounded-md border border-transparent bg-pink-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Confirm Payment - Rs{sumTotalPrice}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}