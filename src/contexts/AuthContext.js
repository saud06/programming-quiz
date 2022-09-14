import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { useContext, useEffect, useState } from "react";
import '../firebase';

const AuthContext = React.createContext();

// Custom hook useAuth() that will be called by all other components to get / consume context and get AuthContext data
export function useAuth(){
  // All other components will get AuthContext data from the context
  return useContext(AuthContext);
}

// AuthProvider function is not the AuthContext (or context provider) itself. Rather, It will wrap the whole application
export function AuthProvider({children}){
  // Set loader because the server requires some time to fetch the data from Firebase
  const [loader, setLoader] = useState(true);
  // Set current logged in user data 
  const [currentUser, setCurrentUser] = useState();

  // Update currentUser data and loader after getitng the data from server
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoader(false);
    });

    // clean up to avoin memory leak
    return unsubscribe;
  }, []);

  // Signup function
  // This is an asynchronous function because of server response
  async function signup(email, password, username){
    const auth = getAuth();

    await createUserWithEmailAndPassword(auth, email, password);

    // Update profile with username
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    // Get the updated user data
    const user = auth.currentUser;

    // Update user data to local state to get that into all over the app
    setCurrentUser({
      ...user,
    });
  }

  // Login function
  function login(email, password){
    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout function
  function logout(){
    const auth = getAuth();

    return signOut(auth);
  }

  // Create value obj to set into the Provider
  const value = {
    currentUser,
    signup,
    login,
    logout,
  }

  return(
    <AuthContext.Provider value={value}>
      {/* Show children data once loading is done */}
      {!loader && children}
    </AuthContext.Provider>
  );
}