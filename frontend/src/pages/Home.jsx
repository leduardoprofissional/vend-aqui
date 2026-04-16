import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/ads").then(res => setAds(res.data));
  }, []);

  const filtered = ads.filter(ad =>
    ad.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>

      {/* BUSCA */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Buscar produtos..."
          style={{ width: "100%" }}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 20
      }}>
        {filtered.map((ad, i) => (
          <div key={i} style={{
            background: "#fff",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "0.2s"
          }}>

            {ad.image && (
              <img
                src={ad.image}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
            )}

            <div style={{ padding: 10 }}>
              <h4>{ad.title}</h4>
              <p style={{
                color: "#00a650",
                fontWeight: "bold"
              }}>
                R$ {ad.price}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
