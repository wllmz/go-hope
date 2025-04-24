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

  // Gestion de la sélection de fichier
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setError("Seuls les fichiers JPEG, PNG ou GIF sont autorisés.");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
    });
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
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const defaultCrop = centerCrop(
      makeAspectCrop(
        { unit: "%", width: cropWidthInPercent },
        ASPECT_RATIO,
        width,
        height
      ),
      width,
      height
    );
    setCrop(defaultCrop);
    setCompletedCrop(defaultCrop);
    return false;
  };

  // Met à jour le canvas pour générer l'image recadrée avec clipping circulaire
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) return;
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelCrop = {
      x: completedCrop.x * scaleX,
      y: completedCrop.y * scaleY,
      width: completedCrop.width * scaleX,
      height: completedCrop.height * scaleY,
    };

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clipping circulaire
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
    ctx.restore();
  }, [completedCrop]);

  // Lors du clic sur "Valider"
  const handleCrop = () => {
    if (!previewCanvasRef.current) return;
    const dataUrl = previewCanvasRef.current.toDataURL("image/png");
    updateAvatar(dataUrl); // On transmet la data URL au parent
    closeModal();
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
        <div className="flex flex-col items-center gap-4 mb-6 w-full max-w-md p-8 rounded-xl bg-gradient-to-b from-[#B3D7EC]/30 to-white">
          <p className="text-[#0E3043] text-center font-medium">
            Sélectionnez une image pour votre profil
          </p>
          <button
            onClick={triggerFileInput}
            className="inline-flex items-center justify-center py-2.5 px-5 border border-transparent shadow-md text-sm md:text-base font-medium rounded-full text-white bg-[#F5943A] hover:bg-[#F1731F] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F1731F]"
          >
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Choisir une image
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2 mb-4">{error}</p>}

      {imgSrc && (
        <div className="w-full max-w-3xl">
          <div className="relative w-full mb-6 p-4 rounded-xl bg-gradient-to-b from-[#B3D7EC]/20 to-white/60 shadow-sm">
            <div className="text-[#1D5F84] font-medium text-center mb-4 text-sm md:text-base">
              Recadrez votre photo de profil
            </div>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
              className="max-w-full mx-auto border border-[#B3D7EC]/50 rounded-lg overflow-hidden"
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="À recadrer"
                style={{ maxHeight: "60vh", margin: "0 auto" }}
                onLoad={onImageLoad}
                className="max-w-full h-auto"
              />
            </ReactCrop>

            {/* Bouton pour changer d'image */}
            <button
              onClick={triggerFileInput}
              className="absolute top-3 right-3 bg-white/90 text-[#1D5F84] rounded-full p-2.5 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D5F84] transition-all duration-300 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              <span className="ml-1.5 text-xs hidden sm:inline">Changer</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              className="order-2 sm:order-1 py-2.5 px-6 border border-[#B3D7EC] shadow-sm text-sm md:text-base font-medium rounded-full text-[#1D5F84] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B3D7EC] transition-colors duration-300"
              onClick={closeModal}
            >
              Annuler
            </button>
            <button
              className="order-1 sm:order-2 py-2.5 px-6 border border-transparent shadow-sm text-sm md:text-base font-medium rounded-full text-white bg-[#F5943A] hover:bg-[#F1731F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F1731F] transition-colors duration-300"
              onClick={handleCrop}
            >
              Valider
            </button>
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
