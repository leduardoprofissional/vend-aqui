import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import useFavorites from "../hooks/useFavorites"; // 👈 IMPORTANTE

export default function Home() {
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { toggleFavorite, isFavorite } = useFavorites(); // 👈 FAVORITOS

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
          <div
            key={i}
            onClick={() => navigate(`/ad/${ad._id}`)}
            style={{
              position: "relative", // 👈 necessário pro coração
              cursor: "pointer",
              background: "#fff",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "0.2s"
            }}
          >

            {/* ❤️ FAVORITO */}
            <div
              onClick={(e) => {
                e.stopPropagation(); // 👈 impede abrir o anúncio
                toggleFavorite(ad);
              }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 20,
                zIndex: 10
              }}
            >
              {isFavorite(ad._id) ? "❤️" : "🤍"}
            </div>

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
