"use client";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  contactDetails: string;
  gender: string;
  roleId: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
}

export default function Page() {
  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const [formData, setFormData] = useState<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    contactDetails: "",
    gender: "",
    roleId: "", // Default role to user
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      if (response.ok) {
        console.log("User registered successfully");
        window.location.href = "/auth/login";
      } else {
        console.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border flex-col sm:w-2/4 items-center justify-center rounded-lg p-10 text-center">
        <div className="my-10">
          <h1 className="font-bold text-4xl">Register Page</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex-col">
            <div className="sm:flex gap-4">
              <Input
                type="text"
                placeholder="Enter your firstname"
                label="Enter your Firstname"
                className="mb-4 w-full"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="Enter your lastname"
                label="Enter your Lastname"
                className="mb-4 w-full"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="sm:flex gap-4">
              <Input
                type="text"
                placeholder="Enter your email"
                label="Enter your Email"
                className="mb-4 w-full"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                type="password"
                placeholder="Enter your password"
                label="Enter your Password"
                className="mb-4 w-full"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <Input
              type="text"
              placeholder="Enter your address"
              label="Enter your Address"
              className="mb-4 w-full"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Enter your phone number"
              label="Enter your Phone Number"
              className="mb-4 w-full"
              name="contactDetails"
              value={formData.contactDetails}
              onChange={handleChange}
            />
            <Select
              label="Select your Gender"
              placeholder="Select your gender"
              className="mb-4 w-full"
              value={formData.gender}
              onChange={handleInputChange}
            >
              {gender.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>
            <div className="sm:flex gap-4">
              <Input
                type="date"
                label="Enter your Date of Birth"
                className="mb-4 w-full"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <Input
                type="text"
                placeholder="Enter your nationality"
                label="Enter your Nationality"
                className="mb-4 w-full"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
            <Input
              type="text"
              placeholder="Enter your passport number"
              label="Enter your Passport Number"
              className="mb-4 w-full"
              name="passportNumber"
              value={formData.passportNumber}
              onChange={handleChange}
            />
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full text-white mb-4"
            >
              Register
            </Button>
          </form>
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
