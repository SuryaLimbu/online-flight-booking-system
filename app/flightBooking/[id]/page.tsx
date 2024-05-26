"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";

// Component to render each seat
interface SeatProps {
  name: string;
  seatColor: string;
  status: string;
  isSelected: boolean;
  onSeatClick: (seatName: string) => void;
}

export function Seat({
  name,
  seatColor,
  status,
  isSelected,
  onSeatClick,
}: SeatProps) {
  const seatClass = `h-20 w-20 text-center flex justify-center items-center text-white rounded-lg cursor-pointer ${
    isSelected ? "bg-blue-500":status === "reserved" ? "bg-red-500" : `bg-green-500`
  }`;

  return (
    <div onClick={() => onSeatClick(name)} className={seatClass}>
      {name}
      <br />
      {status}
    </div>
  );
}

// Main page component
export default function Page() {
  const { id } = useParams() as { id: string };
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const maxSelectableSeats = 6;

  const handleSeatClick = (seatName: string) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatName)) {
        // Deselect seat if already selected
        return prevSelectedSeats.filter((seat) => seat !== seatName);
      } else if (prevSelectedSeats.length < maxSelectableSeats) {
        // Select seat if not already selected and limit not reached
        return [...prevSelectedSeats, seatName];
      } else {
        // Otherwise, keep the previous state (limit reached)
        return prevSelectedSeats;
      }
    });
  };
  console.log("selectedSeats:", selectedSeats);

  // Function to generate seat labels
  const generateSeats = (
    start: number,
    end: number,
    label: number,
    color: string,
    reservedSeats: string[] = []
  ) => {
    const seats = [];
    const seatColor = color;

    for (let i = start; i <= end; i++) {
      for (let j = 0; j < label; j++) {
        const seatLabel = `${i}${String.fromCharCode(65 + j)}`;
        const isReserved = reservedSeats.includes(seatLabel);
        const status = isReserved ? "reserved" : "available";
        const noop = () => {}; // No operation function

        seats.push(
          <Seat
            key={seatLabel}
            name={seatLabel}
            seatColor={seatColor}
            status={status}
            isSelected={selectedSeats.includes(seatLabel)}
            onSeatClick={isReserved ? noop : handleSeatClick}
          />
        );
      }
    }

    return seats;
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
          <div className="grid grid-cols-4 gap-2">
            {generateSeats(1, 3, 4, "blue", ["1A", "1B", "1C", "1D", "1E"])}
          </div>
        </div>
        <hr className="my-10"/>
        <div>
          <h1 className="text-4xl font-extrabold text-center py-10 text-primary">
            Business Class
          </h1>
          <div className="grid grid-cols-6 gap-2">
            {generateSeats(4, 7, 6, "orange")}
          </div>
        </div>
        <hr className="my-10"/>
        <div>
          <h1 className="text-4xl font-extrabold text-center py-10 text-primary">
            Economy Class
          </h1>
          <div className="grid grid-cols-6 gap-2">
            {generateSeats(8, 19, 6, "teal")}
          </div>
        </div>
      </div>
    </div>
  );
}
