import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios from "axios";
import './login.css';

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/login", {
                username: user,
                password: password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                alert("Inicio de sesión exitoso");
                navigate("/dashboard");
            } else {    
                throw new Error("Token no recibido");
            }

        } catch (error) {
            setError ("Usuario o contraseña incorrectos");
        }

    };

  return (
    <div>
        <h1>Inicio de Sesión</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="Usuario"
            name="USER"
            value={user}
            onChange={(e) => setUser(e.target.value)}/>
            <input 
            type="password"
            placeholder="Contraseña"
            name="PASS"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Iniciar Sesión</button>
        </form>
    </div>
  )
}

export default Login;
