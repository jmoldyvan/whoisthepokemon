import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { TransitionGroup } from "react-transition-group";

export default function Logout(props) {
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
      <TransitionGroup tag="div" name="animate-options" className={`poke-options ${props.winConditionAnimation ? 'poke-options-answers' : ''}`}>
        <div className={`poke-options-button `} onClick={ () => handleLogout() }> 
            <button>Logout</button>
        </div>
      </TransitionGroup>
    );
}