import React from "react";
import RootL from "./RootL";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import './App.css'
import Search from "./components/UserSearch";
import RegistrationPage from "./components/Registration";
import LoginPage from "./components/Login";
import LogoutPage from "./components/LogoutPage";
import DetailPage from "./components/RecipeDetails";
import UploadForm from "./components/RcipeUpload";
import { UserProvider } from "./contexts/userContext";
// import RecipeForm from "./components/RcipeUpload";


const router = createBrowserRouter([
    {
        path: '/',
        element: <RootL />,
        children: [
            {path: '/', element: <Home />},
           // {path: '/search', element: <UserSearch />},
            {path: '/registration', element: <RegistrationPage />},
            {path: '/login', element: <LoginPage />},
            {path: '/logout', element: <LogoutPage />},
            {path: '/details/:recipeId', element: <DetailPage />},
            {path: '/upload', element: <UploadForm />}   
        ]
    }
])



const App = () => {
    return(
        <UserProvider>
        <RouterProvider router={router} >
            {router}
        </RouterProvider>
        </UserProvider>

)}

export default App;