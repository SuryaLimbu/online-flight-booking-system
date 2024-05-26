"use client";
import { Button, Input } from "@nextui-org/react";
import React, { ChangeEvent, useEffect, useState } from "react";

interface IAirport {
  _id: string;
  id: string;
  airportCode: string;
  airportName: string;
  location: string;
}

export default function Page() {
  const [airports, setAirports] = useState<IAirport[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState("") ;
  const [formValues, setFormValues] = useState({
    airportName: "",
    airportCode: "",
    location: "",
  });

  useEffect(() => {
    const fetchAirports = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/airports`
      );
      const data = await response.json();
      setAirports(data);
    };
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
    const formData = new FormData(e.target as HTMLFormElement);
    const formValuesObject = Object.fromEntries(formData);

    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/airports/${id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/airports`;

    const method = isEditing ? "PUT" : "POST";
    // console.log(formValuesObject);
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
     
      body: JSON.stringify(formValuesObject),
    });

    const data = await response.json();
    console.log(data);
    setRefresh(true);
    setIsEditing(false);
    setFormValues({
      airportName: "",
      airportCode: "",
      location: "",
    });

    // Show alert based on the action performed
    window.alert(
      isEditing
        ? "Airport data updated successfully!"
        : "Airport data saved successfully!"
    );
  };

  const handleEditClick = (airport: IAirport) => {
    setIsEditing(true);
    setId(airport._id);
    setFormValues({
      airportName: airport.airportName,
      airportCode: airport.airportCode,
      location: airport.location,
    });
  };

  const handleDeleteClick = async (_id: string) => {
    if (window.confirm("Are you sure you want to delete this airport?")) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/airports/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRefresh(true);
        window.alert("Airport data deleted successfully!");
      } else {
        window.alert("Failed to delete airport data!");
      }
    }
  };

  if (!airports) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="py-4">
        <h1 className="font-semibold text-xl py-4">
          {isEditing ? "Edit Airport" : "Add New Airport"}
        </h1>
        <form
          className="flex gap-4 items-center w-full"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              type="text"
              label="Airport Name"
              value={formValues.airportName}
              placeholder="Enter Airport Name"
              name="airportName"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              type="text"
              label="Airport Code"
              value={formValues.airportCode}
              placeholder="Enter Airport Code"
              name="airportCode"
              onChange={handleInputChange}
              // disabled={isEditing}
            />
          </div>
          <div>
            <Input
              type="text"
              label="Airport Location"
              value={formValues.location}
              placeholder="Enter Airport Location"
              name="location"
              onChange={handleInputChange}
            />
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
        <h1 className="font-semibold text-xl py-4">All Airports</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Airport Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Airport Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Airport Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {airports.map((airport) => (
              <tr key={airport._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {airport.airportName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {airport.airportCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {airport.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    onClick={() => handleEditClick(airport)}
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  >
                    Edit
                  </a>
                  {/* <a
                    onClick={() => handleDeleteClick(airport._id)}
                    className="ml-4 text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  >
                    Delete
                  </a> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
