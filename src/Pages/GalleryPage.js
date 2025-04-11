import { useState, useCallback } from "react";
import GalleryUpload from "../Components/GalleryUpload";
import GalleryImage from "../Components/GalleryImage";
import { useParams } from "react-router-dom";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const { id } = useParams();

  const getImage = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}/api/secure-gallery?user=${id}`,
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
  }, [id]);

  return (
    <div className="m-4">
      <GalleryUpload getImage={getImage} id={id} />
      <GalleryImage images={images} getImage={getImage} id={id} />
    </div>
  );
};

export default GalleryPage;
