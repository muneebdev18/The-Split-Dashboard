import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PROPERTY_CATEGORY_CONSTANTS } from "../../../utils/constants";
const { CREATE_CATEGORY } = PROPERTY_CATEGORY_CONSTANTS;
export const createCategoryApi = createAsyncThunk(
  "CREATE_CATEGORY_API",
  async (body) => {
    try {
        const {mutate} = body
      const adminData = JSON.parse(localStorage.getItem("admin"));
      const token = adminData?.token;
      const formData = new FormData();
      formData.append("name",body.name)
      formData.append("category",body.category)
      formData.append("icon",body.icon)
      const response = await fetch(CREATE_CATEGORY, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      mutate()
      return result;
    } catch (error) {
      console.log("Error in Create Category Api: ", error?.message);
    }
  }
);
const createCategorySlice = createSlice({
  name: "CREATE_PROPERTY_CATEGORY",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    success: null,
    message: null,
  },
  reducers:{
    clearCreateCategoryReducer(){
        return {
          isLoading: false,
          data: null,
          isError: false,
          success: null,
          message: null,
        }
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(createCategoryApi.pending,(state)=>{
        state.isLoading = true
        state.data = null
        state.message = null
        state.success = null
    })
    .addCase(createCategoryApi.fulfilled,(state,action)=>{
        state.isLoading = false
        state.success = action.payload?.success
        state.message = action.payload?.message
        state.isError = false
    })
    .addCase(createCategoryApi.rejected,(state,action)=>{
        state.isLoading = false
        state.isError = true
        state.success = action.payload?.success || false
        state.message = action.payload?.message || action.error?.message
    })
  }
});
export const {clearCreateCategoryReducer} = createCategorySlice.actions
export default createCategorySlice.reducer;
