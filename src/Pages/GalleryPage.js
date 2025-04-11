import { useState, useCallback } from "react";
import GalleryUpload from "../Components/GalleryUpload";
import GalleryImage from "../Components/GalleryImage";

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  const getImage = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}/api/secure-gallery?user=${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      const allImageUrls = data.flatMap((gallery) => gallery.imageUrl || []);
      setImages(allImageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, []);

  return (
    <div className="m-4">
      <GalleryUpload getImage={getImage} />
      <GalleryImage images={images} getImage={getImage} />
    </div>
  );
};

export default GalleryPage;
