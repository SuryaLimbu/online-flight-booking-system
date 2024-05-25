"use client";
import { Input, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
interface IAircraft {
  _id: string;
  aircraftRegisteredNumber: string;
  aircraftModel: string;
  capacity: string;
}
export default function page() {
  const [formValues, setFormValues] = React.useState({
    aircraftRegisteredNumber: "",
    aircraftModel: "",
    capacity: "",
  });
  const [aircraft, setAircraft] = useState<IAircraft[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchAircraft = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/aircrafts`
      );
      const data = await response.json();
      setAircraft(data);
    };
    fetchAircraft();
    setRefresh(false);
  }, [refresh]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValuesObject = Object.fromEntries(formData);

    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/aircrafts/${id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/aircrafts`;

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
      aircraftRegisteredNumber: "",
      aircraftModel: "",
      capacity: "",
    });
    // Show alert based on the action performed
    window.alert(
      isEditing
        ? "Aircraft data updated successfully!"
        : "Aircraft data saved successfully!"
    );
  };

  const handleEditClick = (aircraft: IAircraft) => {
    setIsEditing(true);
    setId(aircraft._id);
    setFormValues({
      aircraftRegisteredNumber: aircraft.aircraftRegisteredNumber,
      aircraftModel: aircraft.aircraftModel,
      capacity: aircraft.capacity,
    });
  };

  const handleDeleteClick = async (_id: string) => {
    if (window.confirm("Are you sure you want to delete this aircraft?")) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/aircrafts/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setRefresh(true);
        window.alert("Aircrat data deleted successfully!");
      } else {
        window.alert("Failed to delete aircraft data!");
      }
    }
  };

  return (
    <>
      <div className="py-4">
        <h1 className="font-semibold text-xl py-4">
          {isEditing ? "Edit aircraft" : "Add New aircraft"}
        </h1>
        <form
          className="flex gap-4 items-center w-full"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              type="text"
              label="Aircraft Register Number"
              value={formValues.aircraftRegisteredNumber}
              placeholder="Enter Aircraft Register Number"
              name="aircraftRegisteredNumber"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              type="text"
              label="Aircraft Model"
              value={formValues.aircraftModel}
              placeholder="Enter Aircraft Model"
              name="aircraftModel"
              onChange={handleInputChange}
              // disabled={isEditing}
            />
          </div>
          <div>
            <Input
              type="number"
              label="Aircraft Capacity"
              value={formValues.capacity}
              placeholder="Enter Aircraft Capacity"
              name="capacity"
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
        <h1 className="font-semibold text-xl py-4">All aircrafts</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                aircraft Register Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                aircraft Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                aircraft Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {aircraft.map((aircraft) => (
              <tr key={aircraft._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {aircraft.aircraftRegisteredNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {aircraft.aircraftModel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {aircraft.capacity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    onClick={() => handleEditClick(aircraft)}
                    className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                  >
                    Edit
                  </a>
                  {/* <a
                    onClick={() => handleDeleteClick(aircraft._id)}
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
