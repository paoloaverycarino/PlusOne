import { useState } from "react";

function UploadToday() {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <>
      <div
        className="rounded-2xl border border-black flex flex-col justify-between min-h-full"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex-grow flex items-center justify-center">
          <p className="text-center font-bold">{image ? "" : "(Empty)"}</p>
        </div>
        <label className="text-center mb-2 font-bold">
          Upload of the Day
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </>
  );
}

export default UploadToday;
