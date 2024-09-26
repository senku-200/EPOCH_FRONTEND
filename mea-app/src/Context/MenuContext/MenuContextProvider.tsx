"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
interface MenuContextTypes {
  isMenuVisible: boolean;
  toogleMenuVisibility: () => void;
  removeVisibility: () => void;
}
interface ProviderTypes {
  children: ReactNode;
}
const MenuContext = createContext<MenuContextTypes | undefined>(undefined);

const MenuContextProvider: React.FC<ProviderTypes> = ({ children }) => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const toogleMenuVisibility = () => {
    setMenuVisibility((prev: boolean) => !prev);
  };
  const removeVisibility = () => {
    setMenuVisibility(false);
  };
  return (
    <MenuContext.Provider
      value={{ isMenuVisible, toogleMenuVisibility, removeVisibility }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenucontext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("Menu Context is Not applicable");
  }
  return context;
};

export default MenuContextProvider;
