import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import permission from "../../assets/stop.svg";

export default function YouDontHavePermissionPopup() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="inline-block align-bottom bg-[#ffb822] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-[80%] w-full sm:max-w-[80%] md:max-w-[700px]  sm:w-full h-full max-h-[60%] sm:p-6 justify-center items-center">
        <div className="sm:flex flex-col sm:items-center">
          <div className="mx-auto  flex items-center justify-center max-w-[80%] rounded-full bg-white sm:mx-0 sm:h-[50%] sm:w-[50%] p-4">
            <img className="w-full" src={permission} alt="" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:max-w-[70%]">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mt-7">
              Você não tem permissão para acessar o Adheart
            </h3>
            <div className="mt-2">
              <p className="text-sm text-white">
                Sua assinatura do adheart foi cancelada ou expirou, entre em
                contato com o suporte para mais informações.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:justify-center">

          <a
            target="_blank"
            href="https://wa.me/5582993928248?text=Oii%2C+sophia+gostaria+de+renovar+o+adheart"
          >
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Renovar assinatura
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
