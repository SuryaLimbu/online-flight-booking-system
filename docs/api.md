# API Reference

Base URL: use `NEXT_PUBLIC_API_URL`, e.g. `http://localhost:3000/api`

Notes
- All endpoints return JSON.
- MongoDB is accessed via Mongoose models.
- Some update handlers expect an `id` in the body; others use a URL param. See each endpoint.
- Authentication: there's a simple login endpoint. The app uses a `userRole` cookie to guard `/dashboard` routes (no JWT/OAuth in API routes).

## Auth
### POST /auth/login
Body:
```json
{ "email": "user@example.com", "password": "secret" }
```
Response: the matched user document (with populated `roleId`) or error.

## Aircrafts
### GET /aircrafts
List aircraft.

### POST /aircrafts
Body:
```json
{ "aircraftRegisteredNumber": "9N-ABC", "aircraftModel": "A320", "capacity": 180 }
```
Response: `{ "message": "aircraft created successfully" }`.

### GET /aircrafts/:id
Fetch by id.

### PUT /aircrafts/:id
Body: any of
```json
{ "aircraftRegisteredNumber": "9N-XYZ", "aircraftModel": "B737", "capacity": 160 }
```
Response: `{ "message": "Aircraft updated successfully" }`.

### DELETE /aircrafts/:id
Delete by id.

## Airports
### GET /airports
List airports.

### POST /airports
Body:
```json
{ "airportCode": "KTM", "airportName": "Tribhuvan Intl", "location": "Kathmandu, NP" }
```

### GET /airports/:id
Fetch by id.

### PUT /airports/:id
Body (all fields required by handler):
```json
{ "airportCode": "DEL", "airportName": "Indira Gandhi Intl", "location": "Delhi, IN" }
```

### DELETE /airports/:id
Delete by id.

## Flights
### GET /flights
List flights (populates `departureAirport`, `arrivalAirport`, `aircraft`).

### POST /flights
Body:
```json
{
  "flightNumber": "XY123",
  "departureAirport": "<airportObjectId>",
  "arrivalAirport": "<airportObjectId>",
  "departureTime": "2025-10-16T10:00:00.000Z",
  "arrivalTime": "2025-10-16T12:30:00.000Z",
  "aircraft": "<aircraftObjectId>",
  "status": "Scheduled"
}
```

### PUT /flights
Body (expects `id` and fields to update):
```json
{ "id": "<flightId>", "status": "Cancelled" }
```

### GET /flights/:id
Fetch by id (populated).

### DELETE /flights/:id
Delete by id.

### GET /searchFlights
Query params: `from`, `to`, `departureDate` (YYYY-MM-DD), `cabinClass`, `totalTravelers`.
Example: `/searchFlights?from=<airportId>&to=<airportId>&departureDate=2025-10-16&cabinClass=Economy&totalTravelers=2`

## Sections
### GET /sections
List sections.

### POST /sections
Body:
```json
{ "aircraftId": "<aircraftId>", "sectionName": "Economy", "pricePerSeat": 120 }
```

### PUT /sections
Body (expects `id` and fields to update):
```json
{ "id": "<sectionId>", "pricePerSeat": 150 }
```

### GET /sections/:id
Fetch by id.

### Known limitation
The code defines `DELETE` on `/sections` without an `:id` route. Deletion expects an id in the URL path, but no `/sections/:id` `DELETE` route is present.

## Seats
### GET /seats
List seats.

### POST /seats
Body:
```json
{ "sectionId": "<sectionId>", "rowNumber": 12, "position": "A", "seatName": "12A", "status": "available" }
```

### PUT /seats
Body (expects `id` and fields to update):
```json
{ "id": "<seatId>", "status": "booked" }
```

### GET /seats/seatName/:seat
Fetch seats by seat name (e.g. `12A`).

### POST /seats/insert-seats
Seed predefined seats across sections (first/business/economy). Uses hardcoded section ids in code; adjust before use.

### Known limitation
The code defines `DELETE` on `/seats` without an `:id` route. Deletion expects an id in the URL path, but no `/seats/:id` `DELETE` route is present.

## Bookings
### GET /bookings
List bookings.

### POST /bookings
Body:
```json
{
  "userId": "<userId>",
  "seatId": ["<seatId>", "<seatId>"] ,
  "aircraftId": "<aircraftId>",
  "passengers": [
    {
      "fullName": "Jane Doe",
      "gender": "F",
      "age": "1995-05-01T00:00:00.000Z",
      "passportNumber": "P1234567",
      "emergencyContact": "+1-202-555-0100"
    }
  ],
  "flightId": "<flightId>",
  "totalPrice": 240
}
```

### PUT /bookings
Body (expects `id` and fields to update):
```json
{ "id": "<bookingId>", "status": "paid" }
```

### GET /bookings/:id
Fetch booking by id.

### DELETE /bookings/:id
Delete booking by id.

### GET /bookings/userId/:userId
List bookings for a user (populates nested fields).

### GET /bookings/flightId/:flightId
List bookings for a flight (populates some fields).

### GET /bookings/populateId/:id
Fetch booking by id with populated relationships.

## Users
### GET /users
List users.

### POST /users
Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "secret",
  "address": "Street 1",
  "contactDetails": "+1-202-555-0123",
  "gender": "M",
  "roleId": "<roleId>",
  "dateOfBirth": "1990-01-01T00:00:00.000Z",
  "nationality": "US",
  "passportNumber": "X1234567"
}
```

### PUT /users
Body (expects `id` and fields to update):
```json
{ "id": "<userId>", "address": "New address" }
```

### GET /users/:id
Fetch by id.

### DELETE /users/:id
Delete by id.

## Roles
### GET /roles
List roles.

### POST /roles
Body:
```json
{ "roleName": "Admin", "permissions": "create,read,update,delete" }
```

### PUT /roles/:id
Body (current handler expects `{ "name": "..." }`, but model uses `roleName`).

### DELETE /roles/:id
Delete by id.
