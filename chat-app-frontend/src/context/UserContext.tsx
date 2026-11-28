import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type User = {
  id: string;
  fullname: string;
  username: string;
  email: string;
  avatar?: string;
} | null;

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true,
        });

        setUser(res.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
};
