interface SeatProps {
  sectionId: string;
  rowNumber: number;
  position: string;
  status: string;
  isSelected: boolean;
  isDisabled: boolean;
  onSeatClick: (rowNumber: number, position: string) => void;
}

export function Seat({
  rowNumber,
  position,
  status,
  isSelected,
  isDisabled,
  onSeatClick,
}: SeatProps) {
  const seatClass = `h-20 w-10 px-7 md:px-8 mb-2 mr-2 text-center flex justify-center items-center text-white rounded-lg cursor-pointer ${
    isSelected
      ? "bg-blue-500"
      : status === "reserved" || isDisabled
      ? "bg-red-500 cursor-not-allowed"
      : "bg-green-500"
  }`;

  const handleClick = () => {
    if (!isDisabled) {
      onSeatClick(rowNumber, position);
    }
  };

  return (
    <div onClick={handleClick} className={seatClass}>
      <div>
        {rowNumber}
        {position}
      </div>
      <br />
      {/* <div className="hidden md:flex">{status}</div> */}
    </div>
  );
}
