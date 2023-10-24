'use client';
import React, { useState } from 'react';

 const ModalDelete = () => {
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  return (
  <>
      <button onClick={() => props.setOpenModal('pop-up')}>Toggle modal
      </button>
      {/* <div show={props.openModal === 'pop-up'} size="md" popup onClose={() => props.setOpenModal(true)}>
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <button color="failure" onClick={() => props.setOpenModal(false)}>
                Yes, I'm sure
              </button>
              <button color="gray" onClick={() => props.setOpenModal(false)}>
                No, cancel
              </button>
            </div>
          </div> */}
    </>
  )
}

export default ModalDelete;

