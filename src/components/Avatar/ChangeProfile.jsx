import React, { useCallback, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { FiCamera } from "react-icons/fi";
import Cropper from "react-easy-crop";
import LoadingSpin from "../Loadings/LoadingSpin";
import axios from "axios";

const ChangeProfile = ({ onPhotoUpload }) => {
  const { user } = useAuth();
  const userName = user?.displayName || "User";
  const [first = "", second = ""] = userName.split(" ");

  // 🔥 MAIN STATE (ONLY THIS CONTROLS PREVIEW)
  const [previewImage, setPreviewImage] = useState(user?.photoURL || null);

  const [cropImage, setCropImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploading, setUploading] = useState(false);

  // create image helper
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", reject);
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  // crop helper
  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95);
    });
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // file select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return alert("Invalid file type");
    }

    if (file.size > 2 * 1024 * 1024) {
      return alert("Max 2MB allowed");
    }

    setCropImage(URL.createObjectURL(file));
  };

  // upload image to imagebb and save
  const handleUpload = async () => {
    try {
      setUploading(true);

      const croppedBlob = await getCroppedImg(cropImage, croppedAreaPixels);

      //sending photo to imageBB
      const formData = new FormData();
      formData.append("image", croppedBlob);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API_KEY}`,
        formData,
      );
      const imageUrl = res.data.data.url;
      // send the link to parent settings component
      onPhotoUpload(imageUrl);
      // 🔥 update  preview ONLY
      setPreviewImage(imageUrl);
      setCropImage(null);
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {/* PROFILE IMAGE */}
      <div className="relative w-fit mx-auto">
        <div className="w-25 h-25 flex items-center justify-center rounded-full overflow-hidden cursor-pointer shrink-0 mb-3">
          {previewImage ? (
            <img
              src={previewImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <h5 className="text-white bg-gray-800 w-full h-full flex items-center justify-center">
              {first ? first[0] : ""}
              {second ? second[0] : ""}
            </h5>
          )}
        </div>

        {/* upload button */}
        <div className="absolute right-0 bottom-0">
          <label htmlFor="photo">
            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white dark:bg-gray-900 cursor-pointer">
              <FiCamera size={18} />
            </div>
          </label>

          <input
            type="file"
            id="photo"
            hidden
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* CROPPER MODAL */}
      {cropImage && (
        <div className="fixed top-0 left-0 w-full bg-black/50 h-full z-50 flex items-center justify-center py-5">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-5 w-[95%] max-w-xl flex flex-col h-full">
            <h2 className="font-bold text-lg mb-4">Adjust Profile Picture</h2>

            <div className="relative h-100 mb-3 bg-gray-200 rounded-lg overflow-hidden">
              <Cropper
                image={cropImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            {/* zoom */}
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              className="range w-full"
              onChange={(e) => setZoom(Number(e.target.value))}
            />

            <div className="flex justify-end gap-3 mt-3">
              <button
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg"
                onClick={() => setCropImage(null)}
              >
                Cancel
              </button>

              <button
                className="bg-lime-400 hover:bg-lime-500 px-4 py-2 rounded-lg duration-75"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? <LoadingSpin></LoadingSpin> : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeProfile;
