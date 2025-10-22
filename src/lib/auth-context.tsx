// lib/auth-context.tsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Replace with your actual API call
    // For now, this is a mock login
    const mockUser = {
      id: "1",
      name: "User",
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    router.push("/dashboard");
  };

  const signup = async (name: string, email: string, password: string) => {
    // TODO: Replace with your actual API call
    // For now, this is a mock signup
    const mockUser = {
      id: "1",
      name: name,
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}