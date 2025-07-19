import React from "react";
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import PropTypes from "prop-types"; 


export function AuthProvider({ children }) {
  const { setLoading } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("auth-storage");
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        if (parsedToken.state?.user && parsedToken.state?.token) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error parsing auth storage:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [setLoading]);

  return <>{children}</>;
}


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}