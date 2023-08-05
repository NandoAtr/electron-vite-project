import React, { useContext } from "react";
import { axiosPrivate } from "../Common/http/axiosPrivate";
import { UserContext } from "../Contexts/UserContext";
import { ClientJS } from "clientjs";
import ComponentLoader from "../Components/Loader/ComponentLoader";
import { CardProductsWithUserDontHave } from "../Components/Products/CardProductsWithUserDontHave";
import { Notification } from "../Components/Notification/NotificationSimple";
import { CiFaceSmile } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { UniqueCard } from "../Components/Home/UniqueCard";
import { UniqueCardToWebspy } from "../Components/Home/UniqueCardToWebspy";
import { AuthContext } from "../Contexts/AuthContext";
import MaxDeviceLimitExceededPopup from "../Components/Error/MaxDeviceLimitExceededPopup";

export const Home = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);
  const { user }: any = useContext(UserContext);
  const [productsUserHave, setProductsUserHave] = React.useState<Array<any>>(
    []
  );
  const [productsUserDontHave, setProductsUserDontHave] = React.useState<any>(
    []
  );
  const [devicePopUp, setDevicePopUp] = React.useState(false);

  const { setAuth, auth }: any = React.useContext(AuthContext);
  console.log(user)


  React.useEffect(() => {
    (async () => {
      const responseNotes = await axiosPrivate
        .get("notes", {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .then((res) => {
          setNotes(res.data);
        })
        .catch((err) => {
          if (err.response.data.message === "Maximum device limit exceeded") {
            console.log(err.response.data.message);
            setDevicePopUp(true);
          }
          if (err.response.data === "You are banned!") {
            console.log("You are banned!");
          }
        });

      try {
        // const { data: productsUserDontHave } = await axiosPrivate.get(
        //   `users/products/dont-have/${user?.id}`,
        //   {
        //     headers: {
        //       authorization: `Bearer ${auth.accessToken}`,
        //     },
        //   }
        // );

        const { data: productsUserHave } = await axiosPrivate.get(
          "users/products/me",
          {
            headers: {
              authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );

        setProductsUserDontHave(productsUserDontHave);
        setProductsUserHave(productsUserHave);
        setLoading(false);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    })();
  }, [user]);

  const products = [
    {
      photo: "https://webspy.com.br/Images/slider/adminer-rocket2.png",
      name: "Adminer",
      id: "",
      url: `https://adminer.webspy.com.br/login`,
    },
    {
      photo: "	https://www.webspy.com.br/uploads/adheart.png",
      name: "Adheart",
      id: "",
      url: `https://adheart.webspy.com.br/login`,
    },
    {
      photo: "https://webspy.com.br/uploads/1682117840162",
      name: "Semrush",
      id: "",
      url: `https://pt.semrush.com/projects/`,
    },
    {
      photo: "https://www.webspy.com.br/uploads/bigspy.webp",
      name: "Bigspy",
      id: "",
      url: `https://pt.semrush.com/projects/`,
    },
    {
      photo: "https://www.webspy.com.br/uploads/adspy.png",
      name: "Adspy",
      id: "",
      url: `https://adspy.webspy.com.br/login`,
    },
    {
      photo: "https://www.webspy.com.br/uploads/nichescraper.png",
      name: "Nichescrapper",
      id: "",
      url: `https://adspy.webspy.com.br/login`,
    },
    {
      photo: "https://www.webspy.com.br/uploads/adserea.png",
      name: "Adserea",
      id: "",
      url: `https://adspy.webspy.com.br/login`,
    },
  ];

  return (
    <>
      {notes?.length > 0 && (
        <Notification
          title={notes[0].title}
          description={notes[0].content}
          icon={
            <CiFaceSmile className="bg-green-500 text-2xl text-white rounded-full" />
          }
        />
      )}
      {devicePopUp && <MaxDeviceLimitExceededPopup />}
      <div className=" bg-[#09080D] w-full pt-4 p-4 pl-8 h-full xl:h-full pb-12 overflow-y-scroll">
        <h2 className="sm:ml-2 bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom font-bold  text-2xl mb-6">
          Suas Ferramentas
        </h2>
        <div className="flex flex-wrap gap-4">
          {loading ? (
            <ComponentLoader />
          ) : (
            <>
              {user?.System_Permissions?.some(
                (item: any) => item.name === "get_adminer"
              ) && (
                <UniqueCardToWebspy
                  photo={
                    "https://webspy.com.br/Images/slider/adminer-rocket2.png"
                  }
                  name={"Adminer"}
                  id={""}
                  url={`https://adminer.webspy.com.br/`}
                />
              )}
              {user?.System_Permissions?.some(
                (item: any) => item.name === "get_adheart"
              ) && (
                <UniqueCardToWebspy
                  photo={"	https://www.webspy.com.br/uploads/adheart.png"}
                  name={"Adheart"}
                  id={""}
                  url={`https://adheart.webspy.com.br/home`}
                />
              )}
              {user?.System_Permissions?.some(
                (item: any) => item.name !== "get_semrush"
              ) && (
                <UniqueCard
                  photo={"https://webspy.com.br/uploads/1682117840162"}
                  name={"Semrush"}
                  id={""}
                  url={`https://pt.semrush.com/projects/`}
                />
              )}
              {user?.System_Permissions?.some(
                (item: any) => item.name === "get_bigspy"
              ) && (
                <UniqueCard
                  photo={"https://www.webspy.com.br/uploads/bigspy.webp"}
                  name={"Bigspy"}
                  id={""}
                  url={`https://bigspy.com`}
                />
              )}
              {user?.System_Permissions?.some(
                (item: any) => item.name === "get_pipiads"
              ) && (
                <UniqueCard
                  photo={"https://webspy.com.br/uploads/1688523807481"}
                  name={"Pipiads"}
                  id={""}
                  url={`https://pipiads.com`}
                />
              )}
              {user?.System_Permissions?.some(
                (item: any) => item.name === "get_adspy"
              ) && (
                <UniqueCard
                  photo={"https://www.webspy.com.br/uploads/adspy.png"}
                  name={"Adspy"}
                  id={""}
                  url={`https://adspy.webspy.com.br/login`}
                />
              )}
              {user?.System_Permissions?.some(
                (item: any) => item.name === "get_nichescrapper"
              ) && (
                <UniqueCard
                  photo={"https://www.webspy.com.br/uploads/nichescraper.png"}
                  name={"Nichescrapper"}
                  id={""}
                  url={`https://adspy.webspy.com.br/login`}
                />
              )}
              {user?.System_Permissions?.some(
                (item: any) => item.name === "get_adserea"
              ) && (
                <UniqueCard
                  photo={"https://www.webspy.com.br/uploads/adserea.png"}
                  name={"Adserea"}
                  id={""}
                  url={`https://adspy.webspy.com.br/login`}
                />
              )}
            </>
          )}
        </div>
        {/* <div className=" bg-[#09080D] w-full pt-4 p-4  h-full xl:h-full pb-12">
          <h2 className=" bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom font-bold  text-2xl mb-6">
            Ferramentas Disponiveis
          </h2>
          <div className="flex flex-wrap gap-4">
            {loading ? (
              <ComponentLoader />
            ) : (
              <>
                {!user?.System_Permissions?.some(
                  (item: any) => item.name === "get_adminer"
                ) && (
                  <CardProductsWithUserDontHave
                    photo={
                      "https://webspy.com.br/Images/slider/adminer-rocket2.png"
                    }
                    name={"Adminer"}
                    id={""}
                    price={"R$ 29,90"}
                    description="Melhor ferramenta de mineração de anuncios."
                  />
                )}
                {productsUserDontHave?.map((product: any) => (
                  <CardProductsWithUserDontHave
                    key={product.id}
                    photo={product.photo}
                    name={product.name}
                    price={product.price}
                    id={product.id}
                    description={product.description}
                  />
                ))}
              </>
            )}
          </div>
        </div> */}
      </div>
    </>
  );
};
