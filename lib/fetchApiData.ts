import React from "react";

export default async function fetchApiData(route: string) {
  const url = process.env.NEXT_PUBLIC_API_URL + route;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

// export async function fetchBookingData(route: string) {
//   const url = process.env.NEXT_PUBLIC_API_URL + route;
//   const response = await fetch(url);
//   const data = await response.json();
//   console.log(data);
//   return data;
// }

