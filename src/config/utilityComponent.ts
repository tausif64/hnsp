import React from "react";
import { useSelector } from "react-redux";
import type { UtilityProps } from "./interface";
import type { RootState } from "@/store/store";


const ShowOnLogin: React.FC<UtilityProps> = ({ children }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (isLoggedIn) {
    return children;
  }
  return null;
};


export const ShowOnLogout: React.FC<UtilityProps> = ({ children }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export default ShowOnLogin;
