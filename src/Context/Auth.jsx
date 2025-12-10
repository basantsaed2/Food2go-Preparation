import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removePreparation, setPreparation, } from "../Store/CreateSlices";

// Create a context
const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const preparationData = useSelector((state) => state.preparation.data);

  const [preparation, setpreparationState] = useState(() => preparationData || null);

  const login = (preparationData) => {
    setpreparationState(preparationData); // Update local state
    dispatch(setPreparation(preparationData)); // Dispatch to Redux
    toast.success(`Welcome ${preparationData?.preparation_man?.name || '-'}`);
  };

  const logout = () => {
    setpreparationState(null);
    dispatch(removePreparation()); // Remove from Redux
    localStorage.clear();
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        preparation,
        login,
        logout,
        toastSuccess: (text) => toast.success(text),
        toastError: (text) => toast.error(text),
      }}
    >
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a ContextProvider");
  }
  return context;
};