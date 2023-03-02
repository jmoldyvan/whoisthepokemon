import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Logout() {
    const navigate = useNavigate();
    const {logout, setError} = useAuth();

    async function handleLogout() {
        try {
          setError("");
          await logout();
          navigate("/login");
        } catch {
          setError("Failed to logout");
        }
      }

    return (
        <div>
            <button onClick={ () => handleLogout() }>Logout</button>
        </div>
    );
}