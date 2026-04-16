import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateAd from "./pages/CreateAd";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateAd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;