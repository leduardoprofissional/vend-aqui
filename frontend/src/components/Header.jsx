import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div style={{
      background: "#fff",
      padding: "15px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ color: "#ff6f00" }}>Vend'Aqui</h2>

      <div>
        <Link to="/" style={{ marginRight: 15 }}>Home</Link>
        <Link to="/create">
          <button>Anunciar</button>
        </Link>
      </div>
    </div>
  );
}
