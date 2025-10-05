export interface Ride  {
    id: number;
    employeeId: string;
    vehicleType: string;
    vehicleNo: string;
    vacantSeats: number;
    time: string;
    pickup: string;
    destination: string;
    bookedBy: string[];
}

export interface Booking  {
    id: number;
    rideId: number;
    employeeId: number;
    seatsBooked: number;
}