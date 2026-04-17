import { createContext, useContext, useEffect, useState } from "react";

// ✅ Create context for theme
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  // ✅ FIX: Read saved theme from localStorage on first load
  // If no saved theme, check system preference (dark/light)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // ✅ FIX: Apply "dark" class to <html> element whenever dark state changes
  // This is what Tailwind's dark mode (class strategy) looks for
  useEffect(() => {
    const root = document.documentElement; // <html> element

    if (dark) {
      root.classList.add("dark");       // Tailwind dark mode ON
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");    // Tailwind dark mode OFF
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // ✅ Toggle function — flips dark/light
  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Custom hook for easy use in any component
export const useTheme = () => useContext(ThemeContext);