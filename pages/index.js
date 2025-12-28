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
      // Remplace URL_N8N_PAR_HTTP par ton webhook n8n
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
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Uploader une image vers n8n</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </form>
      {resultImage && (
        <div style={{ marginTop: 20 }}>
          <h2>Image renvoyée par n8n :</h2>
          <img src={resultImage} alt="Résultat" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}
