import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: '**', redirectTo: 'login' }
];
