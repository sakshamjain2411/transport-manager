import { Injectable } from '@angular/core';
import { Ride, Booking } from '../interfaces/interface';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private rides$ = new BehaviorSubject<Ride[]>([
    { id: 1, employeeId: 'E001', vehicleType: 'Bike', vehicleNo: 'AB 1234', vacantSeats: 3, time: '09:30', pickup: 'BLR 01', destination: 'Electronic City', bookedBy: [] },
    { id: 2, employeeId: 'E002', vehicleType: 'Bike', vehicleNo: 'CD 5678', vacantSeats: 2, time: '18:00', pickup: 'BLR 02', destination: 'Koramangala', bookedBy: [] },
    { id: 3, employeeId: 'E003', vehicleType: 'Car', vehicleNo: 'CD 5678', vacantSeats: 2, time: '18:00', pickup: 'BLR 02', destination: 'Koramangala', bookedBy: [] },
  ]);


  getAvailableRides() {
    return this.rides$.asObservable().pipe(
      map(
        rides => rides.filter(r => r.vacantSeats > 0 && !r.bookedBy.includes('E003') && r.time > new Date().toTimeString().slice(0, 5))
      ));
  }
  getAvailableRidesByType(type:string) {
    return this.rides$.asObservable().pipe(
      map(
        rides => rides.filter(r => r.vacantSeats > 0 && !r.bookedBy.includes('E003') && r.time > new Date().toTimeString().slice(0, 5) && r.vehicleType === type)
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
}
