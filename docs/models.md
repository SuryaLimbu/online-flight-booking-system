# Data Models

All models are defined with Mongoose.

## Aircraft
- `aircraftRegisteredNumber`: string, required
- `aircraftModel`: string, required
- `capacity`: number, required

## Airport
- `airportCode`: string, required
- `airportName`: string, required
- `location`: string, required

## Flight
- `flightNumber`: string, required
- `departureAirport`: ObjectId -> `Airport`, required
- `arrivalAirport`: ObjectId -> `Airport`, required
- `departureTime`: Date, required
- `arrivalTime`: Date, required
- `aircraft`: ObjectId -> `Aircraft`, required
- `status`: string, required

## Section
- `aircraftId`: ObjectId -> `Aircraft`, required
- `sectionName`: string, required
- `pricePerSeat`: number, required

## Seat
- `sectionId`: ObjectId -> `Section`, required
- `rowNumber`: number, required
- `position`: string, required (e.g., "A", "B")
- `seatName`: string, required (e.g., "12A")
- `status`: string, default `"available"`

## Booking
- `userId`: ObjectId -> `User`, required
- `seatId`: ObjectId[] -> `Seat`, required
- `aircraftId`: ObjectId -> `Aircraft`, required
- `passengers`: list of objects
  - `fullName`: string, required
  - `gender`: string, required
  - `age`: Date, required
  - `passportNumber`: string, required
  - `emergencyContact`: string, required
- `flightId`: ObjectId -> `Flight`, required
- `totalPrice`: number, required
- `status`: string, optional
- timestamps enabled

## User
- `firstName`: string, required
- `lastName`: string, required
- `email`: string, unique, required
- `password`: string, required (bcrypt hashed on creation)
- `address`: string, required
- `contactDetails`: string, required
- `gender`: string, required
- `roleId`: ObjectId -> `Role`, required
- `dateOfBirth`: Date, required
- `nationality`: string, required
- `passportNumber`: string, required

## Role
- `roleName`: string, required
- `permissions`: string, required (comma-separated list)

## Ticket
- `flight`: ObjectId -> `Flight`, required
- `seatNumber`: ObjectId -> `Seat`, required
- `price`: number, required

## Payment
- `bookingId`: ObjectId -> `Booking`, required
- `paymentDate`: Date, required
- `amount`: number, required
- `paymentMethod`: string, required
- `status`: string, required
