import React from "react";
import { axiosPrivate } from "../../Common/http/axiosPrivate";

export const Notification = () => {
  const [notifications, setNotifications] = React.useState([]);
  const [counter, setCounter] = React.useState("0");

  React.useEffect(() => {
    (async () => {
      const response = await axiosPrivate.get("/notes");

      setNotifications(response.data);

      setCounter(response.data.length);
    })();
  }, []);

  function viewNotification(id: any) {
    setNotifications((oldNotif: any) =>
      oldNotif.map((item: any) => {
        return item.id === id ? { ...item, viewed: !item.viewed } : item;
      })
    );
  }

  function changeMarking() {
    setNotifications((oldNotif: any) =>
      oldNotif.map((item: any) => {
        return { ...item, viewed: true };
      })
    );
  }

  return (
    <div className="left-[100%] bg-white z-30 text-black absolute w-[500px] xl:max-w-2xl">
      <div className="m-4 max-w-sm xl:max-w-4xl ">
        <div className=" rounded-xl  align-text-top flex justify-between">
          <p className="text-xl font-extrabold ml-2 bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom text-3xl">
            Notificações
            <span className="ml-2 w-min items-start rounded-lg bg-blue-700 px-3 py-1 text-sm text-white">
              {counter}
            </span>
          </p>
          <button
            onClick={() => changeMarking()}
            className=" text-end text-sm text-darkgrayishblue hover:cursor-pointer hover:text-customblue"
          >
            Marcar todas como lidas
          </button>
        </div>
        {notifications?.map((item: any) => (
          <div
            key={item?.id}
            className={`my-3  h-auto w-full text-left rounded-lg  py-4  ${
              item?.viewed
                ? "bg-blue-300 opacity-50"
                : "bg-blue-300 opacity-100"
            } px-4 py-2 `}
            onClick={() => viewNotification(item?.id)}
          >
            <div className="ml-2 inline w-full  text-sm leading-5 ">
              <p
                className={`relative inline font-bold   hover:cursor-pointer hover:text-customblue`}
              >
                {item?.title}{" "}
              </p>
            </div>

            <div className="text-left"></div>
            {item?.content}
          </div>
        ))}
      </div>
    </div>
  );
};
