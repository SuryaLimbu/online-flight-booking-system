"use client"
import React from "react";

export default function Sidebar() {
  const dashboardMenu = [
    {
      name: "Dashboard",
      link: "/dashboard/dashboard",
    },
    {
      name: "Airport",
      link: "/dashboard/airport",
    },
    {
      name: "Aircraft",
      link: "/dashboard/aircraft",
    },
    {
      name: "Flight",
      link: "/dashboard/flight",
    },
    // {
    //   name: "User",
    //   link: "/dashboard/user",
    // },
    // {
    //   name: "Passenger",
    //   link: "/dashboard/passenger",
    // },
    // {
    //   name: "Booking",
    //   link: "/dashboard/booking",
    // },
    // {
    //   name: "Payment",
    //   link: "/dashboard/payment",
    // },
  ];
  return (
    <>
      <div className="flex sm:h-screen flex-col  justify-between sm:border-e">
        <div className="px-4">
          <ul className="mt-6 space-y-1">
            <ul className="flex sm:flex-col gap-y-2 sm:gap-x-2">
              {dashboardMenu.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium"> Products </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Add New Product
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      View All Products
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            <li>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Billing
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Invoices
              </a>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium"> Account </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Details
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Security
                    </a>
                  </li>

                  <li>
                    <form action="#">
                      <button
                        type="submit"
                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                      >
                        Logout
                      </button>
                    </form>
                  </li>
                </ul>
              </details>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}
