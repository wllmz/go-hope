import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuestion,
  FaPlus,
  FaCheck,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const MoodCalendar = ({ profileImage }) => {
  // État pour gérer la date de départ de la semaine en cours d'affichage (date du premier jour affiché)
  const [startDate, setStartDate] = useState(new Date());
  // État pour stocker l'index du jour sélectionné (0-6)
  const [selectedDayIndex, setSelectedDayIndex] = useState(3);
  // État pour stocker les données des jours affichés
  const [daysData, setDaysData] = useState([]);
  // État pour contrôler l'affichage de l'interface de saisie du ressenti
  const [showSymptoms, setShowSymptoms] = useState(false);
  // État pour l'onglet actif
  const [activeTab, setActiveTab] = useState("ressentis");

  // Données factices pour simuler des humeurs enregistrées
  // Dans une vraie application, ces données viendraient d'une API ou d'une base de données
  const moodDatabase = {
    // Format "YYYY-MM-DD": "mood"
  };

  // Formatte une date au format français abrégé (ex: "15 fév")
  const formatDayMonth = (date) => {
    const day = date.getDate();
    // Liste des mois abrégés en français
    const months = [
      "jan",
      "fév",
      "mar",
      "avr",
      "mai",
      "juin",
      "juil",
      "août",
      "sept",
      "oct",
      "nov",
      "déc",
    ];
    const month = months[date.getMonth()];
    return { day, month };
  };

  // Convertit une date en chaîne de format YYYY-MM-DD pour récupérer l'humeur
  const dateToString = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Génère un tableau de 7 jours à partir de la date de départ
  const generateWeekDays = (startingDate) => {
    const days = [];
    const startDay = new Date(startingDate);
    startDay.setDate(startDay.getDate() - 3); // Commencer 3 jours avant pour mettre aujourd'hui au milieu

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDay);
      currentDate.setDate(startDay.getDate() + i);

      const { day, month } = formatDayMonth(currentDate);
      const dateKey = dateToString(currentDate);

      days.push({
        date: currentDate,
        day,
        month,
        mood: moodDatabase[dateKey] || null,
        isToday: isToday(currentDate),
      });
    }

    return days;
  };

  // Vérifie si une date est aujourd'hui
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Effet pour initialiser les jours à afficher
  useEffect(() => {
    const today = new Date();
    setStartDate(today);
    setDaysData(generateWeekDays(today));
  }, []);

  // Navigation: semaine précédente
  const navigatePrevWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
    setDaysData(generateWeekDays(newStartDate));
    setSelectedDayIndex(3); // Sélectionner le jour du milieu par défaut
  };

  // Navigation: semaine suivante
  const navigateNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
    setDaysData(generateWeekDays(newStartDate));
    setSelectedDayIndex(3); // Sélectionner le jour du milieu par défaut
  };

  // Fonction pour afficher l'icône d'humeur appropriée
  const renderMoodIcon = (mood) => {
    if (!mood) return <FaQuestion className="text-gray-400 text-sm" />;

    // Utiliser une photo de profil comme icône d'humeur (comme dans l'exemple)
    if (mood === "happy" || mood === "sad") {
      return (
        <div className="w-full h-full">
          <img
            src={profileImage}
            alt="Mood"
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return <FaQuestion className="text-gray-400 text-sm" />;
  };

  // Sélectionner un jour spécifique
  const selectDay = (index) => {
    setSelectedDayIndex(index);
  };

  // Ouvrir l'interface de saisie du ressenti
  const openSymptomsPanel = () => {
    setShowSymptoms(true);
  };

  // Fermer l'interface de saisie du ressenti
  const closeSymptomsPanel = () => {
    setShowSymptoms(false);
  };

  // Changer l'onglet actif
  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  // Les onglets disponibles
  const tabs = [
    { id: "ressentis", label: "Ressentis" },
    { id: "somnolence", label: "Somnolence" },
    { id: "humeurs", label: "Humeurs" },
    { id: "douleur", label: "Douleur" },
  ];

  // Liste des symptômes pour l'onglet "Ressentis"
  const symptomsList = [
    { id: "mains", label: "Les mains", intensity: 2, status: "normal" },
    {
      id: "bras-gauche",
      label: "Le bras gauche",
      intensity: 1,
      status: "bestiole",
    },
    { id: "jambe-gauche", label: "La jambe gauche", intensity: 0, status: "" },
  ];

  return (
    <div className="bg-[#f5f8fb] rounded-2xl shadow-lg p-6 w-full max-w-[450px] mx-auto flex flex-col items-center gap-5">
      {!showSymptoms ? (
        // Vue du calendrier
        <>
          <div className="w-full mb-3">
            <div className="flex items-center gap-4">
              <img
                src={profileImage}
                alt="Profile"
                className="w-[70px] h-[70px] rounded-full object-cover border-4 border-gray-100"
              />
              <div className="flex flex-col">
                <h2 className="text-[#2d5a74] text-2xl font-medium m-0 mb-1">
                  Mon suivi
                </h2>
                <p className="text-[#798796] text-sm m-0">
                  Votre ressenti du jour :
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full justify-between my-4 relative">
            <button
              className="bg-transparent border-none text-[#e29742] text-lg cursor-pointer p-2 flex items-center justify-center z-10 hover:text-[#d88a30] hover:scale-110 transition-all duration-200"
              onClick={navigatePrevWeek}
            >
              <FaChevronLeft />
            </button>

            <div className="flex gap-2.5 overflow-x-hidden py-2.5 max-w-[320px]">
              {daysData.map((day, index) => (
                <div
                  key={index}
                  onClick={() => selectDay(index)}
                  className={`
                    flex flex-col items-center justify-center w-[42px] h-[42px] rounded-full relative bg-gray-100 
                    flex-shrink-0 cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-gray-200
                    ${
                      index === selectedDayIndex ? "bg-[#f9c78b] scale-105" : ""
                    }
                    ${
                      !day.mood && index === selectedDayIndex
                        ? "bg-[#f9d9b1]"
                        : ""
                    }
                    ${day.isToday ? "border-2 border-[#e29742]" : ""}
                    ${
                      day.isToday && index === selectedDayIndex
                        ? "border-2 border-[#d88a30] shadow-[0_0_0_2px_rgba(226,151,66,0.3)]"
                        : ""
                    }
                  `}
                >
                  <div className="text-sm font-semibold mb-[-2px] text-gray-700">
                    {day.day}
                  </div>
                  <div className="text-xs text-gray-500">{day.month}</div>
                  <div className="absolute -bottom-3.5 w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
                    {renderMoodIcon(day.mood)}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="bg-transparent border-none text-[#e29742] text-lg cursor-pointer p-2 flex items-center justify-center z-10 hover:text-[#d88a30] hover:scale-110 transition-all duration-200"
              onClick={navigateNextWeek}
            >
              <FaChevronRight />
            </button>
          </div>

          <button
            className="bg-[#e29742] text-white border-none rounded-full py-3 px-6 text-base cursor-pointer transition-all duration-200 w-full max-w-[280px] mt-4 shadow-[0_2px_8px_rgba(226,151,66,0.3)] hover:bg-[#d88a30]"
            onClick={openSymptomsPanel}
          >
            Accéder à mon historique
          </button>
        </>
      ) : (
        // Vue de l'interface de saisie du ressenti
        <div className="w-full flex flex-col h-full">
          <div className="flex justify-end mb-2.5 w-full">
            <button
              className="bg-transparent border-none text-gray-400 cursor-pointer p-1 hover:text-gray-600"
              onClick={closeSymptomsPanel}
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {/* Onglets de catégories */}
          <div className="flex justify-between bg-gray-100 rounded-full p-1 mb-5 w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`
                  flex-1 bg-transparent border-none py-2 px-3 text-xs text-gray-500 rounded-full cursor-pointer transition-all duration-300
                  ${
                    activeTab === tab.id
                      ? "bg-white text-gray-800 shadow-sm"
                      : ""
                  }
                `}
                onClick={() => changeTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Liste des symptômes pour l'onglet actif */}
          <div className="flex flex-col gap-4 mb-6 w-full">
            {symptomsList.map((symptom) => (
              <div
                key={symptom.id}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-sm font-medium text-gray-800">
                    {symptom.label}
                  </span>
                  {symptom.status && (
                    <div
                      className={`w-6 h-6 rounded-full bg-white flex items-center justify-center text-base ${
                        symptom.status === "normal" ? "text-[#e29742]" : ""
                      } ${
                        symptom.status === "bestiole" ? "text-[#e29742]" : ""
                      }`}
                    >
                      {symptom.status === "normal" && "🙂"}
                      {symptom.status === "bestiole" && "🙂"}
                    </div>
                  )}
                </div>
                <div className="relative w-full flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={symptom.intensity}
                    className="w-full h-1.5 appearance-none bg-gray-100 outline-none rounded cursor-pointer"
                    style={{
                      backgroundImage: `linear-gradient(to right, #e29742 0%, #e29742 ${
                        symptom.intensity * 25
                      }%, #f0f0f0 ${symptom.intensity * 25}%, #f0f0f0 100%)`,
                    }}
                    onChange={() => {}}
                  />
                  {symptom.id === "jambe-gauche" && (
                    <div className="absolute right-0 text-gray-400">
                      <FaChevronRight size={12} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bouton d'ajout en bas */}
          <button className="w-[50px] h-[50px] rounded-full bg-[#e29742] border-none text-white flex items-center justify-center self-center cursor-pointer shadow-[0_4px_10px_rgba(226,151,66,0.3)] mt-auto transition-all duration-200 hover:bg-[#d88a30] hover:scale-105">
            <FaPlus size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodCalendar;
