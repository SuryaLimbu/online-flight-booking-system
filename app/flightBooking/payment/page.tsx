"use client";
import { useState, useEffect } from "react";
import { setArrayCookie, getArrayCookie, getCookie } from "@/utils/cookies";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import {
  PiAirplane,
  PiAirplaneLanding,
  PiAirplaneTakeoff,
  PiTicket,
  PiX,
} from "react-icons/pi";
import { redirect } from "next/navigation";
import ProgressBar from "@/app/components/flights/progressBar";

interface IPassenger {
  fullName: string;
  gender: string;
  age: Date;
  passportNumber: string;
  emergencyContact: string;
}
interface ITotalPrice {
  passengerType: string;
  price: number;
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

export default function Page() {
  const [passengerList, setPassengerList] = useState<IPassenger[] | any[]>([]);
  const [formCount, setFormCount] = useState(1);
  const [bookingSeats, setBookingsSeats] = useState<string[]>([]);
  const [totalPassengers, setTotalPassengers] = useState<number>(0);
  const [passenger, setPassenger] = useState<Partial<IPassenger>>({
    fullName: "",
    gender: "",
    age: new Date(),
    passportNumber: "",
    emergencyContact: "",
  });

  const [bookedSeatId, setBookedSeatId] = useState<any[]>([]);
  const [ageList, setAgeList] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState<ITotalPrice[] | any[]>([]);

  const flightId = getCookie("flightId");
  const [flightData, setFlightData] = useState<IFlight | null>(null);

  useEffect(() => {
    const bookingSeats = getArrayCookie("bookingSeat");
    console.log(`Stored data on mount:`, bookingSeats);
    if (bookingSeats) {
      setBookingsSeats(bookingSeats);
      setTotalPassengers(bookingSeats.length);
    }

    if (bookingSeats && bookingSeats.length > 0) {
      (async () => {
        try {
          const results = await Promise.all(
            bookingSeats.map(async (seat: string) => {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/seats/seatName/${seat}`
              );
              if (!response.ok) {
                throw new Error(`Error fetching seat: ${seat}`);
              }
              return await response.json();
            })
          );
          setBookedSeatId(results);
        } catch (error) {
          console.error("Error booking seats:", error);
        }
      })();
    }
    const fetchFlightData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/flights/${flightId}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching flight: ${flightId}`);
      }
      const data = await response.json();
      setFlightData(data);
    };
    fetchFlightData();
  }, []);

  // console.log("flightData:", flightData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPassenger((prev) => ({
      ...prev,
      [name]: name === "age" ? new Date(value) : value,
    }));
  };

  const handlePassengerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassengerList((prev) => [
      ...prev,
      { ...passenger, bookingId: `BID${formCount}` } as IPassenger,
    ]);
    setFormCount((prev) => prev + 1);
    setPassenger({
      fullName: "",
      gender: "",
      age: new Date(),
      passportNumber: "",
      emergencyContact: "",
    });
    const currentDate: any = new Date();
    if (passenger.age) {
      const ageDiff = currentDate.getTime() - passenger.age.getTime();
      const age = Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
      setAgeList((prev) => [...prev, age]);

      const newPrice =
        age > 15
          ? bookedSeatId[formCount - 1][0].sectionId.pricePerSeat
          : bookedSeatId[formCount - 1][0].sectionId.pricePerSeat * 0.75;

      const newPassengerType = age > 15 ? "adult" : "child";
      setTotalPrice((prev) => [
        ...prev,
        { passengerType: newPassengerType, price: newPrice },
      ]);
    }
  };
  // console.log(bookedSeatId);
  // console.log(bookedSeatId[2][0].sectionId.pricePerSeat);

