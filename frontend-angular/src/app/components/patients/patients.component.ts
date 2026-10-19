import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './patients.component.html'
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  cargando: boolean = true;
  private gatewayUrl = 'http://localhost:8080/api/patients';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef // Inyectamos el detector de cambios de Angular
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(this.gatewayUrl, { headers }).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.patients = response;
        } else if (response && Array.isArray(response.content)) {
          this.patients = response.content;
        } else if (response && Array.isArray(response.data)) {
          this.patients = response.data;
        } else if (response) {
          this.patients = [response];
        } else {
          this.patients = [];
        }

        this.cargando = false;
        this.cdr.detectChanges(); // Forzamos a Angular a renderizar los datos inmediatamente
      },
      error: (err) => {
        console.error('Error al cargar pacientes', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  volverACitas() {
    this.router.navigate(['/appointments']);
  }
}
