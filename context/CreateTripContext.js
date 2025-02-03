// import { createContext } from 'react';

// type TripContextType = {
//   tripData: any;
//   setTripData: React.Dispatch<React.SetStateAction<any>>;
// };

// export const CreateTripContext = createContext<TripContextType | null>(null);

import React, { createContext, useState } from 'react';

// Create the context for the trip data
export const CreateTripContext = createContext();

// Provider component to wrap your app
export const CreateTripProvider = ({ children }) => {
  // State to store trip data
  const [tripData, setTripData] = useState({
    locationInfo: null,
    travelerInfo: null,
    // Add more fields as needed for your trip data
  });

  // Value to be provided to consumers
  const value = {
    tripData,
    setTripData,
  };

  return (
    <CreateTripContext.Provider value={value}>
      {children}
    </CreateTripContext.Provider>
  );
};
