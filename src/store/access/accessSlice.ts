/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { initialAccessState, UserData } from "@/config/interface";
import accessService from "./accessService";

const initialState: initialAccessState = {
  isLoggedIn: true,
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
};

// Create User
export const createUser = createAsyncThunk(
  "/users/create",
  async (userData: UserData, thunkAPI) => {
    try {
      return await accessService.createUser(userData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Throwing the error so it can be caught in redux-saga
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get User
export const getUsers = createAsyncThunk(
  "/users/getUser",
  async (query: string, thunkAPI) => {
    try {
      return await accessService.getUsers(query);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Throwing the error so it can be caught in redux-saga
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "/users/updateUser",
  async (userData: UserData, thunkAPI) => {
    try {
      return await accessService.updateUser(userData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Throwing the error so it can be caught in redux-saga
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update User
export const deleteUser = createAsyncThunk(
  "/users/deleteUser",
  async (id: number, thunkAPI) => {
    try {
      return await accessService.deleteUser(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Throwing the error so it can be caught in redux-saga
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const accessSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    RESET_ACCESS(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.users = [action.payload, ...state.users];
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.users = state.users.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.users = state.users.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { RESET_ACCESS } = accessSlice.actions;
const authReducer = accessSlice.reducer;
export default authReducer;
