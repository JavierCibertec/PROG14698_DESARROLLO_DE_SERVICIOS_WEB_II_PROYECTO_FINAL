import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  listaPacientes: any[] = [];
  listaMedicos: any[] = [];
  listaCitas: any[] = [];

  selectedPatientId: any = '';
  selectedDoctorId: any = '';
  fechaHoraCita: string = '';

  private gatewayUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.cargarPacientes();
    this.cargarMedicos();
    this.cargarCitas();
  }

  cargarPacientes() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(`${this.gatewayUrl}/patients`, { headers }).subscribe({
      next: (data) => this.listaPacientes = data,
      error: (err) => console.error('Error al cargar pacientes', err)
    });
  }

  cargarMedicos() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(`${this.gatewayUrl}/doctors`, { headers }).subscribe({
      next: (data) => this.listaMedicos = data,
      error: (err) => console.error('Error al cargar médicos', err)
    });
  }

  cargarCitas() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(`${this.gatewayUrl}/appointments`, { headers }).subscribe({
      next: (data) => this.listaCitas = data,
      error: (err) => console.error('Error al cargar citas', err)
    });
  }

  reservarCita() {
    if (!this.selectedPatientId || !this.selectedDoctorId || !this.fechaHoraCita) {
      alert('Por favor complete todos los campos para reservar la cita.');
      return;
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const nuevaCita = {
      patientId: this.selectedPatientId,
      doctorId: this.selectedDoctorId,
      fechaHora: this.fechaHoraCita,
      status: 'RESERVADA'
    };

    this.http.post(`${this.gatewayUrl}/appointments`, nuevaCita, { headers }).subscribe({
      next: () => {
        alert('¡Cita reservada con éxito!');
        this.cargarCitas();
        this.selectedPatientId = '';
        this.selectedDoctorId = '';
        this.fechaHoraCita = '';
      },
      error: (err) => alert('Error al reservar la cita: ' + (err.error?.message || err.message))
    });
  }

  irAListaPacientes() {
    this.router.navigate(['/patients']);
  }

  consultarCitas() {
    this.cargarCitas();
    alert('Historial de citas actualizado.');
  }
}
