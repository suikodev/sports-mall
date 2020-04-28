import { Header } from "./Header";
import { Footer } from "./Footer";
import React from "react";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
