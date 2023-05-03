import "./styles.css";
import Login from "./Page/Login";
import { Routes, Route } from "react-router-dom";
import EmployeeDetails from "./Page/EmployeeDetail";
import EmployeeList from "./Page/EmployeeList";
import PageNotFound from "./Page/PageNotFound";
import LoginPage from "./Page/Login";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="employeeList" element={<EmployeeList />} />
        <Route path="/employeeDetails" element={<EmployeeDetails />} />
      </Routes>
    </div>
  );
}
