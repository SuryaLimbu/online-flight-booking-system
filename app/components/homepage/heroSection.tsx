"use client";

import React, {
  ChangeEvent,
  Children,
  FormEvent,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import hero1 from "@/public/Airplane.png";
import styles from "./app.module.css";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
  DatePicker,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  ModalContent,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  DateValue,
} from "@nextui-org/react";

interface IFormValue {
  from: string;
  to: string;
  departureDate: string;

  cabinClass: string;
  totalTravelers: number;
}

interface IAirport {
  _id: string;
  airportCode: string;
  airportName: string;
  location: string;
}
import { PiMagnifyingGlass } from "react-icons/pi";
// import router, { useRouter } from "next/router";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [airports, setAirports] = useState<IAirport[]>([]);

  const [isSubmit, setIsSubmit] = useState(false);
  const [formValues, setFormValues] = useState<IFormValue>({
    from: "",
    to: "",
    departureDate: "",

    cabinClass: "",
    totalTravelers: 1,
  });
  const router = useRouter();
  // calculate total travelers
  const updateTotalTravelers = (newAdult: number, newChild: number) => {
    const totalTravelers = newAdult + newChild;
    setFormValues({
      ...formValues,
      totalTravelers,
    });
  };

  const handleAdultChange = (change: number) => {
    setAdult((prevAdult) => {
      const newAdult = Math.max(1, prevAdult + change);
      updateTotalTravelers(newAdult, child);
      return newAdult;
    });
  };

  const handleChildChange = (change: number) => {
    setChild((prevChild) => {
      const newChild = Math.max(0, prevChild + change);
      updateTotalTravelers(adult, newChild);
      return newChild;
    });
  };

  const cabinClasses = [
    { label: "Economy", value: "Economy" },
    { label: "Business", value: "Business" },
    { label: "Premium Economy", value: "Premium Economy" },
  ];

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleDateChange = (name: string, value: DateValue | null) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isSubmit) {
      console.log("submit button clicked");
      const {
        from,
        to,
        departureDate,

        cabinClass,
        totalTravelers,
      } = formValues;
      const query = {
        from,
        to,
        departureDate: departureDate,
        cabinClass,
        totalTravelers: totalTravelers.toString(),
      };
      // console.log("query: ", query);
      // router.push(`/flights?query=${JSON.stringify(query)}`);
      router.push(
        `/flights?from=${from}&to=${to}&departureDate=${departureDate}&cabinClass=${cabinClass}&totalTravelers=${totalTravelers}`
      );
      // router.push(`/flights?query=${query}`);

      setIsSubmit(false);
    }
    const fetchAirports = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/airports`
      );
      const data = await response.json();
      // console.log("data: ", data);
      setAirports(data);
    };
    fetchAirports();
  }, [isSubmit]);
  // console.log("airports: ", airports);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmit(true);
    // console.log("Form Values:", formValues);
    // const { from, to, departureDate, returnDate, cabinClass, totalTravelers } =
    //   formValues;
    // const query = {
    //   from,
    //   to,
    //   departureDate: departureDate?.toString() || "",
    //   returnDate: returnDate?.toString() || "",
    //   cabinClass,
    //   totalTravelers: totalTravelers.toString(),
    // };

    // Perform any additional actions with form values, e.g., send to an API
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex-col w-full h-screen">
      {/* <Image src={hero1} alt="hero1" className="absolute -z-40 top-0 w-full" /> */}
      <div className="flex-cols align-middle mb-8">
        <h1 className=" text-4xl font-bold text-black">
          Book your flight with us
        </h1>
        <p className=" text-black">
          We offer the best prices for your next flight
        </p>
      </div>
      <div>
        <Tabs aria-label="Options">
          <Tab key="flight" title="Flight">
            <Card className="shadow-none border">
              <CardBody className="">
                <div className="pb-4">
                  <RadioGroup
                    label="Choose your flight type"
                    orientation="horizontal"
                    defaultValue={"one way"}
                  >
                    {" "}
                    <Radio value="one way">One way</Radio>
                    <Radio value="round trip" isDisabled>
                      Round trip
                    </Radio>
                    <Radio value="multi city" isDisabled>
                      Multi city
                    </Radio>
                  </RadioGroup>
                </div>
                <form
                  className="space-y-4 sm:flex sm:gap-x-4 gap-y-4  items-center"
                  onSubmit={handleSubmit}
                >
                  <Select
                    items={airports}
                    label="From"
                    name="from"
                    placeholder="Select your departure airport"
                    className="w-full sm:max-w-xs"
                    value={formValues.from}
                    onChange={handleInputChange}
                  >
                    {airports.map((airport) => (
                      <SelectItem key={airport._id}>
                        {airport.airportName}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    items={airports}
                    label="To"
                    name="to"
                    placeholder="Select your arrival airport"
                    className="w-full sm:max-w-xs"
                    value={formValues.to}
                    onChange={handleInputChange}
                  >
                    {airports.map((airport) => (
                      <SelectItem key={airport._id}>
                        {airport.airportName}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    type="date"
                    label="Departure"
                    className="w-full sm:max-w-[284px]"
                    name="departureDate"
                    value={formValues.departureDate}
                    onChange={handleInputChange}
                  />

                  <Select
                    items={cabinClasses}
                    label="Cabin Class"
                    name="cabinClass"
                    placeholder="Select Cabin Class"
                    className="w-full sm:max-w-xs"
                    // defaultSelectedKeys={["Economy"]}
                    value={formValues.cabinClass}
                    onChange={handleInputChange}
                  >
                    {(cabinClass) => (
                      <SelectItem key={cabinClass.value}>
                        {cabinClass.label}
                      </SelectItem>
                    )}
                  </Select>
                  <div className="flex justify-between gap-4 ">
                    <Button
                      className="text-primary"
                      color="primary"
                      variant="flat"
                      size="lg"
                      onPress={onOpen}
                    >
                      Travellers
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              add travellers
                            </ModalHeader>
                            <ModalBody>
                              <div className="flex-col gap-y-4">
                                <div className="flex justify-between">
                                  <div>
                                    <span className=" font-semibold">
                                      Adults
                                    </span>
                                    <br />
                                    <span>Age 16+</span>
                                  </div>
                                  <div>
                                    <Button
                                      size="sm"
                                      color="primary"
                                      className="text-white"
                                      onClick={() => handleAdultChange(1)}
                                      disabled={formValues.totalTravelers >= 6}
                                    >
                                      +
                                    </Button>
                                    <span className="mx-2">{adult}</span>
                                    <Button
                                      size="sm"
                                      color="primary"
                                      className="text-white"
                                      onClick={() =>
                                        setAdult((prevAdult) =>
                                          Math.max(1, prevAdult - 1)
                                        )
                                      }
                                    >
                                      -
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>
                                    <span className=" font-semibold">
                                      Children
                                    </span>
                                    <br />
                                    <span>Aged 2 to 15</span>
                                  </div>
                                  <div>
                                    <Button
                                      size="sm"
                                      color="primary"
                                      className="text-white"
                                      onClick={() => handleChildChange(1)}
                                      disabled={formValues.totalTravelers >= 6}
                                    >
                                      +
                                    </Button>
                                    <span className="mx-2">{child}</span>
                                    <Button
                                      size="sm"
                                      color="primary"
                                      className="text-white"
                                      onClick={() =>
                                        setChild((prevChild) =>
                                          Math.max(0, prevChild - 1)
                                        )
                                      }
                                    >
                                      -
                                    </Button>
                                  </div>
                                </div>

                                {/* <Select
                                items={ages}
                                label="Cabin Class"
                                placeholder="Select Cabin Class"
                              >
                                {(age) => (
                                  <SelectItem key={age.value}>
                                    {age.label}
                                  </SelectItem>
                                )}
                              </Select> */}
                              </div>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="primary"
                                onPress={onClose}
                                size="lg"
                                className="w-full text-white"
                              >
                                Apply
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>

                    <Button
                      className=" text-white"
                      color="primary"
                      size="lg"
                      type="submit"
                    >
                      Search
                    </Button>
                  </div>
                </form>
                <div className="bg-green-200 p-4 my-4 rounded-xl">
                  <h1>Available flight</h1>
                  <div>
                    <div className="sm:flex justify-between space-y-4 items-center">
                      <div>
                        <span className=" font-semibold">
                          Departure Airport
                        </span>
                        <br />
                        <span>Heathrow</span>
                      </div>
                      <div>
                        <span className=" font-semibold">Arrival Airport</span>
                        <br />
                        <span>Suketar</span>
                      </div>

                      <div>
                        <span className=" font-semibold">Departure Date</span>
                        <br />
                        <span>May/27/2024</span>
                      </div>
                      <div>
                        <span className=" font-semibold">Cabin Class</span>
                        <br />
                        <span>any</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="music" title="Music" isDisabled>
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="flightStatus" title="Flight Status">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default HeroSection;
