import { useState, useEffect } from "react";

const sideCats = [
  "https://cataas.com/cat/cute",
  "https://cataas.com/cat/silly",
  "https://cataas.com/cat/funny",
  "https://cataas.com/cat/angry",
  "https://cataas.com/cat/sleepy",
];

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setOffset((prev) => (prev + 1) % 20), 100);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => setSelectedFiles(e.target.files);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFiles.length) return;

    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      const res = await fetch("URL_N8N_PAR_HTTP", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur serveur");

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setResultImage(imageUrl);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi des images");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#6b4f3b", // fond marron rempli toute la page
        position: "relative",
        overflow: "visible",
        fontFamily: "'Comic Neue', cursive",
      }}
    >
      {/* Chats latéraux */}
      {sideCats.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt="side cat"
          style={{
            position: "fixed",
            top: `${100 + idx * 180 + offset}px`,
            left: idx % 2 === 0 ? "20px" : "auto",   // écart du côté gauche
            right: idx % 2 !== 0 ? "20px" : "auto",  // écart du côté droit
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "15px",
            opacity: 0.9,
            transform: `rotate(${idx % 2 === 0 ? offset : -offset}deg)`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Contenu principal */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 20px",
          zIndex: 2,
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "5rem",
            color: "#ff0000",
            textShadow: "4px 4px 8px #000",
            marginBottom: "50px",
            textAlign: "center",
          }}
        >
          MEME YOU'R CAT
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "30px",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(12px)",
            padding: "35px",
            borderRadius: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{
              marginBottom: "25px",
              padding: "12px",
              borderRadius: "15px",
              border: "none",
              cursor: "pointer",
              background: "#f0d6c1",
              fontWeight: "bold",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "15px 35px",
              fontSize: "1.6rem",
              borderRadius: "15px",
              border: "none",
              background: "linear-gradient(90deg,#ff0000,#ff6b6b)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
              boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {loading ? "Envoi..." : "Créer le meme"}
          </button>
        </form>

        {resultImage && (
          <div
            style={{
              marginTop: "50px",
              textAlign: "center",
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              padding: "30px",
              borderRadius: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ marginBottom: "25px", color: "#ff0000" }}>Résultat du meme</h2>
            <img
              src={resultImage}
              alt="Résultat"
              style={{
                maxWidth: "100%",
                borderRadius: "20px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
