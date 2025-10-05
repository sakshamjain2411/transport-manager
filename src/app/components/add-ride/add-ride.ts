import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-add-ride',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-ride.html',
  styleUrl: './add-ride.scss'
})
export class AddRide implements OnInit {
  rideForm!:FormGroup;
  @Output() close = new EventEmitter<void>();
  constructor(private formBuilder: FormBuilder, private api:Api) {}
  ngOnInit() {
    this.rideForm = this.formBuilder.group({
      vehicleType: ['Car'],
      vehicleNo: [''],
      vacantSeats: [''],
      time: [''],
      pickup: [''],
      destination: ['']
    });
  }

  onSubmit() {
    if (this.rideForm.valid) {
      const rideData = this.rideForm.value;
      this.api.addRide({
        id: Math.floor(Math.random() * 1000) + 4, // Simple random ID generation
        employeeId: 'E003', // Assuming current user is E003
        vehicleType: rideData.vehicleType,
        vehicleNo: rideData.vehicleNo,
        vacantSeats: parseInt(rideData.vacantSeats, 10),
        time: rideData.time,
        pickup: rideData.pickup,
        destination: rideData.destination,
        bookedBy: []
      });
      this.rideForm.reset();
      this.close.emit();
    } else {
      alert('Please fill all required fields.');
    }
  }

  onClose() { 
    this.close.emit();
  }
}
