import axios from "axios";
import Login from "./pages/auth/Login"
import OtpVerification from "./pages/auth/OtpVerification"
// import { useAppDispatch } from "./hooks/useAppDispatch";
// import { useEffect } from "react";
// import { getLoginStatus } from "./store/auth/authSlice";
import ShowOnLogin, { ShowOnLogout } from "./config/utilityComponent";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "sonner";
import ReportPage from "./pages/report/ReportPage";
import SchoolTable from "./pages/report/SchoolTable";
import AccessPage from "./pages/AccessPage";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useEffect } from "react";
import { getLoginStatus } from "./store/auth/authSlice";
import Layout from "./pages/Layout";


const App = () => {
  axios.defaults.withCredentials = true;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLoginStatus())
  }, [dispatch]);
  return (
    <>
      <Toaster />
      <ShowOnLogin>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
          <Route path="/report/schools" element={<SchoolTable />} />
            <Route path="/access" element={<AccessPage />} />
          </Routes>
          </Layout>
      </ShowOnLogin>
      <ShowOnLogout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify" element={<OtpVerification />} />
        </Routes>
      </ShowOnLogout>
    </>
  )
}

export default App