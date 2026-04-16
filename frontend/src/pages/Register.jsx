import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await api.post("/register", { email, password });
    alert("Conta criada!");
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cadastro</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Criar conta</button>
    </div>
  );
}
