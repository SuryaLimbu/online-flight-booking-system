import { Button, Input } from "@nextui-org/react";
import React from "react";

export default function page() {
  return (
    <div className=" flex h-screen justify-center items-center ">
      <div className=" border flex-col w-1/4 items-center justify-center rounded-lg p-10 text-center">
        <div className=" my-10">
          <h1 className=" font-bold text-4xl">Login Page</h1>
        </div>
        <div className="">
          <form action="" className="flex-col">
            <Input
              type="text"
              placeholder="Enter your email"
              label="Enter your Email"
              className="mb-4 w-full"
              name="email"
            />
            <Input
              type="password"
              placeholder="Enter your password"
              label="Enter your password"
              className="mb-4"
              name="password"
            />
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full text-white mb-4"
            >
              Login
            </Button>
          </form>
          you don't have an account? <a href="/auth/register" className=" text-blue-600">Register</a>
        </div>
      </div>
    </div>
  );
}
