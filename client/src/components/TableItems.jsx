import React from 'react';
import { AuthContext } from '../context/Auth';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';
import { useContext } from 'react';
import { SlMagnifier } from 'react-icons/sl';
import Button from './Button';

function TableItems({ order, Orders, setOrders }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(Orders);

  const handleDelete = () => {
    axios
      .delete(`/api/Orders/${order._id}`)
      .then((res) => {
        const newOrders = Orders.filter((e) => e._id !== order._id);
        setOrders(newOrders);
      })
      .catch((e) => console.log(e));
  };

  const handleClaim = () => {
    order.claimed = true;
    order.employeeId = user._id;
    console.log('🚀 ~ file: OrderCards.jsx:26 ~ axios.put ~ order:', order);
    axios.put(`/api/Orders/${order._id}`, order).then((res) => {
      const newOrders = Orders.filter((e) => e._id !== order._id);
      setOrders(newOrders);
    });
  };

  const handleCancelOrder = () => {
    order.claimed = false;
  };

  const handleFinishedOrder = () => {
    order.delivered = true;
    axios.put(`/api/Orders/${order._id}`, order).then((res) => {
      const newOrders = Orders.filter((e) => e._id !== order._id);
      setOrders(newOrders);
    });
  };

  return (
    <tr className="border-b dark:border-gray-600 hover:bg-primary-100 dark:hover:bg-gray-700">
      <th
        scope="row"
        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {order._id.slice(-4)}
      </th>

      {/* <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex items-center">{order.pickupLocation}</div>
      </td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {order.dropLocation}
      </td> */}
      {/* <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {order.employeeId?.username || ""}
      </td> */}
      {/* <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex items-center">{order.employeeId?._id || ""}</div>
      </td> */}
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex items-center">
          {order.delivered
            ? 'delivered'
            : order.claimed
            ? 'claimed'
            : order.paid
            ? 'unclaimed'
            : 'not paid'}
        </div>
      </td>
      <td className="px-4 py-2">${order.price}</td>
      <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {order.updatedAt.slice(0, -8).replace('T', ' ')}
      </td>

      <td>
        <div>
          <button
            onClick={() => {
              navigate(`/orders/${order._id}`);
            }}
            type="submit"
            className="text-black bg-primary-200 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-9 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2"
          >
            <SlMagnifier />
          </button>

          {/* condition1 */}
          {/* {order.claimed === false && user.userType === 'employee' && (
            <button
              onClick={handleClaim}
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2"
            >
              Claim
              </button>
          )} */}

          {/* condition2 */}
          {order.claimed === false && user.userType === 'customer' && (
            <Button
              title="Cancel"
              color="dark"
              py="1.5"
              handler={handleDelete}
            />
            // <button
            //   onClick={handleDelete}
            //   type="submit"
            //   className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2"
            // >
            //   Cancel
            // </button>
          )}
          {/* condition3 */}
          {order.claimed &&
            !order.delivered &&
            user.userType === 'employee' && (
              <Button
                title="Cancel"
                color="dark"
                py="1.5"
                handler={handleCancelOrder}
              />
            )}
          {/* condition4 - show Finish button */}
          {/* {order.claimed === true &&
            user.userType === 'employee' &&
            order.delivered === false && (
              <button
                onClick={handleFinishedOrder}
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Finish
              </button>
            )} */}

          {/* condition 5 */}
          {/* {user.userType === "customer" && order.delivered === true && () */}

          {/* condition 6 - Rating */}
          {/* {user.userType === "customer" && order.delivered === true && (
            <button
              onClick={() => {
                navigate(`/orders/${order._id}/comments`);
              }}
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Rate
            </button>
          )} */}
        </div>
      </td>
    </tr>
  );
}

export default TableItems;
