import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    api.get("/ads").then(res => setAds(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>🛒 Vend'Aqui</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 20
      }}>
        {ads.map((ad, i) => (
          <div key={i} style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: 10
          }}>
            {ad.image && (
              <img
                src={ad.image}
                style={{ width: "100%", borderRadius: 10 }}
              />
            )}

            <h3>{ad.title}</h3>
            <p style={{ color: "green", fontWeight: "bold" }}>
              R$ {ad.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
