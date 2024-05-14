import { useDispatch, useSelector } from "react-redux";
import OrdersStats from "./OrdersStatistics";
import { fetchOrdersAction } from "../../../redux/slice/orders/ordersSlice";
import { useEffect } from "react";

const customers = [
  {
    name: "Lindu Walton",
    email: "Lindu.walton@gmail.com",
    country:"Nepal",
    city:"kathmandu",
    phone:"+977 9818478083",
    postalCode:"44600"
  },
  {
    name: "harry Shrestha",

    email: "harry@gmail.com",
    country:"Nepal",
    city:"kathmandu",
    phone:"+977 9818478072",
    postalCode:"44600"
  },
  {
    name: "Tom Shrestha",
    email: "tom@gmail.com",
    country:"Nepal",
    city:"kathmandu",
    phone:"+977 9818478002",
    postalCode:"44600"
  },
  {
    name: "Astha Shrestha",
    email: "astha@gmail.com",
    country:"Nepal",
    city:"kathmandu",
    phone:"+977 9818478001",
    postalCode:"44600"
  }
  // More people...
];

export default function Customers() {
  // //! dispatch
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchOrdersAction());
  // }, [dispatch]);

  // //! get data from store
  // // const { error, loading, orders } = useSelector((state) => state?.orders);
  // // const customers = orders?.order;
  // // console.log("customers",customers)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>

      <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
        All Customers
      </h3>
      <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Full Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Email
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Country
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                City
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Phone
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Postal Code
              </th>
              {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {customers?.map((customer) => (
              <tr key={customer.phone}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {customer.name}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {customer.email}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {customer.country}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {customer.city}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {customer.phone}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {customer.postalCode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
