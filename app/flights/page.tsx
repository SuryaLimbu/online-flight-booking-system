"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define the type for flight data
interface Flight {
  _id: number;
  flightNumber: string;
  departureAirport: {
    airportName: string;
  };
  arrivalAirport: {
    airportName: string;
  };
  departureTime: string;
  cabinClass: string;
}

// Define the type for the query parameters
interface FlightQueryParams {
  from: string;
  to: string;
  departureDate: string;
  cabinClass: string;
  totalTravelers: string;
}

const Flights = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departureDate = searchParams.get("departureDate");
  const cabinClass = searchParams.get("cabinClass");
  const totalTravelers = searchParams.get("totalTravelers");

  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    if (!from || !to || !departureDate || !cabinClass || !totalTravelers) {
      return;
    }

    fetch(
      `/api/searchFlights?from=${from}&to=${to}&departureDate=${departureDate}&cabinClass=${cabinClass}&totalTravelers=${totalTravelers}`
    )
      .then((response) => response.json())
      .then((data) => setFlights(data));
  }, [from, to, departureDate, cabinClass, totalTravelers]);

  console.log("flights:", flights);

  return (
    <div>
      <ul>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <li key={flight._id}>
              <a href={`/flightBooking/${flight._id}`}>
                <div>Airline: {flight.flightNumber}</div>
                {/* <div>Price: {flight.price}</div> */}
                <div>
                  Departure Airport: {flight.departureAirport.airportName}
                </div>
                <div>Arrival Airport: {flight.arrivalAirport.airportName}</div>
                <div>Departure Date: {flight.departureTime}</div>
                <div>Cabin Class: {flight.cabinClass}</div>
              </a>
            </li>
          ))
        ) : (
          <li>No flights available</li>
        )}
      </ul>
    </div>
  );
};

export default Flights;
