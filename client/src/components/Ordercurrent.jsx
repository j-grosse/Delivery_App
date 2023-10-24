import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosInstance';
import OrderCards from './OrderCards';
import { v4 as uuidv4 } from 'uuid';

const Ordercurrent = () => {
  const [Orders, setOrders] = useState(null); // Orders array from backend
  useEffect(() => {
    axios
      .get(`/api/Orders/currentOrder`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col flex-wrap ">
      <h1 className="mb-12 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        Current
      </h1>

      <div className="">
        <br />
        <ul className="flex gap-2 flex-wrap">
          {Orders &&
            Orders.map((order) => (
              <li
                key={uuidv4()}
                className="flex flex-shrink-0 mb-[2rem] flex-wrap"
              >
                <OrderCards
                  order={order}
                  Orders={Orders}
                  setOrders={setOrders}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Ordercurrent;
