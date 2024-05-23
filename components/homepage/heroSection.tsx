"use client";

import React, { Children, useState } from "react";
import Image from "next/image";
import hero1 from "@/public/Airplane.png";
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
} from "@nextui-org/react";

import { PiMagnifyingGlass } from "react-icons/pi";
const HeroSection = () => {
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);

  const totalTravelers = adult + child;
  const airports = [
    { label: "Dubai", value: "DUB" },
    { label: "London", value: "LON" },
    { label: "Paris", value: "PAR" },
    { label: "New York", value: "NYC" },
    { label: "Tokyo", value: "TYO" },
    { label: "Sydney", value: "SYD" },
    { label: "Beijing", value: "PEK" },
    { label: "Mumbai", value: "BOM" },
    { label: "Bangkok", value: "BKK" },
    { label: "Singapore", value: "SIN" },
    { label: "Hong Kong", value: "HKG" },
    { label: "Seoul", value: "SEL" },
  ];
  const cabinClasses = [
    { label: "Economy", value: "Economy" },
    { label: "Business", value: "Business" },
    { label: "Premium Economy", value: "Premium Economy" },
  ];

  const ages = [
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
  ];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className=" w-full h-screen">
      {/* <Image src={hero1} alt="hero1" className="absolute -z-40 top-0 w-full" /> */}
      <div className="flex-cols align-middle ">
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
            <Card>
              <CardBody className="">
                <div className="pb-4">
                  <RadioGroup
                    label="Choose your flight type"
                    orientation="horizontal"
                    defaultValue={"one way"}
                  >
                    {" "}
                    <Radio value="one way" >One way</Radio>
                    <Radio value="round trip" isDisabled>Round trip</Radio>
                    <Radio value="multi city" isDisabled>Multi city</Radio>
                  </RadioGroup>
                </div>
                <form className="sm:flex sm:gap-x-4 gap-y-4  items-center">
                  <Select
                    items={airports}
                    label="From"
                    placeholder="Select your departure airport"
                    className="max-w-xs"
                  >
                    {(airport) => (
                      <SelectItem key={airport.value}>
                        {airport.label}
                      </SelectItem>
                    )}
                  </Select>

                  <Select
                    items={airports}
                    label="To"
                    placeholder="Select your arrival airport"
                    className="max-w-xs"
                  >
                    {(airport) => (
                      <SelectItem key={airport.value}>
                        {airport.label}
                      </SelectItem>
                    )}
                  </Select>
                  <DatePicker label="Departure" className="max-w-[284px]" />
                  {/* <DatePicker label="Return" className="max-w-[284px]" /> */}
                  {/* <Input label="Adults" className="max-w-[284px]" />
                  <Input label="Children" className="max-w-[284px]" />
                  <Input label="Infants" className="max-w-[284px]" />
                  <Input label="Bags" className="max-w-[284px]" /> */}
                  {/* dropdown */}

                  <Select
                    items={cabinClasses}
                    label="Cabin Class"
                    placeholder="Select Cabin Class"
                    className="max-w-xs"
                    defaultSelectedKeys={["Economy"]}
                  >
                    {(cabinClass) => (
                      <SelectItem key={cabinClass.value}>
                        {cabinClass.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Button
                    className=" text-primary"
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
                                  <span className=" font-semibold">Adults</span>
                                  <br />
                                  <span>Age 16+</span>
                                </div>
                                <div>
                                  <Button
                                    size="sm"
                                    color="primary"
                                    className="text-white"
                                    onClick={() => setAdult(adult + 1)}
                                    disabled={totalTravelers >= 6}
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
                                    onClick={() => setChild(child + 1)}
                                    disabled={totalTravelers >= 6}
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

                  <Button className=" text-white" color="primary" size="lg">
                    Search
                  </Button>
                </form>
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
