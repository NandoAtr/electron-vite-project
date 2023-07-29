import React from "react";
import { Link } from "react-router-dom";
import { CiFaceFrown } from "react-icons/ci";

type productType = {
  photo: string;
  name: string;
  id: string;
};

export const Cards = (product: productType) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const tools = ["AdHeart", "Adminer", "Adspy", "Semrush"];

  return (
    <>
      {tools.includes(product.name) ? (
        <a
          href={`https://${product.name}.webspy.com.br`}
          target="_blank"
          className="flex flex-col rounded-lg items-center bg-[#16151B]  p-4 gap-2 pb-6"
        >
          <div className="max-w-[180px] min-w-[180px] ">
            <img
              className="rounded-lg mx-auto min-h-[180px]"
              src={product.photo}
              alt=""
            />
          </div>
          <h2 className="ml-2 bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom font-bold  text-2xl">
            {product.name}
          </h2>
          <p className="text-[#757575] max-w-[120px] text-center">
            Clique e acesse a ferramenta{" "}
          </p>
        </a>
      ) : (
        <>
          <div
            onClick={() => setIsOpen(true)}
            className="flex flex-col rounded-lg items-center bg-[#16151B]  p-4 gap-2 pb-6 cursor-pointer"
          >
            <div className="max-w-[180px]">
              <img className="rounded-lg" src={product.photo} alt="" />
            </div>
            <h2 className="ml-2 bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom font-bold  text-2xl">
              {product.name}
            </h2>
            <p className="text-[#757575] max-w-[120px] text-center">
              Clique e veja seu login{" "}
            </p>
          </div>

          {isOpen ? (
            <>
              <div className="fixed inset-0 bg-slate-100 z-10 opacity-70"></div>
              <div className="fixed sm:inset-0 z-20 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <CiFaceFrown className="text-3xl" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <h2 className="text-lg font-medium leading-6 text-gray-900">
                          Indisponível no momento
                        </h2>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Ferramenta indisponivel no momento, entre em contato
                            com o suporte para obter o login e senha da
                            ferramenta.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Voltar para dashboard dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  );
};
