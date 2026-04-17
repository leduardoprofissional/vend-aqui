import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AdDetail from "./pages/AdDetail";
import CreateAd from "./pages/CreateAd";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <nav style={{
        background: "#ff6600",
        padding: 15,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        
        {/* ESQUERDA */}
        <div>
          <Link to="/" style={{ color: "#fff", marginRight: 15 }}>Home</Link>
          <Link to="/create" style={{ color: "#fff", marginRight: 15 }}>Anunciar</Link>
          <Link to="/chat" style={{ color: "#fff" }}>Chat</Link>
        </div>

        {/* DIREITA (NOVO) */}
        <div>
          <Link to="/login" style={{ color: "#fff", marginRight: 15 }}>
            Login
          </Link>

          <Link to="/register" style={{ color: "#fff" }}>
            Cadastro
          </Link>
        </div>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateAd />} />
        <Route path="/ad/:id" element={<AdDetail />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
