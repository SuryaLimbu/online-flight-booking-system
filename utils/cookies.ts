import Cookies from 'js-cookie';

// Function to set a cookie
export function setCookie(name: string, value: string, days: number = 7) {
  console.log(`Setting cookie: ${name} = ${value}, expires in ${days} days`);
  Cookies.set(name, value, { expires: days });
}

// Function to get a cookie
export function getCookie(name: string): string | undefined {
  const value = Cookies.get(name);
  console.log(`Getting cookie: ${name} = ${value}`);
  return value;
}

// Function to set an array as a cookie
export function setArrayCookie(name: string, array: any[], days: number = 7) {
  const jsonString = JSON.stringify(array);
  console.log(`Setting array cookie: ${name} = ${jsonString}`);
  setCookie(name, jsonString, days);
}

// Function to get an array from a cookie
export function getArrayCookie(name: string): any[] | undefined {
  const cookie = getCookie(name);
//   alert(`Getting array cookie: ${name} = ${cookie}`);
  return cookie ? JSON.parse(cookie) : undefined;
}
