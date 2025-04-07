import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadMontUser = async () => {
      try {
        const storedMontUser = await AsyncStorage.getItem('currentUser');
        if (storedMontUser) {
          setUser(JSON.parse(storedMontUser));
        }
      } catch (error) {
        console.error('Error loading mont user data:', error);
      }
    };
    loadMontUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
