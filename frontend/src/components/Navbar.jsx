import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 10, background: "#333", color: "#fff" }}>
      <Link to="/" style={{ marginRight: 10, color: "#fff" }}>Home</Link>
      <Link to="/create" style={{ marginRight: 10, color: "#fff" }}>Criar Anúncio</Link>
      <Link to="/profile" style={{ color: "#fff" }}>Perfil</Link>
    </nav>
  );
}