import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PROFILE_API_CONSTANTS } from "../../../utils/constants";
const { UPDATE_PROFILE } = PROFILE_API_CONSTANTS;
export const updateProfileApi = createAsyncThunk(
  "UPDATE_PROFILE_API",
  async (body) => {
    // Get Token From LocalStorage
    const adminDataLocal = JSON.parse(localStorage.getItem("admin"));
    const token = adminDataLocal?.token;

    const {values,mutate} = body

    const formData = new FormData();
    formData.append("fullname", values.fullname);
    formData.append("profile", values.profile);

    const response = await fetch(UPDATE_PROFILE, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body:formData,
    });
    const result = await response.json();
    mutate()
    console.log(result);
    return result;
  }
);
const updateProfile = createSlice({
  name: "UPDATE_PROFILE",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    success: null,
    message: null,
  },
  reducers:{
    clearUpdateProfileReducer(){
        return {
          isLoading: false,
          data: null,
          isError: false,
          success: null,
          message: null,
        };
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(updateProfileApi.pending,(state)=>{
        state.isLoading = true;
        state.data = null;
        state.isError = false
    })
    .addCase(updateProfileApi.fulfilled,(state,action)=>{
        state.isLoading = false
        state.data = action.payload?.data;
        state.message = action.payload?.message;
        state.success = action.payload?.success
    })
    .addCase(updateProfileApi.rejected,(state,action)=>{
        state.isError = true;
        state.success = action.payload?.success || false
        state.message = action.payload?.message || action.error?.message
    })
  }
});
export const {clearUpdateProfileReducer} = updateProfile.actions
export default updateProfile.reducer;
