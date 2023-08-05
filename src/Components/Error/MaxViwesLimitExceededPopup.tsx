import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";
import { UserContext } from "../../Contexts/UserContext";

export default function MaxViwesLimitExceededPopup() {
  const { user }: any = React.useContext(UserContext);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-full h-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* <div
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                    </div> */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-2 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-[90%] sm:max-w-[40%] max-h-[80%] sm:max-h-[35%] sm:h-full sm:w-full sm:p-6 ">
          <div className="flex flex-col items-center justify-center">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <AiFillExclamationCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Limite máximo do visualizações excedido
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {`Você atingiu o número máximo de  suas ${user?.viewsLimit?.toLocaleString(
                      "en"
                    )} visualizações contratados.
                                            `}
                  </p>
                  <p className="text-sm text-gray-500 my-2">
                    Isso pode ter acontecido devido ao compartilhamento de sua
                    conta ou uso demasiado de seu time, contate o suporte para
                    contratar mais visualizações.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt- sm:mt-4 mb-0 sm:flex sm:justify-between">
              <a
                target="_blank"
                href="https://wa.me/5582993928248?text=Oii%2C+sophia+gostaria+de+contratar+o+mais+visualizações+do+adheart"
              >
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Contratar mais visualizações
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
