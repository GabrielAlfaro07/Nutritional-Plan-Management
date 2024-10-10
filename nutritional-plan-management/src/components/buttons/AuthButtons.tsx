import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginButton from "../buttons/LoginButton";
import ProfileButton from "../buttons/ProfileButton";

const AuthButtons: React.FC = () => {
  const [user, setUser] = useState<any>(null); // Hold the authenticated user

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <div>
      {user ? (
        <ProfileButton /> // If authenticated, show ProfileButton
      ) : (
        <LoginButton /> // If not authenticated, show LoginButton
      )}
    </div>
  );
};

export default AuthButtons;
