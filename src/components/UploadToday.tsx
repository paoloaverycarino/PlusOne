import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../services/firebase"; // Assuming you have firebase initialized here
import { useUser } from "../contexts/UserContext";

function UploadToday() {
    const { username } = useUser();
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Set preview of image
      setImage(imageUrl);

      // Upload the image to Firebase Storage
      uploadImageToStorage(file);
    }
  };

  const uploadImageToStorage = async (file: File) => {
    try {
      setIsUploading(true);
      const imageRef = ref(storage, `uploads/`);
      await uploadBytes(imageRef, file); // Upload file to Firebase Storage

      // Get the download URL of the uploaded image
      const downloadUrl = await getDownloadURL(imageRef);

      // Store the image URL in Firestore
      await storeImageDataInFirestore(downloadUrl);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
    }
  };

  const storeImageDataInFirestore = async (imageUrl: string) => {
    try {
        const today = new Date();
    const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}-${today.getFullYear()}`;

      const dailyLoginRef = doc(db, `counters/${username}/dailyLogins/${formattedDate}`);
      await setDoc(dailyLoginRef, { imageURL: imageUrl }, { merge: true }); // Store image URL in Firestore
      console.log("Image URL stored in Firestore successfully!");
    } catch (error) {
      console.error("Error storing image URL in Firestore:", error);
    }
  };

  return (
    <>
      <div
        className="rounded-2xl border border-black flex flex-col justify-between min-h-full"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex-grow flex items-center justify-center">
          <p className="text-center font-bold">{image ? "" : "(Empty)"}</p>
        </div>
        <label className="text-center mb-2 font-bold">
          Upload of the Day
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading} // Disable the button while uploading
          />
        </label>
      </div>
    </>
  );
}

export default UploadToday;
