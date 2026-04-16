import { useState } from "react";
import api from "../services/api";

export default function CreateAd() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    let imageUrl = "";

    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      const res = await api.post("/upload", formData);
      imageUrl = res.data.image;
    }

    await api.post("/ads", { title, price, image: imageUrl });

    alert("Anúncio criado!");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Criar Anúncio</h1>

      <input
        placeholder="Título"
        onChange={e => setTitle(e.target.value)}
      /><br />

      <input
        placeholder="Preço"
        onChange={e => setPrice(e.target.value)}
      /><br />

      <input
        type="file"
        onChange={e => setImage(e.target.files[0])}
      /><br />

      <button onClick={handleSubmit}>
        Publicar
      </button>
    </div>
  );
}
