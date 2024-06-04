import Flight from "@/models/Flight";
import React from "react";
interface IAirport {
  _id: string;
  airportCode: string;
  airportName: string;
  location: string;
  __v: number;
}
interface IFlight {
  _id: string;
  flightNumber: string;
  departureAirport: IAirport;
  arrivalAirport: IAirport;
  departureTime: string;
  arrivalTime: string;
  aircraft: string;
  status: string;
  __v: number;
}

// Individual components now with types for their props
const FlightInfo: React.FC<{ flight: IFlight }> = ({ flight }) => (
  <div>
    <h2>Flight Information</h2>
    <p>Flight Number: {flight.flightNumber}</p>
    <p>
      Departure: {flight.departureAirport.airportName} (
      {flight.departureAirport.airportCode})
    </p>
    <p>
      Arrival: {flight.arrivalAirport.airportName} (
      {flight.arrivalAirport.airportCode})
    </p>
    <p>Departure Time: {new Date(flight.departureTime).toLocaleString()}</p>
    <p>Arrival Time: {new Date(flight.arrivalTime).toLocaleString()}</p>
  </div>
);
export default FlightInfo;
