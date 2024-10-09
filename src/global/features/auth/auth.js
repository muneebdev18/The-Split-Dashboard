import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTH_API_CONSTANTS } from "../../../utils/constants";
const { LOGIN_API,FORGOT_PASSWORD_API,CHANGE_PASSWORD_API } = AUTH_API_CONSTANTS;

// -------------- Login API --------------
export const loginApi = createAsyncThunk("LOGIN_API", async (body) => {
  try {
    const response = await fetch(LOGIN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (result?.success) {
      localStorage.setItem("admin", JSON.stringify(result?.data));
    }

    return result;

  } catch (error) {
    console.log("Error in Login Api:", error.message);
    throw error; 
  }
});
// -------------- Forgot Password API --------------
export const forgotPasswordApi = createAsyncThunk("FORGOT_PASSWORD_API",async(body)=>{
  try {
    const response = await fetch(FORGOT_PASSWORD_API,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(body)
    })
    const result = await response.json()
    return result;
    
  } catch (error) {
    console.log("Error in Forgot Password Api:",error?.message);
    
  }
})

//  -------------- Change Password API --------------
export const changePasswordApi = createAsyncThunk("CHANGE_PASSWORD",async(body)=>{
  const {userId} = body
  try {
    const response = await fetch(`${CHANGE_PASSWORD_API}/${userId}`,{
      method:"PUT",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(body)
    })
    const result = await response.json()
    return result
    
  } catch (error) {
    console.log("Error in Change Password API:", error?.message);
    
  }
})
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    success: null,
    message: null,
  },
  reducers:{
    logoutHandler(){
        localStorage.removeItem("admin");
        return{
            isLoading: false,
            data: null,
            isError: false,
            success: null,
            message: null,
        }
    },
    clearLoginReducer(){
      return{
          isLoading: false,
          data: null,
          isError: false,
          success: null,
          message: null,
      }
  },
  clearForgotPassReducer(){
    return{
      isLoading: false,
      data: null,
      isError: false,
      success: null,
      message: null,
    }
  },
  clearChangePasswordReducer(){
    return{
      isLoading: false,
      isError: false,
      success: null,
      message: null,
    }
  }
  },
  extraReducers: (builder) => {
  // -------------- Login API Reducers--------------
    builder
      .addCase(loginApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.isError = false;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.message = action.payload?.message;
        state.success = action.payload?.success;
        state.isError = false;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.isError = true;
        state.message =action.payload?.message || action.error?.message ;
        state.success = action.payload.success || false;
      })
    //  -------------- Forgot Password API Reducers--------------
      .addCase(forgotPasswordApi.pending,(state)=>{
        state.isLoading = true
        state.data = null
        state.isError = false
      })
      .addCase(forgotPasswordApi.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.data = action.payload?.data;
        state.message = action.payload?.message
        state.success = action.payload?.success
        state.isError = false;
      })
      .addCase(forgotPasswordApi.rejected,(state,action)=>{
        state.isError = true;
        state.success = action.payload?.success || false
        state.message = action.payload?.message || action.error?.message
      })
    //  -------------- Change Password API Reducers--------------

    .addCase(changePasswordApi.pending,(state)=>{
      state.isLoading = true;
      state.isError = false
    })
    .addCase(changePasswordApi.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.message = action.payload?.message
      state.success = action.payload?.success
    })
    .addCase(changePasswordApi.rejected,(state,action)=>{
      state.isError = true;
      state.success = action.payload?.success || false
      state.message = action.payload?.message || action.error?.message
    })
  },
});
export const {logoutHandler,clearLoginReducer,clearForgotPassReducer,clearChangePasswordReducer} = authSlice.actions
export default authSlice.reducer;
