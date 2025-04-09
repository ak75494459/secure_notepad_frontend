import { useFormContext, Controller } from "react-hook-form";

const ImageSection = () => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h2>Add Images</h2>
      <Controller
        name="imageFile"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              multiple
              onChange={(e) => {
                const filesArray = e.target.files ? Array.from(e.target.files) : [];
                console.log("Files array:", filesArray);
                field.onChange(filesArray);
              }}
            />
            {error && (
              <p style={{ color: "red", fontSize: "0.875rem" }}>{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default ImageSection;
