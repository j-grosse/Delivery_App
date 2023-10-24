import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';
import { AuthContext } from '../context/Auth';

const OrderDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null); // order object from backend

  useEffect(() => {
    axios
      .get(`/api/Orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch((e) => setError(e.response?.data?.message));
  }, []);

  const handleDelete = () => {
    axios
      .delete(`/api/Orders/${id}`)
      .then((res) => navigate('/'))
      .catch((e) => console.log(e));
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {order && (
        <section className=" bg-primary-50 dark:bg-gray-900 pt-8 pb-28">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Order Details
          </h2>
          <div className="py-2 px-10 mx-auto max-w-2xl">
            <div className="flex flex-col items-left bg-gray-50 border border-gray-200 rounded-lg shadow md:flex-col md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-8 shadow-lg">
              <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white"></h2>
              <div className="">
                <p className="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-lg dark:text-white">
                  from
                  <br />
                </p>
                {order.pickupLocation}
                <br />
                <br />
                <p className="mb-4 text-xl font-semibold leading-none text-gray-900 md:text-lg dark:text-white">
                  to <br />
                </p>
                {order.dropLocation}
              </div>
              <div>
                <dl>
                  <dd className="mb-4 mt-12 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
              {/* <p>{order.customerId}</p>
                  <p>{order.employeeId}</p>
                  <p>{order.claimed}</p>
                  <p>{order.paid}</p>
                  <p>{order.timestamps}</p> */}
                  </dd>
                </dl>
                <dl className="flex items-center space-x-8 mb-6">
                  <div>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                      ID
                    </dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                      {order._id.slice(-4)}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                      Price
                    </dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                      € {order.price}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                      Weight
                    </dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                      {order.weight} kg
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                      Size
                    </dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                      <p>
                        {' '}
                        {order.height}m x {order.length}m x {order.width}m
                      </p>{' '}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                      Created
                    </dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                      {order.updatedAt.slice(0, -8).replace('T', ' ')}{' '}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex self-center items-center space-x-4">
                <button
                  type="button"
                  className="text-white inline-flex items-center bg-primary-500 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    aria-hidden="true"
                    className="mr-1 -ml-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <Link to={`/orders/${id}/update`}>Update</Link>
                </button>

                {user.userType === 'customer' && (
                <button
                  type="button"
                  className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={handleDelete}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-1.5 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Delete
                </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderDetails;
