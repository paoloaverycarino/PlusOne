import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "../contexts/UserContext";

const Gallery: React.FC = () => {

  // Fetch 
  const { username } = useUser();
  const [images, setImages] = useState<{ src: string, date: string }[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const imagesArray: { src: string, date: string }[] = [];
      const querySnapshot = await getDocs(collection(db, `counters/${username}/dailyLogins`));

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const date = docSnap.id; // Assuming the document ID is the date
        if (data.loggedIn && data.imageURL) {
          imagesArray.push({ src: data.imageURL, date });
        }
      });

      setImages(imagesArray); // Set the images array with the fetched data
    };

    fetchAllData(); // Fetch images when the component mounts
  }, []);

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------

  // Modal Functions
  const columnOffsets = ["20px", "60px"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [modalDate, setModalDate] = useState<string>("");

  const openModal = (image: string, date: string) => {
    setModalImage(image);
    setModalDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="bg-black min-h-screen p-4">
      <div className="flex justify-center text-center pt-6 h-[35vh]">
        <h1 className="text-[12rem] font-neue text-white font-semibold text-center mb-4">Gallery</h1>
      </div>

      <div className="grid grid-cols-6 gap-8">
        {images.map((image, index) => {
          const columnIndex = index % 6;
          const offset = columnOffsets[columnIndex % 2]; 

          return (
            <div
              key={index}
              className="relative w-full h-0 pb-[177.78%]"
              style={{ transform: `translateY(${offset})` }}
            >
              <img
                src={image.src}
                alt={`Image ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg 
                           hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                onClick={() => openModal(image.src, image.date)}
              />
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50"
          onClick={handleBackgroundClick}
        >
          <div className="relative">
            <img
              src={modalImage}
              alt="Enlarged Image"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center text-4xl font-neue text-white mt-4">{modalDate}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

