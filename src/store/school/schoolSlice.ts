/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import schoolService from "./schoolService";
import type { initialSchoolState, SchoolData } from "@/config/interface";
import { toast } from "sonner";

const initialState: initialSchoolState = {
  schools: [],
  school: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
};

export const getSchoolData = createAsyncThunk(
  "school/getdata",
  async (_, thunkAPI) => {
    try {
      return await schoolService.getSchoolData();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSchoolById = createAsyncThunk(
  "school/getSchoolById",
  async (id: number, thunkAPI) => {
    try {
      return await schoolService.getSchoolById(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addSchool = createAsyncThunk(
  "school/addSchool",
  async (schoolData: any, thunkAPI) => {
    try {
      return await schoolService.addSchool(schoolData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSchool = createAsyncThunk(
  "school/updateSchool",
  async (schoolData: SchoolData, thunkAPI) => {
    try {
      return await schoolService.updateSchool(schoolData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSchool = createAsyncThunk(
  "school/deleteSchool",
  async (id: number, thunkAPI) => {
    try {
      return await schoolService.deleteSchool(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const schoolSlice = createSlice({
  name: "school",
  initialState: initialState,
  reducers: {
    RESET_SCHOOL(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchoolData.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.schools = action.payload;
        state.message = null;
        state.isLoading = false;
      })
      .addCase(getSchoolData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSchoolById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSchoolById.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = null;
        state.school = action.payload;
      })
      .addCase(getSchoolById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addSchool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSchool.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = null;
        state.schools = [...state.schools, action.payload];
        toast.success("School added successfully.");
      })
      .addCase(addSchool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSchool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSchool.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = null;
        state.schools = state.schools.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
      })
      .addCase(updateSchool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error("Unable to update schhol.");
      })
      .addCase(deleteSchool.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSchool.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = null;
        state.schools = state.schools.filter(
          (item) => item.id !== Number(action.payload)
        );
        toast.success("School deleted successfully.");
      })
      .addCase(deleteSchool.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error("Unable to delete school.");
      });
  },
});

export const { RESET_SCHOOL } = schoolSlice.actions;
const schoolResucer = schoolSlice.reducer;
export default schoolResucer;
