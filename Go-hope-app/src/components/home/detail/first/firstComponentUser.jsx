import React from "react";
import MoodCalendar from "./MoodCalendar.jsx";

// Exemple d'utilisation du calendrier d'humeur
const MoodCalendarExample = () => {
  // URL de l'image de profil - remplacez par votre propre image
  const profileImageUrl =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80";

  return (
    <div
      className="app-container"
      style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Calendrier de Suivi
      </h1>

      <MoodCalendar profileImage={profileImageUrl} />

      <div
        style={{
          marginTop: "30px",
          fontSize: "14px",
          color: "#777",
          textAlign: "center",
        }}
      >
        <p>
          Ce composant permet de suivre votre humeur quotidienne. Cliquez sur
          les jours pour enregistrer votre ressenti.
        </p>
      </div>
    </div>
  );
};

export default MoodCalendarExample;
