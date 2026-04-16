import { useState } from "react";
import api from "../services/api";

export default function CreateAd() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    try {
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const res = await api.post("/upload", formData);
        imageUrl = res.data.image;
      }

      await api.post("/ads", { title, price, image: imageUrl });

      alert("Anúncio criado");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar anúncio");
    }
  };

  return (
    <div>
      <h1>Criar anúncio</h1>
      <input placeholder="Título" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Preço" onChange={e => setPrice(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}
