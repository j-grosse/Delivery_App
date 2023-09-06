import React, { useEffect, useState } from "react";
import TableItems from "./TableItems";
import axios from "../axiosInstance";
import { v4 as uuidv4 } from "uuid";

const Dashtable = () => {
  const [Orders, setOrders] = useState(null); // Orders array from backend
  useEffect(() => {
    axios
      .get(`/api/orders`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log("🚀 ~ file: Dashtable.jsx:17 ~ Dashtable ~ Orders:", Orders);

  return (
    <>
      <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-left text-gray-900 dark:text-white ">
        Recent Orders
      </h1>
      <section className="bg-primary-50/00 dark:bg-gray-900 py-3 sm:py-5">
        <div className="px-0 mx-auto max-w-screen-2xl lg:px-0">
          <div className="relative overflow-hidden bg-white  dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-gray-500">All Orders:</span>
                  <span className="dark:text-white">
                    {Orders && Orders.length}
                  </span>
                </h5>
              </div>
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3"></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* <th scope="col" className="px-4 py-3">
                      Order id
                    </th> */}
                    <th scope="col" className="px-4 py-3">
                      Pickup location
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Drop location
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Employee
                    </th>
                    {/* <th scope="col" className="px-4 py-3">
                      Employee Id
                    </th> */}
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Last Update
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Orders &&
                    Orders.map((order) => {
                      console.log(
                        "🚀 ~ file: Dashtable.jsx:77 ~ Dashtable ~ order:",
                        order
                      );

                      console.log(
                        "🚀 ~ file: Dashtable.jsx:87 ~ Dashtable ~ Orders:",
                        Orders
                      );
                      return (
                        <TableItems
                          key={uuidv4()}
                          order={order}
                          Orders={Orders}
                          setOrders={setOrders}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashtable;
