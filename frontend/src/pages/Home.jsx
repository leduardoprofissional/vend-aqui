import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    api.get("/ads").then(res => setAds(res.data));
  }, []);

  return (
    <div>
      <h1>Anúncios</h1>
      {ads.map((ad, i) => (
        <div key={i}>
          <h3>{ad.title}</h3>
          <p>R$ {ad.price}</p>
          {ad.image && <img src={ad.image} width="200" />}
        </div>
      ))}
    </div>
  );
}