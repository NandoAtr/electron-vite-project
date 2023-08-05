import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";

const product = {
  name: "Everyday Ruck Snack",
  price: "$220",
  rating: 3.9,
  href: "#",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-quick-preview-03-detail.jpg",
  imageAlt:
    "Interior of light green canvas bag with padded laptop sleeve and internal organization pouch.",
  sizes: [
    { name: "18L", description: "Perfect for a reasonable amount of snacks." },
    { name: "20L", description: "Enough room for a serious amount of snacks." },
  ],
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductQuickviews({ setIsOpen }: any) {
  return (
    <>
      <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto pl-[5%]">
        <div className="max-w-[80%] mx-auto ">
          <div>
            <div className="flex w-full transform text-left text-base transition md:my-8  md:px-4 min-w-[80%]">
              <div className="relative flex w-full items-center overflow-hidden bg-white shadow-2xl rounded min-w-[80%] ">
                <iframe
                  src="https://marketplace.webspy.com.br/produto/semrush"
                  className="w-full h-full min-h-[90vh] max-h-[1200px]"
                ></iframe>
                <div
                  className="absolute top-0 bg-red-500 right-0 w-[32px] h-[32px] rounded-full flex items-center justify-center text-white cursor-pointer "
                  onClick={() => setIsOpen(false)}
                >
                  X
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
