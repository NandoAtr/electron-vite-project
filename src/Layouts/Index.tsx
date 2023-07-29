import React from "react";
import { Menu } from "../Components/Menu/Menu";

export const Layouts = ({ children }: any) => {
  return (
    <div className="sm:flex h-full  max-h-full">
      <Menu />
      <div className="w-full sm:h-full  sm:pt-0">{children}</div>
    </div>
  );
};
