import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import signInWithPopup

const LoginButton: React.FC = () => {
  const handleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      // Use signInWithPopup instead of signInWithRedirect
      const result = await signInWithPopup(auth, provider);
      // You can access the user and credential here if needed
      const user = result.user;
      console.log("User logged in:", user);
    } catch (error) {
      // Type assertion to 'FirebaseError'
      if (error instanceof Error) {
        console.error("Error during login:", error.message);
      } else {
        console.error("Unexpected error during login:", error);
      }
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-gray-700 text-lg text-white py-2 px-4 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out"
      style={{ fontFamily: "Comfortaa" }}
    >
      Login
    </button>
  );
};

export default LoginButton;
