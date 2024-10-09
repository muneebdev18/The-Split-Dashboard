import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { NOTIFICATION_CONSTANTS } from "../../../utils/constants";
const {CREATE_NOTIFICATION} = NOTIFICATION_CONSTANTS
export const createNotificationApi = createAsyncThunk("CREATE_NOTIFICATION",async(body)=>{
    try {
        const {mutate} = body
        const adminData = JSON.parse(localStorage.getItem('admin'))
        const token = adminData?.token
        console.log(body.title,body.body,body.image);
        const formData = new FormData()
        formData.append("title",body.title)
        formData.append("body",body.body)
        formData.append("image",body.image)
        console.log(formData);
        
        const response = await fetch(CREATE_NOTIFICATION,{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token}`
            },
            body:formData,
        })

        const result = await response.json()
        mutate()
        return result
    } catch (error) {
        console.log("Error in CreateNotification: ",error?.message);
    }
})
const notificationSlice = createSlice({
    name:"NOTIFICATION",
    initialState:{
        isLoading:false,
        data:null,
        isError:false,
        success:null,
        message:null
    },
    reducers:{
        clearCreateNotificationReducer(){
            return {
                isLoading:false,
                data:null,
                isError:false,
                success:null,
                message:null
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createNotificationApi.pending,(state)=>{
            state.isLoading = true
            state.data = null
            state.message = null
            state.success = null
        })
        .addCase(createNotificationApi.fulfilled,(state,action)=>{
            state.isLoading = false
            state.success = action.payload?.success
            state.message = action.payload?.message
            state.isError = false
        })
        .addCase(createNotificationApi.rejected,(state,action)=>{
            state.isLoading = false
            state.success = action.payload?.success || false
            state.message = action.payload?.message || action.error?.message 
            state.isError = true
        })
    }
})
export const {clearCreateNotificationReducer} = notificationSlice.actions
export default notificationSlice.reducer;