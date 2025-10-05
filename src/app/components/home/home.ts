import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { Booking, Ride } from '../../interfaces/interface';
import { AddRide } from "../add-ride/add-ride";
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AddRide],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  availableRides: Ride[] = [];
  bookedRides: Ride[] = [];
  bookings:Booking[] = [];
  showAddRide = false;
  constructor(private api:Api) {}
  ngOnInit() {
    this.api.getAvailableRides().subscribe(rides => {
      this.availableRides = rides;
    });
    this.api.getBookedRides('E003').subscribe(rides => {
      this.bookedRides = rides;
    });
  }

  onBookRidePress(ride:Ride) {
    try {
      this.api.bookRide(ride.id, 'E003'); // Assuming employeeId is 'E003' for demo
      alert('Ride booked successfully!');
    } catch (error:any) {
      alert(error.message);
    }
  }

  onFilter(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    switch (selectedValue) {
      case 'All':
        this.api.getAvailableRides().pipe(
          take(1)
        ).subscribe(res => {
          this.availableRides = res;
        })
        break;
      case 'Car':
        this.api.getAvailableRidesByType('Car').pipe(
          take(1)
        ).subscribe(res => {
          this.availableRides = res;
        })
        break;
        case 'Bike':
        this.api.getAvailableRidesByType('Bike').pipe(
          take(1)
        ).subscribe(res => {
          this.availableRides = res;
        })
        break;
    }
  }
}
