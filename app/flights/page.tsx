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
import Airport from "@/models/Airport";

// Define the type for flight data
interface Flight {
  _id: string;
  flightNumber: string;
  departureAirport: {
    airportName: string;
    airportCode: string;
  };
  arrivalAirport: {
    airportName: string;
    airportCode: string;
  };
  arrivalTime: string;
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
      <div>
        <ProgressBar progress={1} />
      </div>

      <div>
        <h1 className="text-4xl font-extrabold text-center py-10 text-primary">
          Active Flights
        </h1>

        {flights.length > 0 ? (
          flights.map((flight) => (
            <a href={`/flightBooking/${flight._id}`}>
              <div className="flex justify-between items-center text-primary border rounded-3xl p-6">
                <div className="flex space-x-6">
                  <div>
                    <span className="text-6xl">
                      <PiAirplaneTakeoff />
                    </span>
                  </div>
                  <div className="">
                    <span>{flight.departureAirport.airportName}</span>
                    <br />
                    <span className=" font-bold text-4xl">
                      {flight.departureAirport.airportCode}
                    </span>
                    <br />
                    <span>{flight.departureTime}</span>
                  </div>
                </div>

                <div className="flex items-center opacity-50">
                  <span className="text-3xl mx-4">-----</span>
                  <span>
                    <PiAirplane className=" rotate-90 text-3xl" />
                  </span>
                  <span className="text-3xl mx-4">-----</span>
                </div>
                <div className="flex space-x-6">
                  <div>
                    <span className="text-6xl">
                      <PiAirplaneLanding />
                    </span>
                  </div>
                  <div>
                    <span>{flight.arrivalAirport.airportName}</span>
                    <br />
                    <span className=" font-bold text-4xl">
                      {flight.arrivalAirport.airportCode}
                    </span>
                    <br />

                    <span>{flight.arrivalTime}</span>
                  </div>
                </div>
              </div>
            </a>
            // <li key={flight._id} className="border  p-4 rounded-xl">
            //   <a href={`/flightBooking/${flight._id}`}>
            //     <div className="text-3xl font-bold">Airline: {flight.flightNumber}</div>
            //     {/* <div>Price: {flight.price}</div> */}
            //     <div>
            //       Departure Airport: {}
            //     </div>
            //     <div>
            //       Arrival Airport: {flight.arrivalAirport.airportName}
            //     </div>
            //     <div>
            //       Departure Date:{" "}
            //       {new Date(flight.departureTime).toDateString()}
            //     </div>
            //     <div>Cabin Class: {flight.cabinClass}</div>
            //   </a>
            // </li>
          ))
        ) : (
          <li>No flights available</li>
        )}
      </div>
    </div>
  );
};

export default Flights;
