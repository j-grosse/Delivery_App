import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import socket from '../../socket/socket';
import bell from '../assets/bell.png';
import axios from '../axiosInstance';
import ProfilePicture from '../assets/profile-picture.png';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth';

const Bell = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('neworder', (data) => {
      console.log('🚀 ~ file: Card.jsx:10 ~ socket.on ~ data:', data);
      setNotifications((prev) => [...prev, data]);
      setId(data._id);
    });
    console.log(id);
  }, [socket]);

  const handleClaim = () => {
    axios
      .put(`/api/Orders/${id}`, { claimed: true, employeeId: user._id })
      .then((res) => {
        res.data, console.log(res.data);
      })
      .catch((e) => console.log(e));
    setNotifications([]);
    setOpen(false);
    navigate(`/dashboard`);
  };

  const handleDismiss = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  const displayNotification = (data) => {
    return (
      <>
        <div
          id="notification-modal"
          className="absolute top-[100%]  right-[5px] z-50  w-[30rem] p-4 overflow-x-hidden  h-[20rem]"
        >
          {/* <!-- Modal content --> */}
          <div className="relative rounded-lg shadow dark:bg-gray-700 bg-gradient-to-t from-primary-50 to-primary-100 text-left">
            {/* flowbite card start */}

            <div
              id="toast-notification"
              // className="w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
              // role="alert"
            >
              {/* Card */}

              <div className="flex items-center p-3">
                <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  New Order
                </span>
              </div>
              <div className="flex items-center">
                <div className="relative inline-block shrink-0 p-5">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={ProfilePicture}
                    alt="customer image"
                  />
                </div>
                <div className="ml-3 text-sm font-normal">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    <br />
                    from:
                    <br /> {data.pickupLocation}
                    <br />
                    to:
                    <br />
                    {data.dropLocation}
                  </div>
                  <span className="text-xs font-medium text-primary-500 dark:text-blue-500">
                    a few seconds ago
                  </span>
                </div>
              </div>
            </div>
            {/* flowbite card end */}

            {/* close X button */}
            <div className="flex justify-center">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-primary-200/00 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white shadow-lg"
                data-modal-hide="notification-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="false"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <div className="flex p-5 gap-5">
                <button
                  type="submit"
                  onClick={handleClaim}
                  className=" text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-lg shadow-lg"
                >
                  claim
                </button>
                <button
                  type="submit"
                  onClick={handleDismiss}
                  className=" text-white bg-primary-400 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  dismiss
                </button>
              </div>
            </div>
            {/* form start */}

            {/* form end */}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="navbar">
        <div className="icons">
          <div className="icon" onClick={() => setOpen(!open)}>
            {/* <img src={Notification} alt="Notification" /> */}
            {notifications.length > 0 && (
              <div className="counter">{notifications.length}</div>
            )}
          </div>
          <div className="icon" onClick={() => setOpen(!open)}>
            <img src={bell} className="mr-3 h-3 sm:h-5" alt="notification" />
          </div>
          {/* <div className="icon" onClick={() => setOpen(!open)}>
          <img alt="icon2" />
        </div> */}
        </div>
        {open && (
          <div className="notifications">
            {notifications.map((n) => displayNotification(n))}

            <p className="nButton" onClick={handleRead}></p>
          </div>
        )}
      </div>

      {/* flowbite bell */}
    </>
  );
};

export default Bell;
