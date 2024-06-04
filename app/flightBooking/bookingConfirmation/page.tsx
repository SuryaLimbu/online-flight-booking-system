"use client";
import ProgressBar from "@/app/components/flights/progressBar";
import { getCookie } from "@/utils/cookies";
import React, { useEffect, useState } from "react";
import {
  PiAirplaneTakeoff,
  PiAirplane,
  PiAirplaneLanding,
} from "react-icons/pi";

interface IPassenger {
  _id: string;
  fullName: string;
  gender: string;
  age: Date;
  passportNumber: string;
  emergencyContact: string;
}

interface ISeat {
  _id: string;
  seatName: string;
}

interface IAircraft {
  _id: string;
  aircraftRegisteredNumber: string;
  aircraftModel: string;
  capacity: string;
}

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

interface IBooking {
  _id: string;
  userId: string;
  seatId: ISeat[];
  aircraftId: IAircraft;
  passengers: IPassenger[];
  flightId: IFlight;
  totalPrice: number;
}

export default function Page() {
  const [bookingData, setBookingData] = useState<IBooking[]>([]);
  const userId = getCookie("userId");

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/userId/${userId}`
      );
      const data = await response.json();
      setBookingData(data);
    };
    fetchAPI();
  }, []);

  const totalPassengers = bookingData[0].passengers.length;

  const calculateDuration = (departureTime: string, arrivalTime: string) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const durationMs = arrival.getTime() - departure.getTime();

    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  return (
    <div>
      <ProgressBar progress={4} />

      <div className="flex-cols sm:flex gap-8">
        <div className="flex-cols w-full">
          <div className="bg-primary p-4 text-white rounded-t-xl">
            <span className="font-bold text-xl sm:text-3xl">
              Your flight is confirmed!
            </span>
          </div>
          {bookingData.map((booking) => (
            <div
              key={booking._id}
              className="space-y-4 p-4 border rounded-b-xl"
            >
              <div>
                <h1>Boarding Pass</h1>
                <h1>Booking Id: {booking._id}</h1>
              </div>
              <div className="space-y-4">
                {booking.flightId &&
                  booking.flightId.departureAirport &&
                  booking.flightId.arrivalAirport && (
                    <>
                      <div className="flex justify-between items-center">
                        <div>
                          <span>
                            {booking.flightId.departureAirport.location}
                          </span>
                          <br />
                          <span className="font-bold text-lg sm:text-2xl">
                            {booking.flightId.departureAirport.airportCode}
                          </span>
                          <br />
                          <span className="text-4xl">
                            <PiAirplaneTakeoff />
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-3xl mx-4">----</span>
                          <span>
                            <PiAirplane className="rotate-90 text-3xl" />
                          </span>
                          <span className="text-3xl mx-4">----</span>
                        </div>
                        <div>
                          <span>
                            {booking.flightId.arrivalAirport.location}
                          </span>
                          <br />
                          <span className="font-bold text-lg sm:text-2xl">
                            {booking.flightId.arrivalAirport.airportCode}
                          </span>
                          <br />
                          <span className="text-4xl">
                            <PiAirplaneLanding />
                          </span>
                        </div>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <div>
                          <span>Departure</span>
                          <br />
                          <span className="font-bold text-lg sm:text-2xl">
                            {new Date(
                              booking.flightId.departureTime
                            ).toLocaleTimeString()}
                          </span>
                        </div>
                        <div>
                          <span>Departure</span>
                          <br />
                          <span className="font-bold text-lg sm:text-2xl">
                            {calculateDuration(
                              booking.flightId.departureTime,
                              booking.flightId.arrivalTime
                            )}
                          </span>
                        </div>
                        <div>
                          <span>Arrival</span>
                          <br />
                          <span className="font-bold text-lg sm:text-2xl">
                            {new Date(
                              booking.flightId.arrivalTime
                            ).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <hr />
                      <div className="flex justify-between text-xl gap-4">
                        <div className="p-4 rounded-lg">
                          <h1>Seats</h1>
                          <span className="font-bold text-lg sm:text-2xl text-primary">
                            {booking.seatId
                              .map((seat) => seat.seatName)
                              .join(", ")}
                          </span>
                        </div>
                        <div className="p-4 rounded-lg">
                          <h1>Flight</h1>
                          <span className="font-bold text-lg sm:text-2xl text-primary">
                            {booking.flightId.flightNumber}
                          </span>
                        </div>
                        <div className="p-4 rounded-lg">
                          <h1>Class</h1>
                          <span className="font-bold text-lg sm:text-2xl text-primary">
                            Business
                          </span>
                        </div>
                      </div>
                    </>
                  )}
              </div>
              <hr />
              <div>
                <h1 className="uppercase text-xl sm:3xl font-semibold">
                  Passengers
                </h1>
                <ul className="py-4 space-y-4">
                  {booking.passengers.map((passenger) => (
                    <li key={passenger._id} className="flex items-center gap-4">
                      <span>
                        <img
                          src="https://ouch-cdn2.icons8.com/eyUNWPZEmRte7p4NSOi__4qJhNHdcFuK_voSKtydo6o/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvOTE4/LzUwZDEyY2MzLTA0/NDgtNGFkNS04M2Fj/LWY2NzNmYWYxOWFl/ZS5wbmc.png"
                          className="w-10"
                          alt="Passenger"
                        />
                      </span>
                      <span className="text-lg sm:text-xl text-primary">
                        {passenger.fullName}
                      </span>
                      <span className="text-lg sm:text-xl text-primary">
                        (
                        {passenger.gender.charAt(0).toUpperCase() +
                          passenger.gender.slice(1)}
                        )
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className="uppercase text-xl sm:3xl font-semibold">
                  Contact Details
                </h1>
              </div>
            </div>
          ))}
        </div>
        <div className="sm:w-2/4 space-y-4">
          <div className="border p-4 rounded-xl">
            <h1 className="font-semibold text-lg sm:text-2xl text-primary">
              Amount Paid
            </h1>
            <p className="flex justify-between">
              <span className="font-semibold">
                {totalPassengers} passengers
              </span>
              <span className="text-primary font-semibold">
                £ {bookingData[0].totalPrice}
              </span>
            </p>
            <p>includes taxes</p>
          </div>
          <div className="border p-4 rounded-xl">
            <h1 className="font-semibold text-lg sm:text-2xl text-primary">
              Airlines Contact
            </h1>
            <p>
              <span>+07887 XXXXXXXXX</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
