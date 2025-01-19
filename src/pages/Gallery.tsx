import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "../contexts/UserContext";
import HomeButton from "../components/HomeButton";
import UserSelect from "../components/UserSelect";

const Gallery: React.FC = () => {
  const { username } = useUser(); // Current user's username
  const [images, setImages] = useState<{ src: string; date: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>(username || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [modalDate, setModalDate] = useState<string>("");
  const columnOffsets = ["20px", "60px"];

  // Function to fetch images based on selected user
  const fetchImagesForUser = async (user: string) => {
    const imagesArray: { src: string; date: string }[] = [];
    const querySnapshot = await getDocs(
      collection(db, `counters/${user}/dailyLogins`)
    );

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const date = docSnap.id; // Assuming the document ID is the date
      if (data.loggedIn && data.imageURL) {
        imagesArray.push({ src: data.imageURL, date });
      }
    });

    setImages(imagesArray); // Set images for the selected user
  };

  // Fetch images when the selected user changes
  useEffect(() => {
    fetchImagesForUser(selectedUser);
  }, [selectedUser]);

  // Modal functions
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

  return (
    <div className="bg-black min-h-screen h-auto p-4 flex flex-col overflow-auto">
      <div className="absolute top-5 left-5 flex flex-row">
        <HomeButton />
        <div className="pl-1">
          <UserSelect
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser} // Handle user change
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center pt-16 h-[20vh] lg:h-[35vh]">
        <h1 className="text-[6rem] lg:text-[12rem] font-neue text-white font-semibold text-center mb-4">
          Gallery
        </h1>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-8">
        {images.map((image, index) => {
          const columnIndex = index % 6; // Determine column index
          const offset = columnOffsets[columnIndex % 2]; // Calculate offset based on column index

          return (
            <div
              key={index}
              className="relative w-full h-0 pb-[177.78%]"
              style={{ transform: `translateY(${offset})` }} // Apply offset
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
            <button
              className="btn btn-square btn-ghost absolute top-2 right-2"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-center text-4xl font-neue text-white mt-4">
              {modalDate}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
