// File path: pages/login.tsx
"use client";
import { setCookie } from "@/utils/cookies";
import { Button, Input } from "@nextui-org/react";
import React, { useState, FormEvent } from "react";

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful", data);
        setCookie("userId", data._id);
        setCookie("usermail", data.email);
        setCookie("userRole", data.roleId.roleName);
        window.location.href = "/"; // Redirect to dashboard
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="border flex-col sm:w-2/4 items-center justify-center rounded-lg p-10 text-center">
        <div className="my-10">
          <h1 className="font-bold text-4xl">Login Page</h1>
        </div>
        <div className="">
          <form onSubmit={handleSubmit} className="flex-col">
            <Input
              type="text"
              placeholder="Enter your email"
              label="Enter your Email"
              className="mb-4 w-full"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              label="Enter your password"
              className="mb-4"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full text-white mb-4"
            >
              Login
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
          you don't have an account?{" "}
          <a href="/auth/register" className="text-blue-600">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
