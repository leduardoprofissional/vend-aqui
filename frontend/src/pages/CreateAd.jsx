import { useState } from "react";
import api from "../services/api";

export default function CreateAd() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/ads", { title, price });
    alert("Anúncio criado!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Anúncio</h2>
      <input placeholder="Título" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Preço" onChange={e => setPrice(e.target.value)} />
      <button type="submit">Enviar</button>
    </form>
  );
}