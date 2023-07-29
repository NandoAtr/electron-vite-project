import React, { ReactElement, useEffect } from 'react'
import { Email } from '../Contact/Email'

type confirm = {
  onOk?: Function,
  visible: boolean,
  onCancel?: Function
}

const ConfirmModal = ({ visible, onCancel }: confirm) => {


  return visible ? (
      <dialog
        open
        className={visible ? " w-[70%] flex flex-col top-16 z-[100] p-4 bg-[#16151A] rounded-xl items-center justify-around" : "hidden"}
      >
          <div className=" items-center w-full flex gap-4 justify-center rounded-lg shadow dark:bg-gray-700 ">
            <div className='flex bg-white text-black mx-auto'>
              <h2>Fale conosco pelo Whatsapp</h2>
            </div>
            <div className='flex flex-col text-center w-full max-w-[50%] mx-auto p-4 text-white'>
              <h2>Fale conosco pelo E-mail</h2>
              <Email/>
            </div>

          </div>
          <div className="p-2 text-center mt-2">
              <button
                className="text-white bg-red-500  focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 "
                onClick={() =>

                  onCancel && onCancel()
                }
              >
                {/* {cancelLabel ?? "Cancel"} */}
                cancel
              </button>
          </div>
      </dialog>
  ) : null
}

export default ConfirmModal