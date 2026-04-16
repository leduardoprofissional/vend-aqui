import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateAd from "./pages/CreateAd";

function App() {
  return (
    <BrowserRouter>
      <nav style={{
        background: "#ff6600",
        padding: 15,
        display: "flex",
        justifyContent: "space-between"
      }}>
        <Link to="/" style={{ color: "#fff" }}>Home</Link>
        <Link to="/create" style={{ color: "#fff" }}>Anunciar</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateAd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
