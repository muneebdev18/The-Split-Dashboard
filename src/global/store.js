import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth";
import otpVerifySlice from './features/auth/otpVerify'
import updateProfile from "./features/profile/updateProfile";
import changePassword from "./features/profile/changePassword";
import notificationSlice from "./features/notifications/notificationSlice";
import createCategorySlice from "./features/propertyCategory/createCategory";
import updateCategorySlice from "./features/propertyCategory/updateCategory";
const store = configureStore({
    reducer:{
        auth:authSlice,
        otpVerify:otpVerifySlice,
        updateProfile:updateProfile,
        changePassword:changePassword,
        notification:notificationSlice,
        createCategory:createCategorySlice,
        updateCategory:updateCategorySlice
    }
})

export default store