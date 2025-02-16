import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSubjectsForum from "../../hooks/forum/useSubject";

const SearchBar = () => {
  const navigate = useNavigate();
  const { subjects, fetchSubjects } = useSubjectsForum();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  // Charger tous les sujets au montage
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Filtrer les sujets en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSubjects([]);
    } else {
      const results = subjects.filter((subject) =>
        subject.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubjects(results);
    }
  }, [searchTerm, subjects]);

  const handleSubjectClick = (subjectId) => {
    setSearchTerm("");
    setFilteredSubjects([]);
    navigate(`/subjects/${subjectId}`);
  };

  return (
    <div className="relative w-full sm:max-w-xl mx-auto mb-5">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un sujet..."
        className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm bg-white"
      />
      {filteredSubjects.length > 0 && (
        <ul className="absolute z-20 w-full sm:max-w-xl bg-white border border-gray-300 rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto text-left">
          {filteredSubjects.map((subject) => (
            <li
              key={subject._id}
              onClick={() => handleSubjectClick(subject._id)}
              className="cursor-pointer p-3 hover:bg-orange-100 transition-colors"
            >
              {subject.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
