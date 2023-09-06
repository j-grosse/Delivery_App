import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import socket from '../../socket/socket';
// import bell from "../img/bell.svg";
import bell from '../assets/bell.png';
import axios from '../axiosInstance';
import ProfilePicture from '../assets/profile-picture.png';
import NotificationModal from './NotificationModal';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth';

// import notification from "../img/notification.svg";

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
          <div className="relative rounded-lg shadow dark:bg-gray-700 bg-gradient-to-t from-primary-50 to-primary-100">
            {/* flowbite card start */}

            <div
              id="toast-notification"
              // className="w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-300"
              // role="alert"
            >
              {/* Card */}

              <div className="flex items-center p-3">
                <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  New notification
                </span>
              </div>
              <div className="flex items-center">
                <div className="relative inline-block shrink-0 p-5">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={ProfilePicture}
                    alt="Jese Leos image"
                  />
                  <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full">
                    <svg
                      className="w-3 h-3 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 18"
                      fill="currentColor"
                    >
                      <path
                        d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Message icon</span>
                  </span>
                </div>
                <div className="ml-3 text-sm font-normal">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    New incoming order
                    <br />
                    from: {data.pickupLocation}
                    <br />
                    to: {data.dropLocation}
                  </div>
                  <span className="text-xs font-medium text-primary-500 dark:text-blue-500">
                    a few seconds ago
                  </span>
                </div>
              </div>
            </div>
            {/* flowbite card end */}

            {/* close X button */}

            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                className=" text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                claim
              </button>
              <button
                type="submit"
                onClick={handleDismiss}
                className=" text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                dismiss
              </button>
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
