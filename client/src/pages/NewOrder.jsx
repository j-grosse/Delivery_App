import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth';
import Checkout from './Checkout';
import socket from '../../socket/socket';

import axios from '../axiosInstance';
import ProjMap from '../components/ProjMap';
import CatMilk from '../assets/cat-milk.png';

const NewOrder = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState('');
  console.log('pickupLocation', pickupLocation);
  const [dropLocation, setDropLocation] = useState('');
  // console.log("dropLocation",dropLocation)
  const [id, setId] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [checkout, setCheckout] = useState(true);
  const [distance, setDistance] = useState('');
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(false);
  const [customerId, setCustomerId] = useState(user._id);
  const [orderData, setOrderData] = useState(user._id);

  // const [employeeId, setEmployeeId] = useState('');

  // const [claimed, setClaimed] = useState('false');
  // const [price, setPrice] = useState(0);
  // const [paid, setPaid] = useState('false');

  /*
            <h2>{order._id}</h2>
          <p> {order.pickupLocation}</p>
          <p> {order.dropLocation}</p>
          <p> {order.weight}</p>
          <p> {order.height}</p>
          <p> {order.lenght}</p>
          <p> {order.width}</p>
        --  <p>{order.customerId}</p>
        --  <p>{order.employeeId}</p>
          <p>{order.claimed}</p>
          <p>{order.price}</p>
          <p>{order.paid}</p>
        --  <p>{order.timestamps}</p>
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    // let defaultImage = ""
    // {image: image || defaultImage}

    axios
      .post(`/api/orders`, {
        pickupLocation,
        dropLocation,
        weight,
        height,
        length,
        width,
        price,
        paid,
        customerId,
      })
      .then((res) => {
        setId(res.data._id);
        setOrderData(res.data);
        console.log(res.data._id);
        // socket.emit("message", res.data);
        // navigate("/");
      })
      .catch((e) => console.log(e));
  };

  console.log('checking order id', id);

  return (
    <div className="bg-primary-50/00">
      {checkout ? (
        <>
          <ProjMap
            price={price}
            setPrice={setPrice}
            distance={distance}
            setDistance={setDistance}
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            dropLocation={dropLocation}
            setDropLocation={setDropLocation}
          />

          <section className="bg-primary-50/00 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              {/* <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                My Order
              </h2> */}
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className=" ">
                    <label
                      htmlFor="origin"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Origin
                    </label>

                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="bg-primary-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="PickupLocation"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="destination"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Destination
                    </label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      value={dropLocation}
                      onChange={(e) => setDropLocation(e.target.value)}
                      className="bg-primary-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="DropLocation"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="item-weight"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="item-weight"
                      id="item-weight"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="item-height"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Height (m)
                    </label>
                    <input
                      type="number"
                      name="item-height"
                      id="item-height"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="item-length"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Length (m)
                    </label>
                    <input
                      type="number"
                      name="item-length"
                      id="item-length"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="item-width"
                      className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Width (m)
                    </label>
                    <input
                      type="number"
                      name="item-width"
                      id="item-width"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder=""
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 mt-10">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="8"
                    className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                  ></textarea>

                  <p className="flex justify-center align-items mt-8 font-bold text-lg">
                    Total: € {price}
                  </p>
                </div>
                <div className="flex justify-center">
                  <button className="inline-flex items-center px-10 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white bg-primary-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 shadow-lg">
                    Save Order
                  </button>
                </div>
                {/* <button
                  type="submit"
                  className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Add product
                </button> */}
              </form>
            </div>
          </section>
        </>
      ) : (
        <Checkout
          price={price}
          distance={distance}
          paid={paid}
          setPaid={setPaid}
          id={id}
          orderData={orderData}
        />
      )}

      <div className="flex items-center justify-center mb-2">
        {checkout && (
          <button
            onClick={() => setCheckout(false)}
            className="inline-flex items-center px-20 py-2.5 text-md font-medium text-center text-white bg-primary-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 shadow-lg"
          >
            Checkout
          </button>
        )}
        {/* {!checkout && (
          <button
            onClick={'/orders'}
          
            className=" inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-md font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800  "
          >
            My Orders
          </button>
        )} */}
      </div>

      {/* </section> */}
      {/* </> ) : (

    <Checkout price={price} distance={distance}/> 
    )} */}

      <img
        className="mx-auto mt-8 rounded-lg"
        src={CatMilk}
        alt="cat in bike basket"
      />
    </div>
  );
};

export default NewOrder;
