import React from "react";
import { useForm } from "react-hook-form";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { CiFaceFrown } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../Common/http/axiosPrivate";
import { Notification } from "../Notification/NotificationSimple";

type FormData = {
  newPassword: string;
  confirmPassword: string;
  oldPassword: string;
};

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const [successfully, setSuccessfully] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const onSubmit = async (data:any) => {
    const response:any = await axiosPrivate
      .post("users/change-password", data)
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data.message[0]);
          setMessage(error.response.data.message);
          setError(true);
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

    if (response?.status === 200) {
      setSuccessfully(true);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[80%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-xl font-bold mb-6">Reset Password</h2>
        {errors.newPassword && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {errors?.newPassword?.message}
          </div>
        )}
        {errors.confirmPassword && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {errors?.confirmPassword?.message}
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="newPassword"
          >
            Old Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="oldPassword"
            {...register("oldPassword", {
              required: "Password is required",
            })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="newPassword"
            {...register("newPassword", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("newPassword")
                  ? true
                  : "Passwords do not match",
            })}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus
            :outline-none focus:shadow-outline"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
      {successfully ? (
        <Notification
          description="password Updated Successfully"
          title="Update User"
          icon={
            <BsFillCheckCircleFill
              className="h-6 w-6 text-green-400"
              aria-hidden="true"
            />
          }
        />
      ) : null}
      {error ? (
        <Notification
          description={message}
          title="password Updated Successfully"
          icon={
            <CiFaceFrown className="h-6 w-6 text-red-400 " aria-hidden="true" />
          }
        />
      ) : null}
    </div>
  );
}
