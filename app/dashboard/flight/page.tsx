"use client";
import {
  Input,
  Button,
  Select,
  SelectItem,
  DatePicker,
} from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { PiEye } from "react-icons/pi";

interface IFlight {
  _id: string;
  flightNumber: string;
  departureAirport: IAirport;
  arrivalAirport: IAirport;
  departureTime: string;
  arrivalTime: string;
  aircraft: IAircraft;
  status: string;
}

interface IAirport {
  _id: string;
  airportCode: string;
  airportName: string;
  location: string;
}

interface IAircraft {
  _id: string;
  aircraftRegisteredNumber: string;
  aircraftModel: string;
  capacity: string;
}

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [flights, setFlights] = useState<IFlight[]>([]);
  const [id, setId] = useState("");
  const [airports, setAirports] = useState<IAirport[]>([]);
  const [aircrafts, setAircrafts] = useState<IAircraft[]>([]);
  const [formValues, setFormValues] = useState({
    flightNumber: "",
    departureAirport: "",
    arrivalAirport: "",
    departureTime: "",
    arrivalTime: "",
    aircraft: "",
    status: "",
  });

  const flightStatus = [
    { value: "On Time", label: "On Time" },
    { value: "Off Time", label: "Off Time" },
    { value: "Delayed", label: "Delayed" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Diverted", label: "Diverted" },
    { value: "Landed", label: "Landed" },
    { value: "Departed", label: "Departed" },
    { value: "Scheduled", label: "Scheduled" },
    { value: "Unknown", label: "Unknown" },
  ];

  useEffect(() => {
    const fetchAirports = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/airports`
      );
      const data = await response.json();
      setAirports(data);
    };

    const fetchAircraft = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/aircrafts`
      );
      const data = await response.json();
      setAircrafts(data);
    };

    const fetchFlights = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/flights`
      );
      const data = await response.json();
      setFlights(data);
    };

    fetchFlights();
    fetchAircraft();
    fetchAirports();
    setRefresh(false);
  }, [refresh]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formSubmit", formValues);
    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/flights/${id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/flights`;

    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const data = await response.json();
    console.log(data);
    setRefresh(true);
    setIsEditing(false);
    setFormValues({
      flightNumber: "",
      departureAirport: "",
      arrivalAirport: "",
      departureTime: "",
      arrivalTime: "",
      aircraft: "",
      status: "",
    });

    window.alert(
      isEditing ? "Flight updated successfully!" : "Flight added successfully!"
    );
  };

  const handleEditClick = (flight: IFlight) => {
    setIsEditing(true);
    setId(flight._id);
    setFormValues({
      flightNumber: flight.flightNumber,
      departureAirport: flight.departureAirport._id,
      arrivalAirport: flight.arrivalAirport._id,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      aircraft: flight.aircraft._id,
      status: flight.status,
    });
  };

  const handleDeleteClick = async (flightId: string) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/flights/${flightId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRefresh(true);
        window.alert("Flight deleted successfully!");
      } else {
        window.alert("Failed to delete flight!");
      }
    }
  };

  return (
    <>
      <div className="py-4 w-min-full">
        <h1 className="font-semibold text-xl py-4">
          {isEditing ? "Edit Flight" : "Add New Flight"}
        </h1>
        <form
          className="sm:flex gap-y-4 sm:gap-x-4 items-center w-full justify-between"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              type="text"
              label="Flight Number"
              value={formValues.flightNumber}
              placeholder="Enter Flight Number"
              name="flightNumber"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Select
              value={formValues.departureAirport}
              onChange={handleInputChange}
              name="departureAirport"
              label="Departure Airport"
              placeholder="Select Departure Airport"
            >
              {airports.map((airport) => (
                <SelectItem key={airport._id} value={airport._id}>
                  {airport.airportName}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Select
              value={formValues.arrivalAirport}
              onChange={handleInputChange}
              name="arrivalAirport"
              label="Arrival Airport"
              placeholder="Select Arrival Airport"
            >
              {airports.map((airport) => (
                <SelectItem key={airport._id} value={airport._id}>
                  {airport.airportName}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Input
              type="date"
              placeholder="Departure Time"
              name="departureTime"
              value={formValues.departureTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              type="date"
              placeholder="Arrival Time"
              name="arrivalTime"
              value={formValues.arrivalTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Select
              value={formValues.aircraft}
              onChange={handleInputChange}
              placeholder="Select Aircraft"
              name="aircraft"
              label="Aircraft"
            >
              {aircrafts.map((aircraft) => (
                <SelectItem key={aircraft._id} value={aircraft._id}>
                  {aircraft.aircraftRegisteredNumber}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Select
              value={formValues.status}
              onChange={handleInputChange}
              label="Status"
              placeholder="Select Status"
              name="status"
            >
              {flightStatus.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Button
              type="submit"
              size="lg"
              color="primary"
              className="text-white"
            >
              {isEditing ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </div>

      <hr />

      <div>
        <h1 className="font-semibold text-xl py-4">All Flights</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flight Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departure Airport
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Arrival Airport
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departure Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Arrival Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aircraft
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {flight.flightNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {flight.departureAirport.airportName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {flight.arrivalAirport.airportName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(flight.departureTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(flight.arrivalTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {flight.aircraft.aircraftRegisteredNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {flight.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    onClick={() => handleEditClick(flight)}
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  >
                    Edit
                  </a>
                  <a
                    onClick={() => handleDeleteClick(flight._id)}
                    className="ml-4 text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  >
                    Delete
                  </a>
                </td>
                <td>
                  <a
                    href={`/dashboard/flight/${flight._id}`}
                    className=" text-primary"
                    
                  
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
