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
import hero2 from "@/public/hero2.png";
import hero3 from "@/public/hero3.png";
import hero4 from "@/public/hero4.png";
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
  Badge,
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
import { CiLocationOn } from "react-icons/ci";

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

  const popularPlacesData = [
    {
      id: 1,
      name: "Phewa Lake",
      location: "Pokhara, Nepal",
      image: hero2, // Imported image for the card
      discount: "20%",
    },
    {
      id: 2,
      name: "Everest Base Camp",
      location: "Solukhumbu, Nepal",
      image: hero3,
      discount: "15%",
    },
    {
      id: 3,
      name: "Boudhanath Stupa",
      location: "Kathmandu, Nepal",
      image: hero4,
      discount: "10%",
    },
    {
      id: 4,
      name: "Chitwan National Park",
      location: "Chitwan, Nepal",
      image: hero2, // Reusing hero2; you can use another image if available
      discount: "25%",
    },
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <section className="grid w-full">
        <div className="relative">
          <Image
            src={hero3}
            alt="hero1"
            className="z-0 w-full h-[600px] rounded-3xl object-cover  backdrop-blur-3xl "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="grid align-middle mb-8 p-10 text-center">
              <h1 className=" text-8xl font-bold text-white">
                Book your flight with us
              </h1>
              <p className="text-2xl pt-4 text-white/80">
                We offer the best prices for your next flight
              </p>
            </div>
          </div>
        </div>

        <div className="grid -mt-36 mx-4 sm:mx-10 ">
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
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
                      isRequired={true}
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
                      isRequired={true}
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
                      isRequired={true}
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
                      isRequired={true}
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
                                        disabled={
                                          formValues.totalTravelers >= 6
                                        }
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
                                        disabled={
                                          formValues.totalTravelers >= 6
                                        }
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
                  <div className="bg-green-200/50 p-4 my-4 rounded-xl">
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
                          <span className=" font-semibold">
                            Arrival Airport
                          </span>
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
                  <div className="bg-green-200/50 p-4 my-4 rounded-xl">
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
                          <span className=" font-semibold">
                            Arrival Airport
                          </span>
                          <br />
                          <span>Kathmandu</span>
                        </div>

                        <div>
                          <span className=" font-semibold">Departure Date</span>
                          <br />
                          <span>May/26/2024</span>
                        </div>
                        <div>
                          <span className=" font-semibold">Cabin Class</span>
                          <br />
                          <span>any</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-200/50 p-4 my-4 rounded-xl">
                    <h1>Available flight</h1>
                    <div>
                      <div className="sm:flex justify-between space-y-4 items-center">
                        <div>
                          <span className=" font-semibold">
                            Departure Airport
                          </span>
                          <br />
                          <span>Kathmandu</span>
                        </div>
                        <div>
                          <span className=" font-semibold">
                            Arrival Airport
                          </span>
                          <br />
                          <span>Suketar</span>
                        </div>

                        <div>
                          <span className=" font-semibold">Departure Date</span>
                          <br />
                          <span>May/26/2024</span>
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
        <div className="my-10 grid gap-6">
          <section className="grid grid-cols-2 justify-between">
            <div>
              <h1 className="text-4xl font-bold">Popular Places</h1>
              <p>Let's enjoy this heaven on earth</p>
            </div>
            <div>
              <p>
                Many places are very famous, beautiful, clean, and will give a
                very deep impression to visitors and will make them come back.
              </p>
            </div>
          </section>
          <section className="grid sm:grid-cols-4 gap-6">
            {popularPlacesData.map((place, index) => (
              <div key={index}>
                <div className="relative">
                  <Badge
                    content={place.discount}
                    color="primary"
                    className="text-white"
                  >
                    <Image
                      src={place.image}
                      className="object-cover rounded-3xl h-80"
                      alt="card image"
                    />
                  </Badge>
                  {/* <span className="absolute inset-0 px-6 py-2 text-primary">{index + 1}</span> */}
                </div>
                <div>
                  <h2 className="font-semibold text-2xl">{place.name}</h2>
                  <p className="flex items-center gap-4 opacity-70">
                    <CiLocationOn className="text-primary" />
                    {place.location}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
        <div className="my-20">
          <section>
            <div className="text-center">
              <h1 className=" text-5xl font-bold">
                Travel to make sweet memories
              </h1>
              <p className=" opacity-50 text-xl">
                Find trips that fit a flexible lifestyle
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-10 mt-20">
              <div className="grid">
                <div className="space-y-4">
                  <span className="bg-primary/50 px-4 py-1 rounded-lg text-white">
                    01
                  </span>
                  <h1 className=" text-2xl font-bold">
                    Find trips that fit your freedom
                  </h1>
                  <p className=" opacity-60">
                    Travelling offers freedom and flexiblity, solitude and
                    spontaneity, and privacy and purpose.
                  </p>
                </div>
                <div className="space-y-4">
                  <span className="bg-success/50 px-4 py-1 rounded-lg text-white">
                    02
                  </span>
                  <h1 className=" text-2xl font-bold">
                    Get back to the nature by travel
                  </h1>
                  <p className=" opacity-60">
                    The world is a playground and you can finally explore Mother
                    Nature's inimitable canvas.
                  </p>
                </div>
                <div className="space-y-4">
                  <span className="bg-secondary/50 px-4 py-1 rounded-lg text-white">
                    01
                  </span>
                  <h1 className=" text-2xl font-bold">
                    Reignite those travel tastebuds
                  </h1>
                  <p className=" opacity-60">
                    There are infinite reasons to love travel, one of them being
                    the food, glorious food.
                  </p>
                </div>
                <div className="mt-10">
                  <Button>Start your explore</Button>
                </div>
              </div>
              <div className="grid sm:grid-cols-4">
                <div></div>
                <div className="col-span-2">
                  <Image
                    src={hero2}
                    alt="image"
                    className=" rounded-3xl w-full h-full object-cover"
                  ></Image>
                </div>
                <div></div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
export default HeroSection;
