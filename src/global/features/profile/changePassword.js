import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PROFILE_API_CONSTANTS } from "../../../utils/constants";
const { CHANGE_PASSWORD } = PROFILE_API_CONSTANTS;
export const changePasswordApi = createAsyncThunk(
  "CHANGE_PASSWORD_API",
  async (body) => {
    try {
      // Get Token From LocalStorage
      const adminDataLocal = JSON.parse(localStorage.getItem("admin"));
      const token = adminDataLocal?.token;

      const response = await fetch(CHANGE_PASSWORD, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log("Error In Change Password API", error?.message);
    }
  }
);
const changePassword = createSlice({
  name: "CHANGE_PASSWORD",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    success: null,
    message: null,
  },
  reducers: {
    clearChangePasswordReducer() {
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
      .addCase(changePasswordApi.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.isError = false;
      })
      .addCase(changePasswordApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
        state.message = action.payload?.message;
        state.success = action.payload?.success;
      })
      .addCase(changePasswordApi.rejected, (state, action) => {
        state.isError = true;
        state.success = action.payload?.success || false;
        state.message = action.payload?.message || action.error?.message;
      });
  },
});
export const { clearChangePasswordReducer } = changePassword.actions;
export default changePassword.reducer;
