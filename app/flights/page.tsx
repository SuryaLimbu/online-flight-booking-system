"use client";

import { setCookie } from "@/utils/cookies";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PiAirplaneTakeoff,
  PiAirplane,
  PiAirplaneLanding,
} from "react-icons/pi";
import ProgressBar from "../components/flights/progressBar";

// Define the type for flight data
interface Flight {
  _id: string;
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

  // console.log("flights:", flights);

  return (
    <div>
      <div>
        <ProgressBar progress={1} />
        <div className="flex justify-between items-center text-primary">
          <div className="">
            <span>Kathmandu</span>
            <br />
            <span className=" font-bold text-2xl">KTM</span>
            <br />
            <span className="text-4xl">
              <PiAirplaneTakeoff />
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-3xl mx-4">-----</span>
            <span>
              <PiAirplane className=" rotate-90 text-3xl" />
            </span>
            <span className="text-3xl mx-4">-----</span>
          </div>
          <div>
            <span>London</span>
            <br />
            <span className=" font-bold text-2xl">LHR</span>
            <br />
            <span className="text-4xl">
              <PiAirplaneLanding />
            </span>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-extrabold text-center py-10 text-primary">
          Active Flights
        </h1>
        <ul>
          {flights.length > 0 ? (
            flights.map((flight) => (
              <li key={flight._id} className="border  p-4 rounded-xl">
                <a href={`/flightBooking/${flight._id}`}>
                  <div>Airline: {flight.flightNumber}</div>
                  {/* <div>Price: {flight.price}</div> */}
                  <div>
                    Departure Airport: {flight.departureAirport.airportName}
                  </div>
                  <div>
                    Arrival Airport: {flight.arrivalAirport.airportName}
                  </div>
                  <div>
                    Departure Date:{" "}
                    {new Date(flight.departureTime).toDateString()}
                  </div>
                  <div>Cabin Class: {flight.cabinClass}</div>
                </a>
              </li>
            ))
          ) : (
            <li>No flights available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Flights;
