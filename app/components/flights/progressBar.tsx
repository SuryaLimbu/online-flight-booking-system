import React from "react";
import { PiCheck } from "react-icons/pi";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="flex-rows w-full my-4 pb-4">
      <div className="flex pb-3">
        <div className="flex-1"></div>

        <div className="flex-1">
          <div className="w-10 h-10 bg-primary mx-auto rounded-full text-lg text-white flex items-center">
            <span className="text-white text-center w-full">
              <PiCheck />
            </span>
          </div>
        </div>

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
            <div className="bg-primary text-xs leading-none py-1 text-center text-grey-darkest rounded w-full"></div>
          </div>
        </div>

        <div className="flex-1">
          <div>
            {progress > 1 ? (
              <div className="w-10 h-10 bg-primary mx-auto rounded-full text-lg text-white flex items-center">
                <span className="text-white text-center w-full">
                  <PiCheck />
                </span>
              </div>
            ) : (
              <div className="w-10 h-10 bg-white border-2 border-primary mx-auto rounded-full text-lg text-white flex items-center">
                <span className="text-primary text-center w-full">2</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          {progress > 1 ? (
            <div className="w-full bg-primary rounded items-center align-middle align-center flex-1">
              <div className="bg-primary text-xs leading-none py-1 text-center text-grey-darkest rounded"></div>
            </div>
          ) : (
            <div className="w-full bg-primary/20 rounded items-center align-middle align-center flex-1">
              <div className="bg-primary/0 text-xs leading-none py-1 text-center text-grey-darkest rounded w-full/20"></div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div>
            {progress > 2 ? (
              <div className="w-10 h-10 bg-primary mx-auto rounded-full text-lg text-white flex items-center">
                <span className="text-white text-center w-full">
                  <PiCheck />
                </span>
              </div>
            ) : (
              <div className="w-10 h-10 bg-white border-2 border-primary mx-auto rounded-full text-lg text-white flex items-center">
                <span className="text-primary text-center w-full">3</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-1/6 align-center items-center align-middle content-center flex">
          {progress > 2 ? (
            <div className="w-full bg-primary rounded items-center align-middle align-center flex-1">
              <div className="bg-primary text-xs leading-none py-1 text-center text-grey-darkest rounded"></div>
            </div>
          ) : (
            <div className="w-full bg-primary/20 rounded items-center align-middle align-center flex-1">
              <div className="bg-primary/0 text-xs leading-none py-1 text-center text-grey-darkest rounded w-full/20"></div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div>
            {progress > 3 ? (
              <div className="w-10 h-10 bg-primary mx-auto rounded-full text-lg text-white flex items-center">
                <span className="text-white text-center w-full">
                  <PiCheck />
                </span>
              </div>
            ) : (
              <div className="w-10 h-10 bg-white border-2 border-primary mx-auto rounded-full text-lg text-white flex items-center">
                <span className="text-primary text-center w-full">4</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1"></div>
      </div>

      <div className="flex text-xs content-center text-center">
        <div className="w-1/4">Flights</div>
        <div className="w-1/4">Seat Plan</div>
        <div className="w-1/4">Payment</div>
        <div className="w-1/4">Confirmation</div>
      </div>
    </div>
  );
};

export default ProgressBar;
