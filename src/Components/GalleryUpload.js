import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ImageSection from "./ImageSection";

const GalleryUpload = ({ getImage }) => {
  const methods = useForm();
  const { getValues } = methods;

  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?._id;

  const onSubmit = async () => {
    const images = getValues("imageFile");

    if (!images || images.length === 0) {
      alert("Please select images before submitting.");
      return;
    }

    const formData = new FormData();
    images.forEach((file) => {
      formData.append("imageFile", file);
    });

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      formData.append("user", user._id);
    }

    try {
      setUploading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}/secure-gallery/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      setUploadResult(result);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
      getImage();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ImageSection />
        <button
          type="submit"
          disabled={uploading}
          style={{
            marginTop: "10px",
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
        {uploadResult && (
          <div style={{ marginTop: "10px", color: "green" }}>
            Upload successful!
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default GalleryUpload;
