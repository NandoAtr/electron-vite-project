import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../../Common/http/axiosPrivate";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";

type SettingsType = {
  created_at: string;
  email: string;
  id: string;
  name: string;
  role: string;
  status: string;
  number: string;
  payments: [];
}

export const SettingsOverview = () => {
  const [settingsUser, setSettingsUser] = React.useState({} as SettingsType);

  React.useEffect(() => {
    (async () => {
      const response = await axiosPrivate("users/me");

      setSettingsUser(response.data.user);
    })();
  }, []);

console.log(settingsUser)

  return (
      <div className="w-full bg-[#F5F8FA] h-full">
          <Breadcrumb />
        <div className="flex flex-col justify-center items-center ">
          <div className=" w-[80%]">
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
          <div className="w-[90%] bg-[#FFFFFF] rounded-lg p-6">
            <div className="flex justify-between items-center w-full border-b-[1px] border-[#eff2f5] min-h-[70px]  ">
              <h2>Profile Details</h2>
              <Link 
                to={'/account/edit'}
                className="bg-[#1F95E8] rounded-lg p-2 px-4 text-white"
              >
                Edit Profile
              </Link>
            </div>
            <ul className="flex flex-col gap-4 mt-4">
              <li className="flex gap-16">
                <p className="text-[#a1a5b7]">Full Name</p>
                <h2 className="text-[#181c32] font-semibold text-sm">{settingsUser?.name !== null ? settingsUser?.name : 'Não informado'}</h2>
              </li>
              <li className="flex gap-16">
                <p className="text-[#a1a5b7]">Contact Phone</p>
                <h2 className="text-[#181c32] font-semibold text-sm">{settingsUser.number || 'Não informado'}</h2>
              </li>
              <li className="flex gap-16">
                <p className="text-[#a1a5b7]">email</p>
                <h2 className="text-[#181c32] font-semibold text-sm">{settingsUser.email || 'Não informado'}</h2>
              </li>
              <li className="flex gap-16">
                <p className="text-[#a1a5b7]">status</p>
                <h2 className="text-[#181c32] font-semibold text-sm">{settingsUser.status || 'Não informado'}</h2>
              </li>
              <li className="flex gap-16">
                <p className="text-[#a1a5b7]">payment</p>
                <h2 className="text-[#181c32] font-semibold text-sm">{settingsUser.payments || 'Não informado'}</h2>
              </li>
            </ul>
          </div>
        </div>

      </div>

  );
};
