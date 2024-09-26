import Footer from "@/Components/Common/Footer";
import Header from "@/Components/Common/Header";
import MenuContextProvider from "@/Context/MenuContext/MenuContextProvider";
import React, { ReactNode } from "react";
interface PropTypes {
  children: ReactNode;
}
const MainLayout: React.FC<PropTypes> = ({ children }) => {
  return (
    <MenuContextProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </MenuContextProvider>
  );
};

export default MainLayout;
