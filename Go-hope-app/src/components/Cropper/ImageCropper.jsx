import { useRef, useState, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar, initialImage }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(initialImage || "");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Gestion de la sélection de fichier
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/heic"];

    // Vérifier l'extension du fichier aussi (pour les fichiers HEIC d'iPhone)
    const fileName = file.name.toLowerCase();
    const isValidExtension = validTypes.some(
      (type) =>
        fileName.endsWith(type.split("/")[1]) ||
        (type === "image/jpeg" &&
          (fileName.endsWith("jpg") || fileName.endsWith("heic")))
    );

    if (!isValidExtension && !validTypes.includes(file.type)) {
      setError("Format non supporté. Utilisez JPEG, PNG ou GIF.");
      return;
    }

    setError("");
    setIsLoading(true);

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      // Créer une image pour vérifier que le chargement fonctionne
      const img = new Image();
      const imageUrl = reader.result?.toString() || "";

      img.onload = () => {
        setImgSrc(imageUrl);
        setIsLoading(false);
      };

      img.onerror = () => {
        setError(
          "Impossible de charger l'image. Veuillez réessayer avec une autre image."
        );
        setIsLoading(false);
      };

      img.src = imageUrl;
    });

    reader.onerror = () => {
      setError("Erreur lors de la lecture du fichier. Veuillez réessayer.");
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  // Fonction pour déclencher le sélecteur de fichier
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Lorsque l'image se charge dans ReactCrop, on calcule un crop centré par défaut
  const onImageLoad = (e) => {
    try {
      const { width, height } = e.currentTarget;

      // Si l'image est plus petite que la dimension minimale, ajustez le crop
      const minSize = Math.min(width, height);
      const cropSize = Math.max(MIN_DIMENSION, minSize * 0.8);
      const cropWidthInPercent = (cropSize / width) * 100;

      // Assurez-vous que le crop n'est pas trop grand
      const adjustedWidthPercent = Math.min(cropWidthInPercent, 90);

      const defaultCrop = centerCrop(
        makeAspectCrop(
          { unit: "%", width: adjustedWidthPercent },
          ASPECT_RATIO,
          width,
          height
        ),
        width,
        height
      );
      setCrop(defaultCrop);
      setCompletedCrop(defaultCrop);
    } catch (err) {
      console.error("Erreur lors du chargement de l'image:", err);
      setError("Erreur lors du calcul des dimensions de l'image.");
    }
    return false;
  };

  // Met à jour le canvas pour générer l'image recadrée avec clipping circulaire
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) return;

    try {
      const image = imgRef.current;
      const canvas = previewCanvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setError("Erreur lors de la création du contexte de dessin.");
        return;
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      if (isNaN(scaleX) || isNaN(scaleY) || scaleX <= 0 || scaleY <= 0) {
        console.error("Dimensions invalides:", {
          scaleX,
          scaleY,
          naturalWidth: image.naturalWidth,
          width: image.width,
        });
        return;
      }

      const pixelCrop = {
        x: completedCrop.x * scaleX,
        y: completedCrop.y * scaleY,
        width: completedCrop.width * scaleX,
        height: completedCrop.height * scaleY,
      };

      // S'assurer que les dimensions sont positives et valides
      if (pixelCrop.width <= 0 || pixelCrop.height <= 0) {
        console.error("Crop dimensions invalides:", pixelCrop);
        return;
      }

      // Utiliser une taille fixe pour le canvas final
      const size = Math.max(150, pixelCrop.width, pixelCrop.height);
      canvas.width = size;
      canvas.height = size;

      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clipping circulaire
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY);
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.clip();

      // Calculer la position pour centrer l'image recadrée
      const drawX = (canvas.width - pixelCrop.width) / 2;
      const drawY = (canvas.height - pixelCrop.height) / 2;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        drawX,
        drawY,
        pixelCrop.width,
        pixelCrop.height
      );
      ctx.restore();
    } catch (err) {
      console.error("Erreur lors du recadrage:", err);
      setError("Erreur lors du traitement de l'image.");
    }
  }, [completedCrop]);

  // Lors du clic sur "Valider"
  const handleCrop = () => {
    try {
      if (!previewCanvasRef.current) {
        setError("Impossible de générer l'image. Veuillez réessayer.");
        return;
      }

      // Vérifier que le canvas est valide avec des dimensions
      if (
        previewCanvasRef.current.width <= 0 ||
        previewCanvasRef.current.height <= 0
      ) {
        setError("L'image recadrée est invalide. Veuillez réessayer.");
        return;
      }

      const dataUrl = previewCanvasRef.current.toDataURL("image/png");
      if (!dataUrl || !dataUrl.startsWith("data:image/")) {
        setError("Erreur lors de la génération de l'image.");
        return;
      }

      updateAvatar(dataUrl); // On transmet la data URL au parent
      closeModal();
    } catch (err) {
      console.error("Erreur lors de la validation:", err);
      setError("Erreur lors de la validation de l'image. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex flex-col items-center max-w-full p-4 md:p-6">
      {/* Input de fichier caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        className="hidden"
      />

      {/* Si aucune image n'est présente, on affiche le champ de sélection */}
      {!imgSrc && (
        <div className="flex flex-col items-center gap-6 mb-6 w-full max-w-md p-8 pt-12 pb-12 rounded-xl bg-gradient-to-b from-[#B3D7EC]/30 to-white shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-[#F5943A]/10 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[#F5943A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-[#0E3043] text-center font-medium mb-2">
              Sélectionnez une image pour votre profil
            </p>
            <p className="text-gray-500 text-sm text-center mb-4">
              Formats acceptés: JPEG, PNG, GIF
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs justify-center">
            <button
              onClick={triggerFileInput}
              className="inline-flex items-center justify-center py-2.5 px-6 border border-transparent shadow-md text-sm md:text-base font-medium rounded-full text-white bg-[#F5943A] hover:bg-[#F1731F] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F1731F]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Chargement...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Galerie
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 max-w-md">
          <p className="font-medium text-sm">{error}</p>
          <p className="text-xs mt-1">
            Si le problème persiste, essayez d'enregistrer votre photo dans la
            galerie et de la sélectionner depuis celle-ci.
          </p>
        </div>
      )}

      {isLoading && !imgSrc && (
        <div className="text-center py-4">
          <svg
            className="animate-spin h-8 w-8 text-[#F5943A] mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-2 text-[#0E3043]">Traitement de l'image...</p>
        </div>
      )}

      {imgSrc && (
        <div className="w-full max-w-3xl">
          <div className="relative w-full mb-6 p-4 rounded-xl bg-gradient-to-b from-[#B3D7EC]/20 to-white/60 shadow-sm">
            <div className="text-[#1D5F84] font-medium text-center mb-4 text-sm md:text-base">
              Recadrez votre photo de profil
            </div>
            <div className="max-w-md mx-auto">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                circularCrop
                keepSelection
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
                className="mx-auto border border-[#B3D7EC]/50 rounded-lg overflow-hidden"
              >
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="À recadrer"
                  style={{ maxHeight: "70vh", margin: "0 auto" }}
                  onLoad={onImageLoad}
                  onError={() =>
                    setError("Erreur lors du chargement de l'image")
                  }
                  className="max-w-full h-auto"
                  crossOrigin="anonymous"
                />
              </ReactCrop>
            </div>

            {/* Instructions de recadrage */}
            <p className="text-gray-500 text-xs text-center mt-3">
              Déplacez et redimensionnez le cercle pour recadrer votre photo
            </p>

            {/* Bouton pour changer d'image */}
            <div className="flex justify-center mt-5">
              <button
                onClick={triggerFileInput}
                className="inline-flex items-center justify-center py-2 px-4 rounded-full bg-white text-[#1D5F84] border border-[#B3D7EC] shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1D5F84] transition-all duration-300"
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span className="text-sm">Changer l'image</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              className="order-2 sm:order-1 py-2.5 px-6 border border-[#B3D7EC] shadow-sm text-sm md:text-base font-medium rounded-full text-[#1D5F84] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B3D7EC] transition-colors duration-300"
              onClick={closeModal}
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              className="order-1 sm:order-2 py-2.5 px-6 border border-transparent shadow-sm text-sm md:text-base font-medium rounded-full text-white bg-[#F5943A] hover:bg-[#F1731F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F1731F] transition-colors duration-300"
              onClick={handleCrop}
              disabled={!completedCrop || isLoading}
            >
              Valider
            </button>
          </div>

          {/* Aperçu du recadrage (facultatif) */}
          <div className="flex justify-center mt-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
              {completedCrop && (
                <canvas
                  ref={previewCanvasRef}
                  className="w-full h-full"
                  style={{ display: "none" }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Canvas caché pour générer l'image finale */}
      <canvas
        ref={previewCanvasRef}
        style={{ display: "none", width: 150, height: 150 }}
      />
    </div>
  );
};

export default ImageCropper;
