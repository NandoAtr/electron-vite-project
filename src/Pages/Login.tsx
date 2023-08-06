import axios from "axios";
import React, { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { Information } from "../Components/Notification/Information";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { CiFaceFrown } from "react-icons/ci";
import { useForm } from "react-hook-form";
export default function Login() {
  const [login, setLogin] = React.useState({});

  const navigate = useNavigate();

  const { auth, setAuth }: any = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [successfully, setSuccessfully] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const response: any = await axios
      .post("https://api.webspy.com.br/auth/signin", data)
      .catch((error: any) => {
        setLoading(false);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data.message);
          setMessage(error.response.data.message);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 3000);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    if (response?.status === 201 && response?.status !== undefined) {
      setSuccessfully(true);
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      setAuth({
        auth: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: auth.user,
      });

      setLoading(false);
      navigate("/home");
      setSuccessfully(false);
    }
  };

  return (
    <form
      className="relative flex flex-col justify-center  min-h-screen overflow-hidden bg-[#09090D] text-[#828283] text-center p-4 py-[8%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="lg:max-w-xl w-full mx-auto mb-6">
        <span className="bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom text-xl font-bold">
          LOGIN
        </span>
        <h2 className="text-white font-extrabold text-xl my-3">
          Faça Login em sua conta
        </h2>
      </div>
      <div className="w-full py-6 px-4 m-auto bg-[#16151A] rounded-md shadow-md lg:max-w-xl text-[#888888] text-left pb-8">
        <div className="mt-6">
          <div className="mb-3">
            <input
              placeholder="Digite Seu E-mail"
              type="email"
              className="block w-full px-4 py-3 mt-2 text-[#828283] bg-[#09080D]  "
              {...register("email", { required: true })}
            />
          </div>
          <div className="mt-4">
            <input
              placeholder="Digite Sua Senha"
              type="password"
              className="block w-full px-4 py-3 mt-2 text-purple-700 bg-[#09080D] rounded-md"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-sm text-red-500 opacity-70 ml-1 my-3 mb-1">
                É necessario uma senha para realizar o login
              </p>
            )}
            {errors.email?.type === "required" && (
              <p className="text-sm text-red-500 opacity-70 ml-1 my-3 mb-1">
                É necessario um E-mail para realizar o login
              </p>
            )}
          </div>
          <a href="#" className="text-xs text-[#828283] hover:underline">
            Esqueceu Sua Senha?
          </a>
          <div className="mt-6">
            {loading ? (
              <button
                // onClick={() => sendMessageToMainProcess()}
                disabled
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transdiv bg-gradient-to-r from-[#57048a] to-[#4528dc] rounded-md "
              >
                <div className="flex justify-center items-center h-6">
                  <div className="border-t-4 border-blue-500 border-solid rounded-full h-6 w-6 animate-spin"></div>
                </div>
              </button>
            ) : (
              <button
                // onClick={() => sendMessageToMainProcess()}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transdiv bg-gradient-to-r from-[#57048a] to-[#4528dc] rounded-md "
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      {successfully ? (
        <Information
          title="Login"
          description="Login realizado com sucesso!"
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
          title="não foi possivel efetuar o login"
          description={message}
          icon={
            <CiFaceFrown className="h-6 w-6 text-red-400" aria-hidden="true" />
          }
        />
      ) : null}
    </form>
  );
}
