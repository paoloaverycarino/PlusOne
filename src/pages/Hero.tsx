import React, { useState, useEffect } from "react";
import LoginAlert from "../components/LoginAlert";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // Import the context
import Timer from "../components/Timer";

// Define a type for the user data
interface User {
  id: string;
  username: string;
  password: string;
}

const Hero: React.FC = () => {
  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]); // Explicitly type the users state
  const [showAlert, setShowAlert] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { setUsername } = useUser(); // Access setUsername from context
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "counters"));
      const userData: User[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<User, "id">), // Cast the data to match the User type
      }));
      setUsers(userData); // This will now work correctly
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      setUsername(matchedUser.id); // Update the context with the logged-in user's ID or username
      navigate("/user");
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-black">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="flex flex-col items-center space-y-4">
            <Timer />
            <div className="card bg-gradient-to-b from-[#A0E5EA] to-[#84DB6E] w-96 shadow-2xl border-4 border-white">
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <h1 className="font-neue font-bold text-7xl text-white">
                    PlusOne
                  </h1>
                  <h3 className="font-neue font-light text-sm text-white">
                    Username
                  </h3>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={username}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    required
                  />
                  <h3 className="font-neue font-light text-sm text-white">
                    Password
                  </h3>
                  <div className="flex relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-xs absolute right-2 top-3 border border-[#A0E5EA]"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="card-actions justify-end"></div>
                  <button type="submit" className="hidden"></button>
                </div>
              </form>
            </div>
            <div
              className={`transition-opacity duration-1000 ${
                showAlert ? "opacity-100" : "opacity-0"
              }`}
            >
              <LoginAlert />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
