import { useRef, useState, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar, initialImage }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const fileInputRef = useRef(null); // Référence pour l'input de fichier
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
    <div className="flex flex-col items-center">
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
        <div className="flex flex-col items-center gap-4 mb-6">
          <p className="text-gray-600 text-sm text-center">
            Sélectionnez une image pour votre profil
          </p>
          <button
            onClick={triggerFileInput}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#87BBDF] hover:bg-[#1D5F84] focus:outline-none"
          >
            Choisir une image
          </button>
        </div>
      )}

      {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

      {imgSrc && (
        <>
          <div className="relative w-full">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="À recadrer"
                style={{ maxHeight: "60vh", margin: "0 auto" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>

            {/* Bouton pour changer d'image */}
            <button
              onClick={triggerFileInput}
              className="absolute top-2 right-2 bg-white bg-opacity-80 text-gray-700 rounded-full p-2 shadow hover:bg-opacity-100 focus:outline-none text-xs"
            >
              Changer l'image
            </button>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className="py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              onClick={closeModal}
            >
              Annuler
            </button>
            <button
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f79862] hover:bg-[#e78852] focus:outline-none"
              onClick={handleCrop}
            >
              Valider
            </button>
          </div>
        </>
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
