import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import schoolResucer from "./school/schoolSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  school: schoolResucer,
});

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
