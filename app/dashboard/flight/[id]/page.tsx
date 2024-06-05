"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { getCookie } from "@/utils/cookies";
import { PiLock } from "react-icons/pi";

interface IPassenger {
  fullName: string;
  gender: string;
  age: Date;
  passportNumber: string;
  emergencyContact: string;
}

interface ISeat {
  _id: string;
  sectionId: string;
  rowNumber: number;
  position: string;
  seatName: string;
  status: string;
  price: number; // Assuming price is a property of ISeat
}

interface IBooking {
  _id: string;
  userId: string;
  seatId: ISeat[] | any[];
  aircraftId: string | any;
  passengers: IPassenger[];
  flightId: string;
  totalPrice: number;
  status: string;
}
interface IFlight {
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: Date;
  arrivalTime: Date;
  aircraft: string;
  status: string;
}

const Page: React.FC = () => {
  const [data, setData] = useState<IBooking[]>([]);
  const [seatData, setSeatData] = useState<ISeat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[] | any[]>([]);
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [flightData, setFlightData] = useState<any>({});
  const [aircraftId, setAircraftId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/flightId/${id}`
      );
      const data: IBooking[] = await res.json();
      setData(data);
    };

    const fetchFlightData = async () => {
      // Fetch flight data
      const flightRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/flights/${id}`
      );
      const flightData = await flightRes.json();

      // Check if flight data contains the aircraft object
      if (flightData && flightData.aircraft && flightData.aircraft._id) {
        setAircraftId(flightData.aircraft._id);
        setFlightData(flightData);
      } else {
        console.error("Aircraft data is not available in the expected format");
      }
    };

    fetchFlightData();
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchSeatData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seats`);
      const seatData: ISeat[] = await res.json();
      setSeatData(seatData);
    };
    fetchSeatData();
  }, [id]);
  console.log(flightData);

  const handleEditClick = async (item: IBooking) => {
    // console.log(item);
    // Add your logic to handle edit here
    const currentTime = new Date();
    const departureTime = new Date(flightData.departureTime);
    const timeDifference =
      (departureTime.getTime() - currentTime.getTime()) / (1000 * 3600);

    if (timeDifference > 72) {
      if (window.confirm("Are you sure you want to release this seat?")) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings/${item._id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setData((prevData) =>
            prevData.filter((booking) => booking._id !== item._id)
          );
          window.alert("Booking canceled successfully!");
        } else {
          window.alert("Failed to cancel booking!");
        }
      }
    } else {
      window.alert("Cannot cancel booking within 72 hours of departure.");
    }
  };

  const handleUnlockClick = async (item: IBooking) => {
    // console.log(item);

    // Add your logic to unlock the seat here

    if (window.confirm("Are you sure you want to release this seats?")) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${item._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // setRefresh(true);
        setData((prevData) =>
          prevData.filter((booking) => booking._id !== item._id)
        );
        window.alert("Aircrat data deleted successfully!");
      } else {
        window.alert("Failed to delete aircraft data!");
      }
    }
  };

  const handleSeatSelection = (selectedKeys: string[]) => {
    setSelectedSeats(selectedKeys);
  };

  const handleLockSeatsInModal = async () => {
    try {
      const newBooking: Partial<IBooking> = {
        userId: getCookie("userId"), // Replace with actual user ID
        seatId: selectedSeats,
        flightId: id,
        totalPrice: 0, // Set actual total price
        status: "lock", // Set status
        passengers: [], // Add passenger details if available
        aircraftId: aircraftId || "", // Set actual aircraft ID
      };
      console.log(newBooking);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooking),
      });

      if (res.ok) {
        const updatedBooking = await res.json();
        setData((prevData) => [...prevData, updatedBooking]);
        onClose();
        window.alert("Seat Locked successfully!");
      } else {
        console.error("Failed to lock seats");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Get booked seats from booking data
  const bookedSeats = data.flatMap((booking) =>
    booking.seatId.map((seat) => seat._id)
  );

  return (
    <div className="flex-col space-y-4">
      <div>
        <h2>Lock Seat</h2>
        <Button
          onPress={onOpen}
          className="text-white"
          color="primary"
          startContent={<PiLock />}
        >
          Lock Seat
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onCloseModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Seats to Lock
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-10 gap-4">
                  {seatData.map((seat) => (
                    <div
                      key={seat.seatName}
                      className={`p-2 border rounded cursor-pointer ${
                        bookedSeats.includes(seat._id)
                          ? "bg-gray-200 cursor-not-allowed"
                          : selectedSeats.includes(seat._id)
                          ? "bg-blue-200"
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        if (!bookedSeats.includes(seat._id)) {
                          setSelectedSeats((prevSelected) =>
                            prevSelected.includes(seat._id)
                              ? prevSelected.filter((_id) => _id !== seat._id)
                              : [...prevSelected, seat._id]
                          );
                        }
                      }}
                    >
                      {seat.seatName}
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onCloseModal}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleLockSeatsInModal}
                  className="text-white"
                  startContent={<PiLock />}
                >
                  Lock Seats
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div>
        <h2>List of Bookings</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seat Number
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((booking) => (
              <tr key={booking.flightId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.seatId
                    .map((seat: ISeat) => seat.seatName)
                    .join(", ")}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.totalPrice == 0 ? "locked" : "booked"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {booking.totalPrice == 0 ? (
                    <a
                      onClick={() => handleUnlockClick(booking)}
                      className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    >
                      unlock
                    </a>
                  ) : (
                    <a
                      onClick={() => handleEditClick(booking)}
                      className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    >
                      Cancel Booking
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
