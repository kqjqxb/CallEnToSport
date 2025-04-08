import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadCallEnToSportUser = async () => {
      try {
        const storedCallEnToSportUser = await AsyncStorage.getItem('currentUser');
        if (storedCallEnToSportUser) {
          setUser(JSON.parse(storedCallEnToSportUser));
        }
      } catch (error) {
        console.error('Error loading CallEnToSport user:', error);
      }
    };
    loadCallEnToSportUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
