import React, { createContext, useState, useContext } from 'react';

// 1. Créer le contexte
const AuthContext = createContext();

// 2. Créer le fournisseur (Provider)
export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = () => {
    // Ici, on pourrait mettre une logique plus complexe, 
    // mais pour l'instant, on se contente de mettre isAdmin à true.
    setIsAdmin(true);
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Créer un hook personnalisé pour utiliser le contexte facilement
export const useAuth = () => {
  return useContext(AuthContext);
};
