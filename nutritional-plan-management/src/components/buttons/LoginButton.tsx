import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { loginUserWithGoogle } from "../../services/authService"; // Import the service

const LoginButton: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async () => {
    const user = await loginUserWithGoogle();
    if (user) {
      console.log("User logged in:", user);
      navigate("/"); // Redirect to the homepage ("/") after login
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-lightBlue hover:bg-mediumBlue text-lg text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
    >
      Login
    </button>
  );
};

export default LoginButton;
