import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function AdDetail() {
  const { id } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    async function loadAd() {
      try {
        const res = await api.get("/ads");
        const found = res.data.find(a => a._id === id);
        setAd(found);
      } catch (err) {
        console.error(err);
      }
    }

    loadAd();
  }, [id]);

  if (!ad) return <p style={{ padding: 20 }}>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <div style={{
        maxWidth: 800,
        margin: "auto",
        background: "#fff",
        padding: 20,
        borderRadius: 10
      }}>
        {ad.image && (
          <img
            src={ad.image}
            style={{ width: "100%", borderRadius: 10 }}
          />
        )}

        <h2>{ad.title}</h2>

        <p style={{
          color: "#00a650",
          fontSize: 24,
          fontWeight: "bold"
        }}>
          R$ {ad.price}
        </p>
      </div>
    </div>
  );
}
