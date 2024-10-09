import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_API_CONSTANTS } from "../../../utils/constants";
const { OTP_VERIFY_API } = AUTH_API_CONSTANTS;

export const otpVerifyApi = createAsyncThunk("OTP_VERIFY",async(body)=>{
  try {
    const response = await fetch(OTP_VERIFY_API,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(body)
    })
    const result = await response.json()
    console.log(result);
    
    return result;
    
  } catch (error) {
    console.log("Error in Verify OTP Api:",error?.message);
    
  }
})
  const otpVerifySlice = createSlice({
    name: "otpVerify",
    initialState: {
      isLoading: false,
      data: null,
      isError: false,
      success: null,
      message: null,
    },
    reducers: {
      clearOtpVerifyReducer() {
        return {
          isLoading: false,
          data: null,
          isError: false,
          success: null,
          message: null,
        };
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(otpVerifyApi.pending,(state)=>{
        state.isLoading = true
        // state.data = null
        state.isError = false
      })
      .addCase(otpVerifyApi.fulfilled,(state,action)=>{
        state.isLoading = false;
        // state.data = action.payload?.data;
        state.message = action.payload?.message
        state.success = action.payload?.success
        state.isError = false;
      })
      .addCase(otpVerifyApi.rejected,(state,action)=>{
        state.isError = true;
        state.success = action.payload?.success || false
        state.message = action.payload?.message || action.error?.message
      })
    },
  });
  export const {clearOtpVerifyReducer} = otpVerifySlice.actions
  export default otpVerifySlice.reducer;
  