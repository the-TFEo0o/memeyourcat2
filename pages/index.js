import { useState, useEffect } from "react";

// Images memes pour le décor
const sideCats = [
  "https://cataas.com/cat/cute",
  "https://cataas.com/cat/silly",
  "https://cataas.com/cat/funny",
  "https://cataas.com/cat/angry",
];

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pour animation simple des images latérales
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setOffset((prev) => (prev + 1) % 20), 100);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFiles.length) return;

    setLoading(true);

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    try {
      // Remplace par ton webhook n8n
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
        backgroundColor: "#6b4f3b", // marron foncé
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px 20px",
        fontFamily: "'Comic Neue', cursive",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Images latérales dynamiques */}
      {sideCats.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt="side cat"
          style={{
            position: "absolute",
            top: `${50 + idx * 150 + offset}px`,
            left: idx % 2 === 0 ? "-100px" : "calc(100% - 100px)",
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "15px",
            opacity: 0.8,
            transform: `rotate(${idx % 2 === 0 ? offset : -offset}deg)`,
            transition: "transform 0.2s",
          }}
        />
      ))}

      {/* Titre principal */}
      <h1
        style={{
          fontSize: "4rem",
          color: "#ff0000",
          textShadow: "3px 3px 6px #000",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        MEME YOU'R CAT
      </h1>

      {/* Formulaire upload */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "30px",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "12px",
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
            padding: "12px 30px",
            fontSize: "1.5rem",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(90deg,#ff0000,#ff6b6b)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {loading ? "Envoi..." : "Créer le meme"}
        </button>
      </form>

      {/* Résultat */}
      {resultImage && (
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#ff0000" }}>Résultat du meme</h2>
          <img
            src={resultImage}
            alt="Résultat"
            style={{ maxWidth: "100%", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
          />
        </div>
      )}
    </div>
  );
}
