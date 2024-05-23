"use client";

import React from "react";
import Image from "next/image";
import hero1 from "@/public/hero1.png";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
const HeroSection = () => {
  return (
    <div className=" w-full h-screen">
      {/* <Image src={hero1} alt="hero1" className="absolute -z-40 top-0" /> */}
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
          <Tab key="photos" title="Flight">
            <Card>
              <CardBody>
                <div className="pb-4">
                  <RadioGroup label="Choose your flight type" orientation="horizontal">                    <Radio value="one way">One way</Radio>
                    <Radio value="round trip">Round trip</Radio>
                    <Radio value="multi city">Multi city</Radio>
                  </RadioGroup>
                </div>
                <form>
                  <Input placeholder="choose distination"></Input>
                </form>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="music" title="Music">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="videos" title="Videos">
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
