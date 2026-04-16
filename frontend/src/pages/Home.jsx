import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function loadAds() {
      try {
        const res = await api.get("/ads");
        setAds(res.data);
      } catch (err) {
        console.error("Erro ao carregar anúncios:", err);
      }
    }

    loadAds();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Vend'Aqui</h1>

      {ads.length === 0 ? (
        <p>Nenhum anúncio ainda</p>
      ) : (
        ads.map((ad, i) => (
          <div key={i}>
            <h3>{ad.title}</h3>
            <p>R$ {ad.price}</p>
          </div>
        ))
      )}
    </div>
  );
}
