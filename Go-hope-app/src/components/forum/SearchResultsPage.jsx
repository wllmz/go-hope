import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaThumbsUp, FaComment } from "react-icons/fa";
import useSubjectsForum from "../../hooks/forum/useSubject";

const SearchBarWithResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subjects, fetchSubjects } = useSubjectsForum();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  // Charger tous les sujets au montage
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Mettre à jour searchTerm à partir de l'URL, si présent
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearchTerm(q);
  }, [location.search]);

  // Filtrer les sujets en fonction du terme de recherche appliqué aux catégories
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSubjects([]);
    } else {
      const lowerCaseTerm = searchTerm.toLowerCase();
      const results = subjects.filter((subject) =>
        subject.categories?.some(
          (cat) =>
            cat.categorie && cat.categorie.toLowerCase().includes(lowerCaseTerm)
        )
      );
      setFilteredSubjects(results);
    }
  }, [searchTerm, subjects]);

  const handleSubjectClick = (subjectId) => {
    navigate(`/forum/subjects/${subjectId}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="w-full pt-8 pb-4 bg-gradient-to-b from-[#B3D7EC] to-white">
      <div className="p-6 max-w-6xl mx-auto mt-5">
        <div className="relative bg-white rounded-xl mb-4">
          {searchTerm ? (
            <FaArrowLeft
              onClick={handleBackClick}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            />
          ) : (
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par catégorie..."
              className="w-full p-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </form>
        </div>
        {searchTerm && (
          <div className="grid grid-cols-1 gap-6">
            <h1 className="text-3xl font-bold text-gray-800 mt-5">
              {searchTerm}
            </h1>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <div
                  key={subject._id}
                  onClick={() => handleSubjectClick(subject._id)}
                  className="cursor-pointer bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out"
                >
                  <h2 className="text-2xl font-bold text-gray-800">
                    {subject.title}
                  </h2>
                  <p className="mt-2 mb-2 text-gray-600">
                    {subject.content.length > 200
                      ? subject.content.slice(0, 200) + "..."
                      : subject.content}
                  </p>
                  <div className="mt-4">
                    {subject.categories &&
                      subject.categories.map((cat, index) => (
                        <span
                          key={index}
                          className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm mr-2"
                        >
                          #{cat.categorie}
                        </span>
                      ))}
                    <div className="flex gap-6 mt-2">
                      <div className="flex items-center">
                        <FaThumbsUp className="mr-1" />
                        <span>{subject.favoris?.length || 0}</span>
                      </div>
                      <div className="flex items-center">
                        <FaComment className="mr-1" />
                        <span>{subject.commentCount || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                Aucun sujet trouvé pour "{searchTerm}".
              </p>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default SearchBarWithResults;
