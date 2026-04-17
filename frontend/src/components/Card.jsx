export default function Card({ item }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <h3>{item.title}</h3>
      <p>{item.price}</p>
    </div>
  );
}