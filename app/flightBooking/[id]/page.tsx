"use client";

import { Button } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { AircraftSeating } from "./seatingPlan";
import {AircraftSeating} from "./temp";

interface SeatProps {
  sectionId: string;
  rowNumber: number;
  position: string;
  status: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSeatClick: (rowNumber: number, position: string) => void;
}

interface Seat {
  rowNumber: number;
  position: string;
}

interface SeatResponse {
  seatId: {
    _id: string;
    rowNumber: number;
    position: string;
    status: string;
    __v: number;
  }[];
  _id: string;
}

export function Seat({
  rowNumber,
  position,
  status,
  isSelected,
  isDisabled,
  onSeatClick,
}: SeatProps) {
  const seatClass = `h-20 w-20 text-center flex justify-center items-center text-white rounded-lg cursor-pointer ${
    isSelected
      ? "bg-blue-500"
      : status === "reserved" || isDisabled
      ? "bg-red-500 cursor-not-allowed"
      : "bg-green-500"
  }`;

  return (
    <div
      onClick={() => !isDisabled && onSeatClick(rowNumber, position)}
      className={seatClass}
    >
      {rowNumber}
      {position}
      <br />
      {status}
    </div>
  );
}

export default function Page() {
  const { id } = useParams() as { id: string };
  const [selectedSeats, setSelectedSeats] = useState<
    { rowNumber: number; position: string }[]
  >([]);
  const [seats, setSeats] = useState<SeatProps[]>([]);
  const [reservedSeats, setReservedSeats] = useState<Seat[]>([]);
  const maxSelectableSeats = 6;
  const flightId = "6651b0cf6c6bc7b88e5df3de";
  
  const aircraft = new AircraftSeating(19);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/seats`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch seats");
        }
        const data: SeatProps[] = await response.json();
        setSeats(data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    const fetchReservedSeats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings/reserve-seats/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reserved seats");
        }
        const data: SeatResponse[] = await response.json();
        const reservedSeats: Seat[] = data
          .map((seatResponse) =>
            seatResponse.seatId.map((seat) => ({
              rowNumber: seat.rowNumber,
              position: seat.position,
            }))
          )
          .flat();
        setReservedSeats(reservedSeats);
      } catch (error) {
        console.error("Error fetching reserved seats:", error);
      }
    };

    fetchSeats();
    fetchReservedSeats();
  }, [id]);

  const handleSeatClick = (rowNumber: number, position: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      const seatIndex = prevSelectedSeats.findIndex(
        (seat) => seat.rowNumber === rowNumber && seat.position === position
      );

      if (seatIndex !== -1) {
        return prevSelectedSeats.filter((_, index) => index !== seatIndex);
      } else if (prevSelectedSeats.length < maxSelectableSeats) {
        return [...prevSelectedSeats, { rowNumber, position }];
      } else {
        return prevSelectedSeats;
      }
    });
  };

  const generateSeats = (start: number, end: number, positions: number) => {
    return seats
      .filter((seat) => seat.rowNumber >= start && seat.rowNumber <= end)
      .map((seat) => {
        const isSelected = selectedSeats.some(
          (selectedSeat) =>
            selectedSeat.rowNumber === seat.rowNumber &&
            selectedSeat.position === seat.position
        );

        const isDisabled = reservedSeats.some(
          (reservedSeat) =>
            reservedSeat.rowNumber === seat.rowNumber &&
            reservedSeat.position === seat.position
        );

        return (
          <Seat
            key={`${seat.rowNumber}${seat.position}`}
            sectionId={seat.sectionId}
            rowNumber={seat.rowNumber}
            position={seat.position}
            status={seat.status}
            isSelected={isSelected}
            isDisabled={isDisabled}
            onSeatClick={handleSeatClick}
          />
        );
      });
  };

  function transformSelectedSeats(seats: Seat[]): [number, string][] {
    const sts = seats.map(
      (seat) => [seat.rowNumber, seat.position] as [number, string]
    );
    return sts;
  }

  const handleBooking = async () => {
    alert(
      `You have booked the following seats: ${selectedSeats
        .map((seat) => `${seat.rowNumber}${seat.position}`)
        .join(", ")}`
    );
    // const  = new AircraftSeating(20);
    const resultingData:[number,string][] = transformSelectedSeats(selectedSeats);
    console.log("selected seat:", resultingData);
    selectedSeats.map((seat) => {
      console.log(`${seat.rowNumber}${seat.position}`);

    });
    resultingData.forEach((seat) => {
      const [rowNumber, position] = seat;
      console.log(`${rowNumber}${position}`);
      const bookingSeat = aircraft.bookSeat(rowNumber, position)
      console.log("verified:",bookingSeat);
    })
    // const bulkSeats = aircraft.bookSeat(resultingData);
    // console.log("verified:",bulkSeats);

    const data = {
      flightId: id,
      userId: "6651b0cf6c6bc7b88e5df3de",
      seatIds: selectedSeats.map((seat) => `${seat.rowNumber}${seat.position}`),
      totalPrice: selectedSeats.length * 1000,
      passengerId: "6651b0cf6c6bc7b88e5df3de",
      aircraftId: "6651b0cf6c6bc7b88e5df3de",
    };

    // try {
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (!response.ok) {
    //     throwNumber new Error("Booking failed");
    //   }

    //   const result = await response.json();
    //   console.log("Success:", result);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <div>
      <div>
        <h1>Aircraft</h1>
        <h2>Aircraft ID: {id}</h2>
      </div>
      <div>
        <div>
          <h1 className="text-4xl font-extrabold text-center py-10 text-primary">
            First Class
          </h1>
          <div className="grid grid-cols-4 gap-2">{generateSeats(1, 3, 4)}</div>
        </div>
        <hr className="my-10" />
        <div>
          <h1 className="text-4xl font-extrabold text-center py-10 text-primary">
            Business Class
          </h1>
          <div className="grid grid-cols-6 gap-2">{generateSeats(4, 7, 6)}</div>
        </div>
        <hr className="my-10" />
        <div>
          <h1 className="text-4xl font-extrabold text-center py-10 text-primary">
            Economy Class
          </h1>
          <div className="grid grid-cols-6 gap-2">
            {generateSeats(8, 19, 6)}
          </div>
        </div>
      </div>
      <div>
        <Button
          onClick={handleBooking}
          color="primary"
          size="lg"
          className="text-white fixed z-50 bottom-5 right-5 font-bold"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
