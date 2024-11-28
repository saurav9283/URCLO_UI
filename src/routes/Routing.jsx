import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from '../components/navbar/Navbar'
import HandleRegister from '../components/auth/register/HandleRegister'
import Login from '../components/auth/login/Login'
import ForgotPassword from '../components/auth/login/ForgotPassword'
import ResetPassword from '../components/auth/login/ResetPassword'
import CartPage from "../pages/cart/CartPage"
import HomePage from '../pages/homePage/HomePage'
import CategoryItems from '../pages/carpenter/CategoryItems'

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<HandleRegister />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login/forgot-password" element={<ForgotPassword />} />
                    <Route path="/login/reset-password" element={<ResetPassword />} />
                    <Route path="/cart-page" element={<CartPage />} />
                    <Route path="/items" element={<CategoryItems />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing
