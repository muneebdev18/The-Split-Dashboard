import { FaChartSimple } from "react-icons/fa6";
import { IoBagHandleSharp,IoNotifications } from "react-icons/io5";
import { FaUsers} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

export const SIDEBAR_ITEMS = [
    { name: "Overview", Icon: FaChartSimple, color: "#6366f1", href: "/dashboard", size:15 },
    { name: "Property", Icon: IoBagHandleSharp, color: "#8B5CF6", href: "/property", size:15 },
    { name: "Users Management", Icon: FaUsers , color: "#EC4899", href: "/users", size:15 },
    { name: "Admin Management", Icon: MdAdminPanelSettings, color: "#10B981", href: "/adminmanagement", size:15 },
    { name: "Property Category", Icon: BiSolidCategoryAlt, color: "#C7253E", href: "/propertycategory", size:15 },
    { name: "Notifications", Icon: IoNotifications, color: "#F59E0B", href: "/notifications", size:15 },
    { name: "Settings", Icon: IoMdSettings, color: "#6EE7B7", href: "/settings", size:15 },
];

export const AUTH_API_CONSTANTS = Object.freeze({
    LOGIN_API:"https://thesplit.testdevlink.net/api/admin/login",
    FORGOT_PASSWORD_API:"https://thesplit.testdevlink.net/api/admin/forgetpassword",
    OTP_VERIFY_API:"https://thesplit.testdevlink.net/api/admin/verifycode",
    CHANGE_PASSWORD_API:"https://thesplit.testdevlink.net/api/admin/changepassword",
    GET_ADMIN_ID:"https://thesplit.testdevlink.net/api/admin/viewprofile/",
})
export const PROFILE_API_CONSTANTS = Object.freeze({
    GET_ADMIN_ID:"https://thesplit.testdevlink.net/api/admin/viewprofile/",
    UPDATE_PROFILE:"https://thesplit.testdevlink.net/api/admin/updateprofile",
    CHANGE_PASSWORD:"https://thesplit.testdevlink.net/api/admin/newpassword",
})
export const USER_API_CONSTANTS = Object.freeze({
    GET_ALL_USER:"https://thesplit.testdevlink.net/api/user/getallusers",
    GET_USER_ID:"https://thesplit.testdevlink.net/api/user/getuserbyid/",
})
export const ADMIN_API_CONSTANTS = Object.freeze({
    GET_ALL_ADMIN:"https://thesplit.testdevlink.net/api/admin/viewalladmin",
    GET_ADMIN_ID:"https://thesplit.testdevlink.net/api/admin/viewprofile/",
})
export const PROPERTY_API_CONSTANTS = Object.freeze({
    GET_ALL_PROPERTY:"https://thesplit.testdevlink.net/api/property/getAllPropertiesForAdmin",
    GET_PROPERTY_ID:"https://thesplit.testdevlink.net/api/property/getPropertyByidforAdmin/",
})
export const DASHBOARD_API_CONSTANTS = Object.freeze({
    GET_DASHBOARD_DATA:"https://thesplit.testdevlink.net/api/admin/getdashboarddata"
})
export const NOTIFICATION_CONSTANTS = Object.freeze({
    GET_NOTIFICATION_ALL:"https://thesplit.testdevlink.net/api/notification/getAllAdminNotifications",
    CREATE_NOTIFICATION:"https://thesplit.testdevlink.net/api/notification/sendadminnotification",
    GET_NOTIFICATION_ID:"https://thesplit.testdevlink.net/api/notification/getNotificationforadminbyid/",
})
export const PROPERTY_CATEGORY_CONSTANTS = Object.freeze({
    GET_ALL_CATEGORY:"https://thesplit.testdevlink.net/api/propertycategory/allpropertycategoryforadmin",
    CREATE_CATEGORY:"https://thesplit.testdevlink.net/api/propertycategory/createpropertycategory",
    GET_CATEGORY_LIST:"https://thesplit.testdevlink.net/api/propertycategory/getpropertycategorydropdown",
    UPDATE_CATEGORY:"https://thesplit.testdevlink.net/api/propertycategory/updatepropertycategory/",
})