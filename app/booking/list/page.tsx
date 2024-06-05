"use client";
import { getCookie } from "@/utils/cookies";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  PiAirplaneTakeoff,
  PiAirplane,
  PiAirplaneLanding,
  PiEye,
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
export default function page() {
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
  }, [userId]);

  if (!bookingData.length) {
    return <div>Loading...</div>;
  }
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
      <div className="py-4 text-center uppercase">
        <h1 className=" text-lg sm:text-3xl text-primary font-bold">
          list of bookings
        </h1>
      </div>
      <div>
        <div>
          {bookingData.map((booking) => (
            <div key={booking._id} className="space-y-4 p-4 border rounded-xl">
              {/* <div>
                <h1>Boarding Pass</h1>
                <h1>Booking Id: {booking._id}</h1>
              </div> */}
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
                          <span>Duration</span>
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
                      <div className="text-center">
                        <a href={`/booking/${booking._id}`}>
                          <Button
                            color="success"
                            size="md"
                            className="text-white w-full"
                          >
                            <PiEye /> View
                          </Button>
                        </a>
                      </div>
                    </>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
