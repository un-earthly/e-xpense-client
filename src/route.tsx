import { Route, Routes, Navigate } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import Categories from "./pages/Categories";
import Budget from "./pages/Budget";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings.tsx";
import NotFound from "./pages/404.tsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route index element={<App />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegistrationPage />} />

            <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="" element={<Navigate to="home" replace />} />
                <Route path="home" element={<Dashboard />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="reports" element={<Reports />} />
                <Route path="categories" element={<Categories />} />
                <Route path="budget" element={<Budget />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}