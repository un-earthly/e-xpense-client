import { Route, Routes } from "react-router-dom";
import App from "./App";

export default function AppRouter() {
    return (
        <Routes>
            <Route index element={<App />} />
            <Route path="about" element={<div >about</div>} />

            <Route element={<div >Layout</div>}>
                <Route path="login" element={<div >login</div>} />
                <Route path="register" element={<div >register</div>} />
            </Route>

            <Route path="concerts">
                <Route index element={<div >concerts</div>} />
                <Route path=":city" element={<div>city</div>} />
                <Route path="trending" element={<div >trend</div>} />
            </Route>
        </Routes>
    )

}