  // console.log("Passenger age:", ageList);
  // console.log("Total price:", totalPrice);
  const handlePassengerRemove = (index: number) => {
    setPassengerList((prev) => prev.filter((_, i) => i !== index));
    setFormCount((prev) => prev - 1);

    setAgeList((prev) => prev.filter((_, i) => i !== index));
    setTotalPrice((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMakePayment = async () => {
    // Flatten the bookedSeatId array
    const flattenedSeats = bookedSeatId.flat();

    // Create the seatIds array
    const seatIds = flattenedSeats.map((seat) => seat._id);

    const grandTotalPrice = totalPrice.reduce((a, b) => a + b.price, 0);

    // Create the data object to store in the database
    const data = {
      flightId: flightId,
      userId: getCookie("userId"),
      seatId: seatIds,
      totalPrice: grandTotalPrice,
      passengers: passengerList,
      aircraftId: flightData?.aircraft,
    };
    console.log("verified data for store in database:", data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error response from server:", errorResponse);
        throw new Error("Booking failed");
      }
      const result = await response.json();
      if (result) {
        // console.log("Success:", result);
        redirect("/flightBooking/bookingConfirmation");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      <ProgressBar progress={3} />
      <div className="flex-cols sm:flex space-y-6 sm:gap-6 sm:space-y-0   justify-between">
        <div className="w-full space-y-6 border rounded-xl p-6">
          <div>
            <h1 className="text-2xl font-bold">Your flight summary</h1>
          </div>
          <div className="flex-rows w-max-full text-primary space-y-4">
            {flightData && (
              <>
                <div className="flex justify-between items-center">
                  <div className="">
                    <span>{flightData.departureAirport.airportName}</span>
                    <br />
                    <span className="font-bold text-2xl">
                      {flightData.departureAirport.airportCode}
                    </span>
                    <br />
                    <span className="text-4xl">
                      <PiAirplaneTakeoff />
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-3xl mx-4">-----</span>
                    <span>
                      <PiAirplane className="rotate-90 text-3xl" />
                    </span>
                    <span className="text-3xl mx-4">-----</span>
                  </div>
                  <div>
                    <span>{flightData.arrivalAirport.airportName}</span>
                    <br />
                    <span className="font-bold text-2xl">
                      {flightData.arrivalAirport.airportCode}
                    </span>
                    <br />
                    <span className="text-4xl">
                      <PiAirplaneLanding />
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <span>Departure</span>
                    <br />
                    <span className="font-bold text-2xl">
                      {new Date(flightData.departureTime).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span>Duration</span>
                    <br />
                    <span className="font-bold text-2xl">
                      {calculateDuration(
                        flightData.departureTime,
                        flightData.arrivalTime
                      )}{" "}
                    </span>
                  </div>
                  <div>
                    <span>Arrival</span>
                    <br />
                    <span className="font-bold text-2xl">
                      {new Date(flightData.arrivalTime).toDateString()}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
          <hr />
          <div className="flex justify-between text-xl gap-4">
            <div className=" p-4 rounded-lg">
              <h1>Seats</h1>
              <span className="font-bold text-2xl text-primary">
                {bookingSeats.join(", ")}
              </span>
            </div>
            <div className=" p-4 rounded-lg">
              <h1>Flight</h1>
              <span className="font-bold text-2xl text-primary">TPJ40</span>
            </div>
            <div className=" p-4 rounded-lg">
              <h1>Class</h1>
              <span className="font-bold text-2xl text-primary">Business</span>
            </div>
          </div>
          <hr />
          <div>
            <div>
              <h1 className="text-2xl font-bold">Passenger Details</h1>
              <div className="flex-rows w-max-full text-primary space-y-4 py-8">
                <div className="flex justify-between items-center">
                  {formCount <= totalPassengers && (
                    <form
                      onSubmit={handlePassengerSubmit}
                      className="w-full space-y-4"
                    >
                      <span>Passenger {formCount}</span>
                      <Input
                        type="text"
                        placeholder="Passenger Name"
                        label="Passenger Name"
                        name="fullName"
                        value={passenger.fullName || ""}
                        onChange={handleInputChange}
                      />
                      <div className="flex gap-4">
                        <Select
                          label="Passenger gender"
                          name="gender"
                          placeholder="Passenger gender"
                          value={passenger.gender || ""}
                          onChange={handleInputChange}
                        >
                          <SelectItem value="male" key={`male`}>
                            Male
                          </SelectItem>
                          <SelectItem value="female" key={`female`}>
                            Female
                          </SelectItem>
                          <SelectItem value="other" key={`other`}>
                            Other
                          </SelectItem>
                        </Select>
                        <Input
                          type="date"
                          placeholder="Age"
                          name="age"
                          value={
                            passenger.age
                              ? passenger.age.toISOString().split("T")[0]
                              : ""
                          }
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex gap-4">
                        <Input
                          type="text"
                          label="Passenger passport Number"
                          name="passportNumber"
                          placeholder="Passport Number"
                          value={passenger.passportNumber || ""}
                          onChange={handleInputChange}
                        />
                        <Input
                          type="text"
                          label="Emergency Contact"
                          name="emergencyContact"
                          placeholder="Emergency Contact"
                          value={passenger.emergencyContact || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        color="primary"
                        className="text-white w-full"
                      >
                        Add
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">Passenger List</h2>
              {passengerList.map((passenger, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg my-2 flex justify-between items-center"
                >
                  <div>
                    <p>Name: {passenger.fullName}</p>
                    <p>Gender: {passenger.gender}</p>
                    <p>Age: {new Date(passenger.age).toLocaleDateString()}</p>
                    <p>Passport Number: {passenger.passportNumber}</p>
                    <p>Emergency Contact: {passenger.emergencyContact}</p>
                  </div>
                  <Button
                    color="danger"
                    onClick={() => handlePassengerRemove(index)}
                    startContent={<PiX />}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border rounded-xl p-6 space-y-4 w-full sm:w-2/4">
          <h1 className="text-2xl font-bold">Flight Fare</h1>
          <div>
            <h1>Your discount voucher:</h1>
            <Input type="text" placeholder="Discount Code" name="discount" />
          </div>
          <div className="space-y-4">
            {totalPrice.map((price, index) => (
              <div key={index} className="flex justify-between">
                <span>
                  <h1 className="font-semibold">
                    Passenger {index + 1} ({price.passengerType})
                  </h1>
                  <p>included taxes</p>
                </span>
                <span className="font-semibold">£ {price.price}</span>
              </div>
            ))}
          </div>
          <hr />
          <div>
            <div className="flex justify-between">
              <span>
                <h1 className="font-semibold">Total</h1>
                <p>included taxes</p>
              </span>
              <span className="font-semibold">
                £ {totalPrice.reduce((a, b) => a + b.price, 0)}
              </span>
            </div>
          </div>
          <div>
            <Button
              color="success"
              className="w-full text-white font-semibold text-lg"
              size="lg"
              startContent={<PiTicket />}
              onClick={handleMakePayment}
            >
              Make Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
