// import React,{useContext, useState, createContext} from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [error, setError] = useState('');

//     const login = (userData) => {
//         setUser(userData);
//         setIsAuthenticated(true);
//         setError('');
//     };

//     const logout = () => {
//         setUser(null);
//         setIsAuthenticated(false);
//         setError('');
//     };

//     const updateUser = (userData) => {
//         setUser(userData);
//         setError('');
//     };

//     return (
//         <AuthContext.Provider value={{ user, isAuthenticated, error, login, logout, updateUser, setError }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
