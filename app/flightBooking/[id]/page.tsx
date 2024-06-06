"use client";

import { Button, Select, SelectItem } from "@nextui-org/react";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AircraftSeating } from "./seatingPlan";
import { Seat } from "./seat";
import { PiRobotBold, PiSeatBold } from "react-icons/pi";

import { setCookie, setArrayCookie, getCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import ProgressBar from "@/app/components/flights/progressBar";

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

export default function Page() {
  const { id } = useParams() as { id: string };
  const [selectedSeats, setSelectedSeats] = useState<
    { rowNumber: number; position: string }[]
  >([]);
  const [seats, setSeats] = useState<SeatProps[]>([]);
  const [reservedSeats, setReservedSeats] = useState<[number, string][]>([]);
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [selectedClass, setSelectedClass] = useState<
    "all" | "first" | "business" | "economy"
  >("all");
  const [selectedSeatsTuples, setSelectedSeatsTuples] = useState<
    [number, string][]
  >([]);
  const [transformedNewselectedseats, setTransformedNewselectedseats] =
    useState<[number, string][]>([]);

  const [bookedSeats, setBookedSeats] = useState<string[] | string>();
  const [bookedSeatId, setBookedSeatId] = useState<any[]>([]);
  const userId = getCookie("userId");

  const maxSelectableSeats = 6;
  // const flightId = "6651b0cf6c6bc7b88e5df3de";

  const aircraft = new AircraftSeating(19, 1, 3, 4, 7, 8, 19, reservedSeats);

  // set flightId to cookie
  setCookie("flightId", id);

  // initialize router with useRouter
  const router = useRouter();

  useEffect(() => {
    const convertSeats = () => {
      const newSeatsArray: [number, string][] = selectedSeats.map((seat) => [
        seat.rowNumber,
        seat.position,
      ]);
      setSelectedSeatsTuples(newSeatsArray);
      setTransformedNewselectedseats(
        transformToTupleArray(selectedSeatsTuples)
      );

      console.log("transform data:", transformedNewselectedseats);
    };

    convertSeats();
  }, [selectedSeats]);

  function transformToTupleArray(
    data: (number | string)[][]
  ): [number, string][] {
    return data.map((item) => {
      if (
        item.length === 2 &&
        typeof item[0] === "number" &&
        typeof item[1] === "string"
      ) {
        return [item[0], item[1]] as [number, string];
      } else {
        throw new Error("Invalid structure");
      }
    });
  }

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
        const reservedSeats: [number, string][] = data
          .map((seatResponse) =>
            seatResponse.seatId.map(
              (seat) => [seat.rowNumber, seat.position] as [number, string]
            )
          )
          .flat();
        setReservedSeats(reservedSeats);
      } catch (error) {
        console.error("Error fetching reserved seats:", error);
      }
    };
    fetchSeats();
    fetchReservedSeats();
  }, []);

  useEffect(() => {}, []);

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

  const handleNumberOfPassengers = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNumberOfPassengers(Number(event.target.value));
  };

  const handleClassSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedClass(
      event.target.value as "all" | "first" | "business" | "economy"
    );
  };

  const generateSeats = (
    start: number,
    end: number,
    positions: string[],
    isFirstClass: boolean = false
  ) => {
    const rows = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return rows.map((rowNumber) => {
      const seatsInRow = seats.filter((seat) => seat.rowNumber === rowNumber);
      return (
        <div key={rowNumber} className="flex justify-center">
          <div className="flex">
            {positions.slice(0, positions.length / 2).map((position) => {
              const seat = seatsInRow.find((s) => s.position === position);
              const isSelected = selectedSeats.some(
                (selectedSeat) =>
                  selectedSeat.rowNumber === rowNumber &&
                  selectedSeat.position === position
              );
              const isDisabled =
                reservedSeats.some(
                  (reservedSeat) =>
                    reservedSeat[0] === rowNumber &&
                    reservedSeat[1] === position
                ) ||
                (!isFirstClass &&
                  numberOfPassengers === 1 &&
                  (position === "B" || position === "E")) ||
                (selectedClass !== "all" &&
                  selectedClass === "first" &&
                  rowNumber > 3) ||
                (selectedClass !== "all" &&
                  selectedClass === "business" &&
                  (rowNumber < 4 || rowNumber > 7)) ||
                (selectedClass !== "all" &&
                  selectedClass === "economy" &&
                  rowNumber < 8);

              return seat ? (
                <Seat
                  key={`${rowNumber}${position}`}
                  sectionId={seat.sectionId}
                  rowNumber={seat.rowNumber}
                  position={seat.position}
                  status={seat.status}
                  isSelected={isSelected}
                  isDisabled={isDisabled}
                  onSeatClick={handleSeatClick}
                />
              ) : (
                <div key={`${rowNumber}${position}`} className="h-20 w-20" />
              );
            })}
          </div>
          <div className="w-10" /> {/* Spacer between columns */}
          <div className="flex">
            {positions.slice(positions.length / 2).map((position) => {
              const seat = seatsInRow.find((s) => s.position === position);
              const isSelected = selectedSeats.some(
                (selectedSeat) =>
                  selectedSeat.rowNumber === rowNumber &&
                  selectedSeat.position === position
              );
              const isDisabled =
                reservedSeats.some(
                  (reservedSeat) =>
                    reservedSeat[0] === rowNumber &&
                    reservedSeat[1] === position
                ) ||
                (!isFirstClass &&
                  numberOfPassengers === 1 &&
                  (position === "B" || position === "E")) ||
                (selectedClass !== "all" &&
                  selectedClass === "first" &&
                  rowNumber > 3) ||
                (selectedClass !== "all" &&
                  selectedClass === "business" &&
                  (rowNumber < 4 || rowNumber > 7)) ||
                (selectedClass !== "all" &&
                  selectedClass === "economy" &&
                  rowNumber < 8);

              return seat ? (
                <Seat
                  key={`${rowNumber}${position}`}
                  sectionId={seat.sectionId}
                  rowNumber={seat.rowNumber}
                  position={seat.position}
                  status={seat.status}
                  isSelected={isSelected}
                  isDisabled={isDisabled}
                  onSeatClick={handleSeatClick}
                />
              ) : (
                <div key={`${rowNumber}${position}`} className="h-20 w-20" />
              );
            })}
          </div>
        </div>
      );
    });
  };

  const handleBooking = async () => {
    if (!userId) {
      alert("Please login to book seats");
      return router.push("/auth/login");
    }
    if (selectedSeats.length !== numberOfPassengers) {
      alert(
        `Please select exactly ${numberOfPassengers} seats before booking.`
      );
      return;
    }

    alert(
      `You have booked the following seats: ${selectedSeats
        .map((seat) => `${seat.rowNumber}${seat.position}`)
        .join(", ")}`
    );

    console.log("new selected seats:", JSON.stringify(selectedSeatsTuples));

    const resultingData: [number, string][] = selectedSeats.map(
      (seat) => [seat.rowNumber, seat.position] as [number, string]
    );
    // var bookingSeat = null;
    if (selectedSeatsTuples.length == 1) {
      const bookingSeat = aircraft.bookSeat(
        selectedSeatsTuples[0][0],
        selectedSeatsTuples[0][1]
      );
      if (bookingSeat) {
        setBookedSeats(bookingSeat);

        setArrayCookie("bookingSeat", bookingSeat);

        console.log("verified:", bookingSeat);
        router.push(`/flightBooking/payment`);
      }

      // bookingSeat.map(async (seats: any) => {
      //   // console.log("verified:",seats);
      //   try {
      //     const response = await fetch(
      //       `${process.env.NEXT_PUBLIC_API_URL}/seats/seatName/${seats}`
      //     );
      //     if (!response.ok) {
      //       throw new Error(`Error fetching seat: ${seats}`);
      //     }
      //     const data = await response.json();
      //     // return data;
      //     // console.log("verified results from api:", results);
      //     setBookedSeatId(data);
      //   } catch (error) {
      //     console.error("Error booking seats:", error);
      //   }
      // });
    } else {
      const bookingSeat = aircraft.bulkBookSeats(selectedSeatsTuples);
      console.log("bulk booking:", bookingSeat);
      if (
        bookingSeat &&
        window.confirm(`Auto booked seats: ${bookedSeatId.join(", ")}`)
      ) {
        setBookedSeats(bookingSeat);

        setArrayCookie("bookingSeat", bookingSeat);

        console.log("verified:", bookingSeat);
        router.push(`/flightBooking/payment`);
      }

      // bookingSeat.map(async (seats: any) => {
      //   // console.log("verified:",seats);
      //   try {
      //     const results = await Promise.all(
      //       bookingSeat.map(async (seat: any) => {
      //         const response = await fetch(
      //           `${process.env.NEXT_PUBLIC_API_URL}/seats/seatName/${seat}`
      //         );
      //         if (!response.ok) {
      //           throw new Error(`Error fetching seat: ${seat}`);
      //         }
      //         const data = await response.json();
      //         return data;
      //       })
      //     );
      //     // console.log("verified results from api:", results);
      //     setBookedSeatId(results);
      //   } catch (error) {
      //     console.error("Error booking seats:", error);
      //   }
      // });
    }
    console.log("booking seats in sate:", bookedSeats);
    // console.log("verified booked seats from algorithm:", bookedSeats);

    console.log("verified booked seats:", bookedSeatId);

    // Flatten the bookedSeatId array
    // const flattenedSeats = bookedSeatId.flat();

    // Create the seatIds array
    // const seatIds = flattenedSeats.map((seat) => seat._id);
    // console.log("verified seat ids:", seatIds);

    // Calculate the total price
    // var totalPrice = 0;
    // const child = 0;
    // flattenedSeats.forEach((seat) => {
    //   if (child > 0) {
    //     totalPrice +=
    //       seat.sectionId.pricePerSeat - seat.sectionId.pricePerSeat * 0.25;
    //   } else {
    //     totalPrice += seat.sectionId.pricePerSeat;
    //   }
    // });
    // console.log("verified total price:", totalPrice);

    // Create the data object to store in the database
    // const data = {
    //   flightId: id,
    //   userId: "6651b0cf6c6bc7b88e5df3de",
    //   seatId: seatIds,
    //   totalPrice: totalPrice,
    //   passengerId: "6651b0cf6c6bc7b88e5df3de",
    //   aircraftId: "6651b0cf6c6bc7b88e5df3de",
    // };
    // console.log("verified data for store in database:", data);

    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Booking failed");
    //   }

    //   const result = await response.json();
    //   console.log("Success:", result);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const handleAutoBooking = async () => {
    if (!userId) {
      alert("Please login to book seats");
      return router.push("/auth/login");
    }
    if (numberOfPassengers > 0) {
      const autoBookedSeats: any[] = aircraft.autoBookSeats(
        numberOfPassengers,
        selectedClass === "all" ? "economy" : selectedClass
      );

      if (
        autoBookedSeats &&
        window.confirm(`Auto booked seats: ${autoBookedSeats.join(", ")}`)
      ) {
        setBookedSeats(autoBookedSeats);
        setArrayCookie("bookingSeat", autoBookedSeats);

        console.log("verified:", autoBookedSeats);
        router.push(`/flightBooking/payment`);
      }
    } else {
      alert("Please select the number of passengers");
    }
  };

  return (
    <div>
      <ProgressBar progress={2} />
      <div className="flex gap-4">
        <Select
          id="number-of-passengers"
          value={numberOfPassengers}
          onChange={handleNumberOfPassengers}
          label="Number of Passengers"
          isRequired={true}
        >
          <SelectItem value={1} key={1}>
            1
          </SelectItem>
          <SelectItem value={2} key={2}>
            2
          </SelectItem>
          <SelectItem value={3} key={3}>
            3
          </SelectItem>
          <SelectItem value={4} key={4}>
            4
          </SelectItem>
          <SelectItem value={5} key={5}>
            5
          </SelectItem>
          <SelectItem value={6} key={6}>
            6
          </SelectItem>
        </Select>
        <Select
          id="class-selection"
          value={selectedClass}
          onChange={handleClassSelection}
          label="Class"
          isRequired={true}
        >
          <SelectItem value={"all"} key={"all"}>
            All Classes
          </SelectItem>
          <SelectItem value={"first"} key={"first"}>
            First Class
          </SelectItem>
          <SelectItem value={"business"} key={"business"}>
            Business Class
          </SelectItem>
          <SelectItem value={"economy"} key={"economy"}>
            Economy Class
          </SelectItem>
        </Select>
      </div>
      <div>
        {(selectedClass === "all" || selectedClass === "first") && (
          <div>
            <h1 className="text-4xl font-extrabold text-center py-10 text-primary">
              First Class
            </h1>
            <div>{generateSeats(1, 3, ["A", "B", "C", "D"], true)}</div>
          </div>
        )}
        {(selectedClass === "all" || selectedClass === "business") && (
          <div>
            <h1 className="text-4xl font-extrabold text-center py-10 text-primary">
              Business Class
            </h1>
            <div>{generateSeats(4, 7, ["A", "B", "C", "D", "E", "F"])}</div>
          </div>
        )}
        {(selectedClass === "all" || selectedClass === "economy") && (
          <div>
            <h1 className="text-4xl font-extrabold text-center py-10 text-primary">
              Economy Class
            </h1>
            <div>{generateSeats(8, 19, ["A", "B", "C", "D", "E", "F"])}</div>
          </div>
        )}
      </div>
      <div>
        <Button
          onClick={handleAutoBooking}
          color="secondary"
          size="lg"
          className="text-white fixed z-50 bottom-20 right-5 font-semibold"
          startContent={<PiRobotBold />}
        >
          Auto Book Now
        </Button>
      </div>
      <div>
        <Button
          onClick={handleBooking}
          color="primary"
          size="lg"
          className="text-white fixed z-50 bottom-5 right-5 font-semibold"
          startContent={<PiSeatBold />}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
