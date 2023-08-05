import React from "react";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../Common/http/axiosPrivate";
import { Breadcrumb } from "../Components/Breadcrumb/Breadcrumb";

type SettingsType = {
  created_at: string;
  email: string;
  id: string;
  name: string;
  role: string;
  status: string;
  number: string;
  payments: [];
};

export const Settings = () => {
  const [settingsUser, setSettingsUser] = React.useState<any>({} as any);

  React.useEffect(() => {
    (async () => {
      const { data } = await axiosPrivate("users/me");

      setSettingsUser(data);
    })();
  }, []);

  return (
    <div className="bg-[#F5F8FA] w-full h-screen">
      <Breadcrumb />
      <div>
        <ul>
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <h2></h2>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </li>
          <ul>
            <li></li>
            <li></li>
            <li>
              <i></i>
            </li>
          </ul>
        </ul>
        <div>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className="flex flex-col bg-white w-[90%] mx-auto rounded-lg p-6 ">
        <div className="flex justify-between items-center w-full border-b-[1px] border-[#eff2f5] min-h-[70px] cursor-pointer mb-2 pb-4">
          <h2 className="font-bold text-[#181c32]">Profile Details</h2>
          <Link
            to={"/breve"}
            className="bg-[#1F95E8] rounded-lg p-2 px-4 text-white"
          >
            Edit Profile
          </Link>
        </div>
        <ul className="flex flex-col gap-4">
          <li className="flex text-[#3f4254] mt-4">
            <label className='after:content-["*"] after:text-[#f1416c] text-[1.075rem] font-light after:pl-0.5 max-w-[50%] w-full'>
              Full Name
            </label>
            <div className="flex gap-2 max-w-[50%] w-full">
              {/* <input 
                            type='text' 
                            className=' text-[#5e6278] bg-[#f5f8fa] rounded-md p-1  w-full'
                        >
                        </input> */}
              <input
                defaultValue={settingsUser?.user?.name}
                type="text"
                className=" text-[#5e6278] bg-[#f5f8fa] rounded-md p-2 w-full"
              ></input>
            </div>
          </li>
          <li className="flex text-[#3f4254] ">
            <label className='after:content-["*"] after:text-[#f1416c] text-[1.075rem] font-light after:pl-0.5 max-w-[50%] w-full'>
              Contact Phone
            </label>
            <input
              type="text"
              defaultValue={
                settingsUser?.user?.number !== null
                  ? settingsUser?.user?.number
                  : "Não informado"
              }
              className=" text-[#5e6278] bg-[#f5f8fa] rounded-md p-2 max-w-[50%] w-full"
            ></input>
          </li>
          <li className="flex text-[#3f4254]">
            <label className='after:content-["*"] after:text-[#f1416c] text-[1.075rem] font-light after:pl-0.5 max-w-[50%] w-full'>
              E-mail
            </label>
            <input
              defaultValue={
                settingsUser?.user?.email !== null
                  ? settingsUser?.user?.email
                  : "Não informado"
              }
              type="text"
              className=" text-[#5e6278] bg-[#f5f8fa] rounded-md p-2 max-w-[50%] w-full"
            ></input>
          </li>
          <li className="flex text-[#3f4254]">
            <label className='after:content-["*"] after:text-[#f1416c] text-[1.075rem] font-light after:pl-0.5 max-w-[50%] w-full'>
              status
            </label>
            <input
              defaultValue={
                settingsUser?.user?.status !== null
                  ? settingsUser?.user?.status
                  : "Não informado"
              }
              type="text"
              className=" text-[#5e6278] bg-[#f5f8fa] rounded-md p-2 max-w-[50%] w-full"
            ></input>
          </li>
          <li className="flex text-[#3f4254] w-full">
            <label className='after:content-["*"] after:text-[#f1416c] text-[1.075rem] font-light after:pl-0.5 max-w-[50%] w-full'>
              payment
            </label>
            <input
              defaultValue={
                settingsUser?.user?.payments === null
                  ? settingsUser?.user?.payments
                  : "Não informado"
              }
              type="text"
              className=" text-[#5e6278] bg-[#f5f8fa] rounded-md p-2 max-w-[50%] w-full"
            ></input>
          </li>
        </ul>
      </div>
      <div className="flex flex-col bg-white w-[90%] mx-auto rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center w-full border-b-[1px] border-[#eff2f5] min-h-[70px]  cursor-pointer ">
          <h2 className="font-bold">Método de login</h2>
        </div>
        <ul className="flex flex-col gap-4 mt-4">
          <li className="flex flex-col gap-2">
            <h2 className="font-bold text-[#181C33]">E-mail</h2>
            <p className="text-[#3f4254] ">{settingsUser?.user?.email}</p>
          </li>
          <li className="flex flex-col gap-2">
            <h2 className="font-bold text-[#181C33]">Password</h2>
            <p className="text-[#3f4254] ">************</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
