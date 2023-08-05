import React from "react";
import { Link } from "react-router-dom";
import { CiFaceFrown } from "react-icons/ci";
import { Information } from "../Notification/Information";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AuthContext } from "../../Contexts/AuthContext";
const { ipcRenderer } = window.require("electron");

type productType = {
  photo: string;
  name: string;
  id: string;
  url: string;
};

export const UniqueCardToWebspy = (product: productType) => {
  const [successfully, setSuccessfully] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { auth }: any = React.useContext(AuthContext);

  const onOpen = async () => {
    setLoading(true);
    // const storedAccessToken = localStorage.getItem("accessToken");
    // const refreshToken = localStorage.getItem("refreshToken");
    const mensagem = await ipcRenderer.invoke("open-new-window-to-webspy", {
      url: `${product?.url}`,
      accessToken: auth.acessToken,
      tool: product.name,
      refreshToken: auth.refreshToken,
    });

    if (mensagem !== "Ops... ocorreu um error!") {
      setLoading(false);
      setSuccessfully(true);
      setTimeout(() => {
        setSuccessfully(false);
      }, 4000);
    } else {
      setLoading(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 6000);
    }
  };

  return (
    <>
      {loading ? (
        <button
          disabled
          className="flex flex-col rounded-lg items-center bg-[#16151B]  p-4 gap-2 pb-6 opacity-60"
        >
          <div className="max-w-[180px] min-w-[180px] relative ">
            <img
              className="rounded-lg mx-auto min-h-[180px]"
              src={product.photo}
              alt=""
            />
            <div className="flex justify-center items-center h-6 absolute top-[50%] right-[44%]">
              <div className="border-t-4 border-blue-500 border-solid rounded-full h-6 w-6 animate-spin"></div>
            </div>
          </div>
          <h2 className="ml-2 bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom font-bold  text-2xl">
            {product.name}
          </h2>
          <p className="text-[#757575] max-w-[120px] text-center">
            Clique e acesse a ferramenta{" "}
          </p>
        </button>
      ) : (
        <button
          onClick={onOpen}
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
        </button>
      )}

      {successfully ? (
        <Information
          title={`Janela Aberta!`}
          description={`${product.name} aberto com sucesso!`}
          icon={
            <BsFillCheckCircleFill
              className="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
          }
        />
      ) : null}
      {error ? (
        <Information
          title="Ops... ocorreu um error"
          description={`não foi possivel efetuar a abertura do ${product.name}, entre em contato com o suporte que te ajudaremos a resolver`}
          icon={
            <CiFaceFrown className="h-6 w-6 text-red-400" aria-hidden="true" />
          }
        />
      ) : null}
    </>
  );
};
