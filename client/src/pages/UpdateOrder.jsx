import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axiosInstance';

const UpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState();
  const styleInputField =
    'bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500';

  useEffect(() => {
    axios
      .get(`/api/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch((e) => setError(e.response?.data?.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/orders/${id}`, order)
      .then((res) => {
        console.log(res.data);
        navigate('/dashboard');
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
    // const updatedOrder = {...order}
    // updatedOrder[name] = value
    // setState(updatedOrder)
  };
  return (
    <div className="bg-primary-50/00">
      <section className=" bg-primary-50 dark:bg-gray-900 pt-8 pb-28">
        <div className="px-4 mx-auto max-w-2xl">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Update Order
          </h2>
          <div className="flex flex-col items-left bg-gray-50 border border-gray-200 rounded-lg md:flex-col md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-8 mx-auto shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="">
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Origin
                  </label>

                  <input
                    type="text"
                    name="pickupLocation"
                    value={order?.pickupLocation || ''}
                    onChange={handleChange}
                    required
                    className={styleInputField}
                    placeholder="PickupLocation"
                  />
                </div>

                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Destination
                  </label>

                  <input
                    type="text"
                    name="dropLocation"
                    value={order?.dropLocation || ''}
                    onChange={handleChange}
                    required
                    className={styleInputField}
                    placeholder="DropLocation"
                  />
                </div>

                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={order?.weight || ''}
                    onChange={handleChange}
                    className={styleInputField}
                    placeholder="Weight"
                  />

                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Height (m)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={order?.height || ''}
                    onChange={handleChange}
                    className={styleInputField}
                    placeholder="Height"
                  />
                </div>

                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Length (m)
                  </label>
                  <input
                    type="number"
                    name="length"
                    value={order?.length || ''}
                    onChange={handleChange}
                    className={styleInputField}
                    placeholder="Length"
                  />

                  <label
                    htmlFor=""
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Width (m)
                  </label>
                  <input
                    type="number"
                    name="width"
                    value={order?.width || ''}
                    onChange={handleChange}
                    className={styleInputField}
                    placeholder="Width"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button className="inline-flex items-center px-10 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white bg-primary-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 shadow-lg">
                  Update Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateOrder;
