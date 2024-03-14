import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "@/layouts";

import { SignIn } from "./pages/auth/sign-in";
import { RequireAuth } from "react-auth-kit";
import RecoverPassword from "./pages/auth/recoverPassword";
import ResetPassword from "./pages/auth/resetPassword";
import { PerfilCliente, PerfilEmpleado } from "@/pages/profile/index.js";
import { useEffect, useState } from "react";

function App() {
  const [rol, setRol] = useState("");

  // useEffect(() => {
  //   console.log(rol);
  //   // console.log(typeof rol);
  // }, [rol]);

  return (
    <Routes>
      <Route path="/" element={<SignIn setRol={setRol} />} /> //Login
      <Route path="/recover_password/" element={<RecoverPassword />} /> //Send
      email
      <Route path="/recover_password/:token" element={<ResetPassword />} />{" "}
      //Reset Password
      <Route
        path="/dashboard/*"
        element={
          <RequireAuth loginPath="/">            
              <Dashboard rol={rol} />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> //
      Si no encuentra pagina se va a dashboard
    </Routes>
  );
}

export default App;
