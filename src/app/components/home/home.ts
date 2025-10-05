import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common';
import { Booking, Ride } from '../../interfaces/interface';
import { AddRide } from "../add-ride/add-ride";
import { BehaviorSubject, interval, map, Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AddRide, FormsModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  currentTime: string = new Date().toTimeString().slice(0, 5);
  availableRides: Ride[] = [];
  filteredRides: Ride[] = [];
  bookedRides: Ride[] = [];
  showAddRide = false;
  employeeId = 'E003'; // Hardcoded for demo
  selectedFilter = 'All';
  filterForm!: FormGroup;
  filtersSubject = new BehaviorSubject<{ time: string; vehicleType: string }>({ time: '', vehicleType: 'All' });
  constructor(private api:Api, private formBuilder:FormBuilder) {}
  ngOnInit() {
    this.api.getAvailableRides().subscribe(rides => {
      this.availableRides = rides;
      this.onFilter({ time: '', vehicleType: 'All' });
    });
    this.api.getBookedRides('E003').subscribe(rides => {
      this.bookedRides = rides;
    });
    
    this.filterForm = this.formBuilder.group({
      time: [''],
      vehicleType: ['All']
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.onFilter(values);
    });

    interval(60000).subscribe(() => {
      this.currentTime = new Date().toTimeString().slice(0, 5);
    });
  }

  onBookRidePress(ride:Ride) {
    try {
      this.api.bookRide(ride.id, this.employeeId);
      alert('Ride booked successfully!');
    } catch (error:any) {
      alert(error.message);
    }
  }

  onCancelRidePress(ride:Ride) {
    try {
      this.api.cancelRide(ride.id, this.employeeId);
      alert('Ride cancelled successfully!');
    } catch (error:any) {
      alert(error.message);
    }
  }

  onFilter(filters: { time: string; vehicleType: string }) {
    if (filters.vehicleType === 'All') {
      this.filteredRides = this.availableRides;
    } else {
      this.filteredRides = this.availableRides.filter(ride => ride.vehicleType === filters.vehicleType);
    }

    if (filters.time != '') {
      if(filters.time < this.currentTime) {
        alert('Selected time is in the past. No rides will be shown for past time.');
        this.filteredRides = [];
        return;
      } 
      const filterTime = filters.time;
      this.filteredRides = this.filteredRides.filter(ride => {
        const rideTime = ride.time;
        const [filterHour, filterMinute] = filterTime.split(':').map(Number);
        const [rideHour, rideMinute] = rideTime.split(':').map(Number);

        const filterDate = new Date();
        filterDate.setHours(filterHour, filterMinute, 0, 0);

        const rideDate = new Date();
        rideDate.setHours(rideHour, rideMinute, 0, 0);

        const diffMinutes = Math.abs((rideDate.getTime() - filterDate.getTime()) / 60000);
        return diffMinutes <= 60;
      });
    }
  }

  resetFilter() {
    this.filterForm.setValue({ time: '', vehicleType: 'All' });
  }
}
