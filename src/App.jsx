import React from "react";
import RootL from "./RootL";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import './App.css'
import RegistrationPage from "./components/Registration";
import LoginPage from "./components/Login";
import LogoutPage from "./components/LogoutPage";
import DetailPage from "./components/RecipeDetails";
import UploadForm from "./components/RcipeUpload";
import MyRecipeList from "./components/MyRecipes";
import { UserProvider } from "./contexts/userContext";
import MyDetailPage from "./components/MyDetails";
import UpdateForm from "./components/MyUpdate";
import Landing from "./components/Landing";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/app',
        element: <RootL />,
        children: [
            {path: '', element: <Home />},
            {path: 'registration', element: <RegistrationPage />},
            {path: 'login', element: <LoginPage />},
            {path: 'logout', element: <LogoutPage />},
            {path: 'details/:recipeId', element: <DetailPage />},
            {path: 'upload', element: <UploadForm />},
            {path: 'myrec', element: <MyRecipeList />},
            {path: 'mydetails/:recipeId', element: <MyDetailPage/>},
            {path: 'update/:recipeId', element: <UpdateForm />}
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