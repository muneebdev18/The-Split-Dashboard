import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PROPERTY_CATEGORY_CONSTANTS } from "../../../utils/constants";
const { UPDATE_CATEGORY } = PROPERTY_CATEGORY_CONSTANTS;
export const updateCategoryApi = createAsyncThunk(
  "UPDATE_CATEGORY_API",
  async (body) => {
    try {
        const {mutate,id} = body
      const adminData = JSON.parse(localStorage.getItem("admin"));
      const token = adminData?.token;
      const formData = new FormData();
      formData.append("name",body.name)
      formData.append("category",body.category)
      formData.append("icon",body.icon)
      const response = await fetch(`${UPDATE_CATEGORY}${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      mutate()
      return result;
    } catch (error) {
      console.log("Error in Update Category Api: ", error?.message);
    }
  }
);
const updateCategorySlice = createSlice({
  name: "UPDATE_PROPERTY_CATEGORY",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    success: null,
    message: null,
  },
  reducers:{
    clearUpdateCategoryReducer(){
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
    .addCase(updateCategoryApi.pending,(state)=>{
        state.isLoading = true
        state.data = null
        state.message = null
        state.success = null
    })
    .addCase(updateCategoryApi.fulfilled,(state,action)=>{
        state.isLoading = false
        state.success = action.payload?.success
        state.message = action.payload?.message
        state.isError = false
    })
    .addCase(updateCategoryApi.rejected,(state,action)=>{
        state.isLoading = false
        state.isError = true
        state.success = action.payload?.success || false
        state.message = action.payload?.message || action.error?.message
    })
  }
});
export const {clearUpdateCategoryReducer} = updateCategorySlice.actions
export default updateCategorySlice.reducer;
