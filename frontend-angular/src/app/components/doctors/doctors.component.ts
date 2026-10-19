import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './doctors.component.html',
  //styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: any[] = [];
  newDoctor = { firstName: '', lastName: '', cmp: '', specialty: '', email: '', phone: '', userId: 1 };
  private apiUrl = 'http://localhost:8080/api/doctors';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
      next: (data) => this.doctors = data,
      error: (err) => console.error('Error al cargar médicos', err)
    });
  }

  registerDoctor() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post(this.apiUrl, this.newDoctor, { headers }).subscribe({
      next: () => {
        alert('Médico registrado exitosamente');
        this.loadDoctors();
        this.newDoctor = { firstName: '', lastName: '', cmp: '', specialty: '', email: '', phone: '', userId: 1 };
      },
      error: (err) => alert('Error al registrar médico: ' + err.message)
    });
  }
}
