import React from "react";
import Header from "./permanent_components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./permanent_components/Footer";



const RootL = () => {
    return(
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}

export default RootL