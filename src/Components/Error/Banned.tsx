import React from 'react';
import { AiFillExclamationCircle } from 'react-icons/ai';

export default function Banned() {

    React.useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";
      }, []);

    return (
            <div
                className="fixed z-10 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <AiFillExclamationCircle
                                        className="h-6 w-6 text-red-600"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900"
                                    >
                                        Você está banido!
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Você infrigiu algum de nossos termos de uso, você não poderá mais usar a ferramenta. Caso acredite que seja um erro, contate nosso suporte..
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:justify-between">
                                <a target='_blank' href="https://wa.me/5582993928248?text=Oii%2C+sophia+estou+banido+do+adheart+e+gostaria+de+ajuda">
                                  <button
                                      type="button"
                                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                  >
                                      Falar com o suporte
                                  </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
    );
}
                

