import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the context type
interface UserContextType {
  username: string | null;
  setUsername: (username: string) => void;
}

// Create a context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider to share the context
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};