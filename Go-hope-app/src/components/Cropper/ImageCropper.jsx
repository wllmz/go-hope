import { useRef, useState, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal, updateAvatar, initialImage }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(initialImage || "");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [error, setError] = useState("");

  // Si aucune image n'est fournie en prop, on peut aussi gérer la sélection ici
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

  // Lors du clic sur "Crop Image"
  const handleCrop = () => {
    if (!previewCanvasRef.current) return;
    const dataUrl = previewCanvasRef.current.toDataURL("image/png");
    updateAvatar(dataUrl); // On transmet la data URL au parent
    closeModal();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Si aucune image n'est présente, on affiche le champ de sélection */}
      {!imgSrc && (
        <label className="block mb-3 w-fit">
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
          />
        </label>
      )}
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <>
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
              style={{ maxHeight: "80vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className=" mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f79862] focus:outline-none"
            onClick={handleCrop}
          >
            Valider
          </button>
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
