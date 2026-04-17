import { useState } from "react";
import api from "../services/api";
import { setUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { email, password });
      setUser(res.data);
      navigate("/");
    } catch {
      alert("Erro no login");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
