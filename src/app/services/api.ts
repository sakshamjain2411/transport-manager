import { Injectable } from '@angular/core';
import { Ride, Booking } from '../interfaces/interface';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private rides$ = new BehaviorSubject<Ride[]>([
    { id: 1, employeeId: 'E001', vehicleType: 'Bike', vehicleNo: 'AB 1234', vacantSeats: 3, time: '09:30', pickup: 'BLR 01', destination: 'Electronic City', bookedBy: [] },
    { id: 2, employeeId: 'E002', vehicleType: 'Bike', vehicleNo: 'CD 5678', vacantSeats: 2, time: '22:00', pickup: 'BLR 02', destination: 'Koramangala', bookedBy: [] },
    { id: 3, employeeId: 'E003', vehicleType: 'Car', vehicleNo: 'EF 9012', vacantSeats: 4, time: '20:00', pickup: 'BLR 03', destination: 'Whitefield', bookedBy: [] },
    { id: 4, employeeId: 'E004', vehicleType: 'Car', vehicleNo: 'GH 3456', vacantSeats: 3, time: '08:00', pickup: 'BLR 04', destination: 'MG Road', bookedBy: [] },
    { id: 5, employeeId: 'E005', vehicleType: 'Car', vehicleNo: 'IJ 7890', vacantSeats: 6, time: '18:30', pickup: 'BLR 05', destination: 'Indiranagar', bookedBy: [] },
    { id: 6, employeeId: 'E006', vehicleType: 'Bike', vehicleNo: 'KL 1234', vacantSeats: 1, time: '07:45', pickup: 'BLR 06', destination: 'Hebbal', bookedBy: [] },
    { id: 7, employeeId: 'E007', vehicleType: 'Car', vehicleNo: 'MN 5678', vacantSeats: 4, time: '12:00', pickup: 'BLR 07', destination: 'Jayanagar', bookedBy: [] },
    { id: 8, employeeId: 'E008', vehicleType: 'Bike', vehicleNo: 'OP 9012', vacantSeats: 2, time: '15:30', pickup: 'BLR 08', destination: 'Banashankari', bookedBy: [] },
    { id: 9, employeeId: 'E009', vehicleType: 'Car', vehicleNo: 'QR 3456', vacantSeats: 5, time: '10:00', pickup: 'BLR 09', destination: 'Yeshwanthpur', bookedBy: [] },
    { id: 10, employeeId: 'E010', vehicleType: 'Car', vehicleNo: 'ST 7890', vacantSeats: 3, time: '14:00', pickup: 'BLR 10', destination: 'Rajajinagar', bookedBy: [] },
    { id: 11, employeeId: 'E011', vehicleType: 'Bike', vehicleNo: 'UV 1234', vacantSeats: 2, time: '16:45', pickup: 'BLR 11', destination: 'Marathahalli', bookedBy: [] },
    { id: 12, employeeId: 'E012', vehicleType: 'Car', vehicleNo: 'WX 5678', vacantSeats: 4, time: '19:00', pickup: 'BLR 12', destination: 'Bellandur', bookedBy: [] },
    { id: 13, employeeId: 'E013', vehicleType: 'Car', vehicleNo: 'YZ 9012', vacantSeats: 7, time: '21:30', pickup: 'BLR 13', destination: 'Kengeri', bookedBy: [] },
    { id: 14, employeeId: 'E003', vehicleType: 'Bike', vehicleNo: 'AB 3456', vacantSeats: 1, time: '06:30', pickup: 'BLR 14', destination: 'Hosur Road', bookedBy: [] },
    { id: 15, employeeId: 'E003', vehicleType: 'Car', vehicleNo: 'CD 7890', vacantSeats: 3, time: '11:15', pickup: 'BLR 15', destination: 'Sarjapur', bookedBy: [] },
  ]);


  getAvailableRides() {
    return this.rides$.asObservable().pipe(
      map(
        rides => rides.filter(r => r.vacantSeats > 0 && !r.bookedBy.includes('E003') && r.time > new Date().toTimeString().slice(0, 5)).sort((a, b) => a.time.localeCompare(b.time))
      ));
  }
  getAvailableRidesByType(type:string) {
    return this.rides$.asObservable().pipe(
      map(
        rides => rides.filter(r => r.vacantSeats > 0 && !r.bookedBy.includes('E003') && r.time > new Date().toTimeString().slice(0, 5) && r.vehicleType === type).sort((a, b) => a.time.localeCompare(b.time))
      ));
  }
  getBookedRides(employeeId: string) {
    return this.rides$.asObservable().pipe(
      map(rides => rides.filter(r => r.bookedBy.includes(employeeId)))
    );
  }
  getSnapshot() { return this.rides$.getValue(); }


  addRide(ride: Ride) {
    const list = [ride, ...this.getSnapshot()];
    this.rides$.next(list);
  }


  bookRide(rideId: number, employeeId: string) {
    const list = this.getSnapshot().map(r => {
      if (r.id === rideId) {
        if (r.employeeId === employeeId) throw new Error('Cannot book your own ride');
        if (r.bookedBy.includes(employeeId)) throw new Error('Already booked');
        if (r.vacantSeats <= 0) throw new Error('No seats');
        return { ...r, vacantSeats: r.vacantSeats - 1, bookedBy: [...r.bookedBy, employeeId] };
      }
      return r;
    });
    this.rides$.next(list);
  }

  cancelRide(rideId: number, employeeId: string) {
    const list = this.getSnapshot().map(r => {
      if (r.id === rideId) {
        if (!r.bookedBy.includes(employeeId)) throw new Error('Not booked');
        return { ...r, vacantSeats: r.vacantSeats + 1, bookedBy: r.bookedBy.filter(e => e !== employeeId) };
      }
      return r;
    });
    this.rides$.next(list);
  }
}
