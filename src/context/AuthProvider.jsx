import React, { useEffect, useState } from "react";
import { Auth } from "../Firebase/Firebase.config";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        Auth,
        email,
        password,
      );
      return result;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(Auth, email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (data) => {
    return updateProfile(Auth.currentUser, data);
  };

  const emailVerification = () => {
    return sendEmailVerification(Auth.currentUser);
  };

  const logoutUser = () => {
    return signOut(Auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setLoading(false);
      return setUser(currentUser);
      return () => {
        unsubscribe();
      };
    });
  }, []);

  const authInfo = {
    user,
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    loading,
    emailVerification,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
