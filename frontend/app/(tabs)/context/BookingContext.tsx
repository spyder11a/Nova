import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  // Load stored bookings on app start
  useEffect(() => {
    const loadBookings = async () => {
      const storedBookings = await AsyncStorage.getItem('bookings');
      if (storedBookings) setBookings(JSON.parse(storedBookings));
    };
    loadBookings();
  }, []);

  // Save bookings to AsyncStorage
  const addBooking = async (newBooking) => {
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  // ✅ Function to reset bookings
  const resetBookings = async () => {
    setBookings([]); // Reset state
    await AsyncStorage.removeItem('bookings'); // Clear AsyncStorage
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, resetBookings }}>
      {children}
    </BookingContext.Provider>
  );
};
