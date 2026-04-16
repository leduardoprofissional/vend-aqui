import React, { useEffect, useState } from 'react';

export default function App() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/ads')
      .then(res => res.json())
      .then(setAds);
  }, []);

  return (
    <div>
      <h1>Vend'Aqui</h1>
      {ads.map(ad => (
        <div key={ad._id}>
          <h2>{ad.title}</h2>
          <p>R$ {ad.price}</p>
        </div>
      ))}
    </div>
  );
}