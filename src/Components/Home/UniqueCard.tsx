import React from "react";
import { Link } from "react-router-dom";
import { CiFaceFrown } from "react-icons/ci";
import { Information } from "../Notification/Information";
import { BsFillCheckCircleFill } from "react-icons/bs";
const { ipcRenderer } = window.require("electron");

type productType = {
  photo: string;
  name: string;
  id: string;
  url: string;
};

export const UniqueCard = (product: productType) => {
  const [successfully, setSuccessfully] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const onOpen = async () => {
    console.log("open");
    const storedAccessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const mensagem = await ipcRenderer.invoke("open-new-window-to-webspy", {
      url: `${product?.url}`,
      accessToken: storedAccessToken,
      tool: product.name,
      refreshToken: refreshToken,
    });
    // const mensagem = await ipcRenderer.invoke("open-new-window", {
    //   url: `${product?.url}`,
    //   token: storedAccessToken,
    //   tool: product.name,
    // });
    console.log(mensagem);
    if (mensagem !== "Ops... ocorreu um error!") {
      setSuccessfully(true)
      setTimeout(() => {
        setSuccessfully(false)
      }, 4000);
    }else{
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 6000);
    }
  };

  return (
    <>
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
