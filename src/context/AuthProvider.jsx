import React, { useEffect, useState } from "react";
import { Auth } from "../Firebase/Firebase.config";
import { createContext } from "react";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope("email");
  googleProvider.addScope("profile");
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(Auth, email, password);
  };

  const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(Auth, email, password);
  };

  const logInWithGoogle = () => {
    return signInWithPopup(Auth, googleProvider);
  };

  const updateUser = (data) => {
    return updateProfile(Auth.currentUser, data);
  };

  //for email and password user
  const reAuthenticate = (password) => {
    const credential = EmailAuthProvider.credential(
      Auth.currentUser.email,
      password,
    );
    return reauthenticateWithCredential(Auth.currentUser, credential);
  };

  //for google user
  const reAuthenticateGoogle = () => {
    return reauthenticateWithPopup(Auth.currentUser, googleProvider);
  };

  const updateUserEmail = (email) => {
    return verifyBeforeUpdateEmail(Auth.currentUser, email);
  };

  const emailVerification = () => {
    return sendEmailVerification(Auth.currentUser);
  };

  const forgotPass = (email) => {
    return sendPasswordResetEmail(Auth, email);
  };

  const logoutUser = () => {
    return signOut(Auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    loginUser,
    logInWithGoogle,
    logoutUser,
    updateUser,
    loading,
    setLoading,
    emailVerification,
    forgotPass,
    updateUserEmail,
    reAuthenticate,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
