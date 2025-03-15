import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Appearance, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define Light and Dark Themes
const LightTheme = {
  background: "#ffffff",
  primary: "#F3F4F5",
  secondary: "#868686",
  text_primary: "#181C1F",
  text_secondary: "#636E80",
  text_tertiary: "#F3F4F5",
};

const DarkTheme = {
  background: "#0E0E0E",
  primary: "#222222",
  secondary: "#868686",
  text_primary: "#FFFFFF",
  text_secondary: "#FFFFFF",
  text_tertiary: "#000000",
};

// Define the ThemeContext Type
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof LightTheme;
};

// Create Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define Props Type for ThemeProvider
type ThemeProviderProps = {
  children: ReactNode;
};

// Theme Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemScheme = useColorScheme(); // Get system theme
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === "dark");

  // Load theme from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme !== null) {
        setIsDarkMode(storedTheme === "dark");
      }
    };
    loadTheme();
  }, []);

  // Save theme and toggle
  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Select theme based on mode
  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook to use ThemeContext
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
