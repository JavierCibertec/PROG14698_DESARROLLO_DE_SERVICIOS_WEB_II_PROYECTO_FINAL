import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  patients: any[] = [];
  doctors: any[] = [];

  newAppointment = { patientId: null, doctorId: null, appointmentDate: '' };

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.appointmentService.getAppointments().subscribe(data => this.appointments = data);
    this.patientService.getPatients().subscribe(data => this.patients = data);
    this.doctorService.getDoctors().subscribe(data => this.doctors = data);
  }

  onSaveAppointment(): void {
    this.appointmentService.createAppointment(this.newAppointment).subscribe(() => {
      this.loadData();
      this.newAppointment = { patientId: null, doctorId: null, appointmentDate: '' };
    });
  }
}
