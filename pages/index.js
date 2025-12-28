import { useState } from "react";

const catBackgrounds = [
  "https://placekitten.com/1200/800",
  "https://cataas.com/cat/cute",
  "https://cataas.com/cat/sleepy",
  "https://cataas.com/cat/funny",
  "https://cataas.com/cat/angry",
];

function getRandomBackground() {
  return catBackgrounds[Math.floor(Math.random() * catBackgrounds.length)];
}

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
        backgroundColor: "#ffebf0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "50px 20px",
        fontFamily: "'Comic Neue', cursive",
        overflowX: "hidden",
      }}
    >
      {/* Header animé avec chat background */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <img
            key={i}
            src={getRandomBackground()}
            alt="cat meme"
            style={{
              width: "180px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
            }}
          />
        ))}
      </div>

      <h1 style={{ fontSize: "3rem", color: "#ff3c96", textShadow: "2px 2px 5px #000" }}>
        Meme You'r Cat 😹
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
            background: "#ffe0f0",
            fontWeight: "bold",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 30px",
            fontSize: "1.2rem",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(90deg,#ff3c96,#ff8fc5)",
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
          <h2 style={{ marginBottom: "20px", color: "#ff3c96" }}>Résultat du meme 😸</h2>
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
