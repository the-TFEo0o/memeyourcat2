import { useState } from "react";

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
        background: "url('https://placekitten.com/1200/800') no-repeat center/cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textShadow: "2px 2px 4px #000",
        fontFamily: "'Comic Sans MS', sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>Meme You'r Cat 😺</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(0,0,0,0.5)",
          padding: "20px",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{
            marginBottom: "15px",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            borderRadius: "10px",
            border: "none",
            background: "#ff4081",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          {loading ? "Envoi..." : "Envoyer les memes"}
        </button>
      </form>

      {resultImage && (
        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            background: "rgba(0,0,0,0.5)",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2 style={{ marginBottom: "15px" }}>Résultat du meme :</h2>
          <img
            src={resultImage}
            alt="Résultat"
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
}
