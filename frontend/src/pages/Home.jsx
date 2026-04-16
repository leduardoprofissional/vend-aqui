import { useEffect, useState } from "react";
import api from "../services/api";
import Card from "../components/Card";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/ads").then(res => setItems(res.data));
  }, []);

  return (
    <div>
      <h2>Anúncios</h2>
      {items.map((item, i) => (
        <Card key={i} item={item} />
      ))}
    </div>
  );
}