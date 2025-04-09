import { useEffect } from "react";

const GalleryImage = ({ getImage, images }) => {
  useEffect(() => {
    getImage();
  }, [getImage]);

  return (
    <div className="container mt-4">
      {images.length > 0 ? (
        <div className="row g-3">
          {images.map((url, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  className="card-img-top"
                  src={url}
                  alt={`gallery-${index}`}
                  style={{ objectFit: "cover", height: "100%" }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No images available.</p>
      )}
    </div>
  );
};

export default GalleryImage;
