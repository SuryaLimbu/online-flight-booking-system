"use client";

import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define the type for flight data
interface Flight {
  id: number;
  airline: string;
  price: number;
}

// Define the type for the query parameters
interface FlightQueryParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  cabinClass: string;
  totalTravelers: string;
}

const Flights = () => {
  //   const router = useRouter();
  //   const query = useSearchParams(query)
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departureDate = searchParams.get("departureDate");
  const cabinClass = searchParams.get("cabinClass");
  const totalTravelers = searchParams.get("totalTravelers");
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {

    fetch(
      `/api/flights?from=${from}&to=${to}&departureDate=${departureDate}&cabinClass=${cabinClass}&totalTravelers=${totalTravelers}`
    )
      .then((response) => response.json())
      .then((data) => setFlights(data));
  }, [from, to, departureDate, cabinClass, totalTravelers]);

  

  return (
    <div>
      <h1>Available Flights</h1>
      <ul>
        {flights.map(flight => (
          <li key={flight.id}>
            {flight.airline} - ${flight.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
