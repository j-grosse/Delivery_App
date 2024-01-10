import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosInstance';
const Claimcards = ({ order }) => {
  const navigate = useNavigate();
  const id = order._id;
  const handleDelete = () => {
    axios
      .delete(`/api/orders/${id}`)
      .then((res) => navigate('/'))
      .catch((e) => console.log(e));
  };

  return (
    <a
      // href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src="/docs/images/blog/image-4.jpg"
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <Link to={`/orders/${order._id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Order
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Customer: {order.customerId.username}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          OrderId: {order._id.slice(-4)}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Orderstatus: {order.claimed ? 'Claimed' : 'Wait for claiming'}
        </p>
        <div>
          <button
            onClick={handleDelete}
            type="submit"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 shadow-lg mr-2"
          >
            Cancel
          </button>
          {/* <button
            onClick={() => {
              navigate(`/orders/${order._id}/comments`);
            }}
            type="submit"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Rate
          </button> */}
        </div>
      </div>
    </a>
  );
};

export default Claimcards;
