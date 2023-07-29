
import React from "react";
import { Link } from "react-router-dom";
import { CiFaceFrown } from "react-icons/ci";
import ProductQuickviews from "./ProductQuickviews";

type productType = {
  photo: string;
  name: string;
  id: string;
  price: string;
  description: string;
};

export const CardProductsWithUserDontHave = (product: productType) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="flex flex-col rounded-lg items-center bg-[#16151B]  p-4 gap-2 pb-6 cursor-pointer opacity-50"
      >
        <div className="max-w-[180px] min-w-[180px]">
          <img
            className="rounded-lg min-h-[180px]"
            src={product.photo}
            alt=""
          />
        </div>
        <h2 className="ml-2 bg-gradient-to-r from-[#57048a] to-[#4528dc] spanCustom font-bold  text-2xl">
          {product.name}
        </h2>
        <p className="text-[#757575] max-w-[120px] text-center">
          Clique e adquira o {product.name}{" "}
        </p>
      </div>

      {isOpen ? (
        <ProductQuickviews
          key={product.id}
          setIsOpen={setIsOpen}
          product={product}
        />
      ) : null}
    </>
  );
};
