import { useNavigate } from "react-router-dom";

const navigate = useNavigate();


{filtered.map((ad, i) => (
  <div
    key={ad._id || i}
    onClick={() => navigate(`/ad/${ad._id}`)}
    style={{
      cursor: "pointer",
      background: "#fff",
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "0.2s"
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
  >
    {ad.image && (
      <img
        src={ad.image}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover"
        }}
      />
    )}

    <div style={{ padding: 10 }}>
      <h4 style={{ margin: "5px 0" }}>{ad.title}</h4>

      <p style={{
        color: "#00a650",
        fontWeight: "bold",
        fontSize: 16
      }}>
        R$ {ad.price}
      </p>
    </div>
  </div>
))}
